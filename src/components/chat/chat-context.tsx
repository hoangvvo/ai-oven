"use client";

import { Message } from "@/types";
import { nanoid } from "nanoid";
import { createContext, useCallback, useContext, useState } from "react";
import { doChat } from "./action";

type ChatContextType = {
  messages: Message[];
  loading: boolean;
  ask(query: string): Promise<void>;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const ask = useCallback(
    async (query: string) => {
      setLoading(true);
      const originalMessages = [...messages];
      let newMessages: Message[] = [
        ...originalMessages,
        { role: "user", content: query, id: nanoid(4) },
      ];
      setMessages(newMessages);
      try {
        const response = await doChat(newMessages);
        newMessages = [
          ...newMessages,
          { role: "assistant", content: response, id: nanoid(4) },
        ];
        setMessages(newMessages);
      } catch (error) {
        console.error(error);
        setMessages(originalMessages);
      } finally {
        setLoading(false);
      }
    },
    [messages],
  );

  return (
    <ChatContext.Provider value={{ messages, ask, loading }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
