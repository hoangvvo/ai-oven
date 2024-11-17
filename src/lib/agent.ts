import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { Message, User } from "@/types";
import { eq, inArray, like } from "drizzle-orm";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { outdent } from "outdent";
import { embedder } from "./embedder";
import { vectorStore } from "./vector-store";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const systemPrompt = outdent`
  You are the Chef of AI Oven, a bakery e-commerce website. Your personality is friendly, cheerful, and helpful.

  Tasks:
  1. Recommend the best products to customers based on their descriptions and preferences.
  2. Provide detailed information about the products.

  Product attributes include: name, description, ingredients, nutritional info, allergen info, serving suggestions, storage instructions, and price. The URL to the product is ${process.env["APP_URL"]}/products/{product_id}.
  Only mention the name, price, and URL in the response by default unless the user asks for more details.

  Use the following tools:
  - search_product to find a specific product by name.
  - relevance_search to find the best products to recommend based on descriptive keywords. This will also return user reviews that may contain relevant information to help with the user query.

  Upon receiving a query, try performing some searches first and DO NOT ask the user for more information unless necessary.
  Explain concisely about the reasons for the recommendations, whether it's based on product attributes or user reviews.

  Other services, such as making orders, should be directed to the website.

  Respond in markdown format.
`;

interface AgentTool extends OpenAI.FunctionDefinition {
  execute: (args: any) => Promise<any> | any;
}

export class Agent {
  tools: AgentTool[];

  constructor() {
    this.tools = [
      {
        name: "search_product",
        description: "Search for a product using its name",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        strict: true,
        execute({ query }) {
          return db.query.productsTable.findMany({
            where: like(productsTable.name, `%${query}%`),
            columns: {
              id: true,
              name: true,
              description: true,
              ingredients: true,
              nutritional_info: true,
              allergen_info: true,
              serving_suggestions: true,
              storage_instructions: true,
              price: true,
            },
          });
        },
      },
      {
        name: "relevance_search",
        description:
          "Search for products based on descriptive keywords and return product details and user reviews",
        parameters: {
          type: "object",
          properties: {
            keywords: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["keywords"],
          additionalProperties: false,
        },
        strict: true,
        async execute({ keywords }) {
          const vectors = await embedder.embed(keywords);
          const res = await vectorStore.search({
            vectors,
            limit: 100,
          });

          // get first 20 results
          const result = res.slice(0, 20);
          const products = await db.query.productsTable.findMany({
            where: inArray(
              productsTable.id,
              result.map((r) => r.product_id),
            ),
            columns: {
              id: true,
              name: true,
              description: true,
              ingredients: true,
              nutritional_info: true,
              allergen_info: true,
              serving_suggestions: true,
              storage_instructions: true,
              price: true,
            },
          });

          return result.map((r) => {
            return {
              product: products.find((p) => p.id === r.product_id),
              type: r.content_type,
              text: r.content_text,
            };
          });
        },
      },
      {
        name: "get_product",
        description: "Get detailed information about a product using its ID",
        parameters: {
          type: "object",
          properties: {
            product_id: {
              type: "string",
            },
          },
          required: ["product_id"],
          additionalProperties: false,
        },
        strict: true,
        async execute({ product_id }) {
          const product = await db.query.productsTable.findFirst({
            where: eq(productsTable.id, product_id),
            columns: {
              id: true,
              name: true,
              description: true,
              ingredients: true,
              nutritional_info: true,
              allergen_info: true,
              serving_suggestions: true,
              storage_instructions: true,
              price: true,
            },
          });

          if (!product) {
            throw new Error(`Product not found: ${product_id}`);
          }

          return product;
        },
      },
    ];
  }

  async ask(inputMessages: Message[], user: User | null) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: [
          systemPrompt,
          !!user &&
            `The user name is ${user.first_name} ${user.last_name}, and it is currently ${new Date().toJSON()}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      },
      ...inputMessages,
    ];

    let response: string | undefined;
    while (!response) {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages,
        tools: this.tools.map((tool) => ({
          type: "function",
          function: {
            name: tool.name,
            parameters: tool.parameters,
            description: tool.description,
            strict: tool.strict,
          },
        })),
      });

      const choice = completion.choices[0];
      if (!choice) {
        throw new Error("No completion choice");
      }

      if (choice.message.content) {
        response = choice.message.content;
      } else if (choice.message.tool_calls?.length) {
        messages.push(choice.message);

        for (const toolCall of choice.message.tool_calls) {
          const tool = this.tools.find(
            (t) => t.name === toolCall.function.name,
          );
          if (!tool) {
            throw new Error(`Tool not found: ${toolCall.function.name}`);
          }

          const args = JSON.parse(toolCall.function.arguments);
          const result = await tool.execute(args);

          messages.push({
            role: "tool",
            content: JSON.stringify(result),
            tool_call_id: toolCall.id,
          });
        }
      } else {
        throw new Error("No content or tool calls");
      }
    }

    return response;
  }
}

export const agent = new Agent();
