"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types";
import {
  CloseButton,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { outdent } from "outdent";
import { useEffect, useRef, useState } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "./chat-context";

const remarkPlugins = [remarkGfm];
const components: Components = {
  p: (props) => <p className="mb-2" {...props} />,
  h1: (props) => <h1 className="text-2xl font-bold mb-2" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold mb-2" {...props} />,
  h3: (props) => <h3 className="text-lg font-bold mb-2" {...props} />,
  h4: (props) => <h4 className="text-base font-bold mb-2" {...props} />,
  h5: (props) => <h5 className="text-sm font-bold mb-2" {...props} />,
  a: (props) => (
    <Link
      className="text-teal-800 hover:text-teal-700 transition-colors"
      {...props}
    />
  ),
};

const MessageMarkdown = ({ children }: { children: string }) => (
  <Markdown remarkPlugins={remarkPlugins} components={components}>
    {children}
  </Markdown>
);

const defaultMessage = outdent`
  Hello! I am the Chef of AI Oven, here to help you find the perfect treat for your taste buds.

  You can start by letting me know what you're in the mood for today 🤔 or 
  what occasion you're celebrating 🎉.
`;

function AssistantMessageBlock({
  message,
  isLoading,
}: {
  message: Message;
  isLoading?: boolean;
}) {
  return (
    <div className="max-w-[90%] bg-gray-200 text-gray-800 rounded-lg self-start px-4 py-2">
      {isLoading ? (
        <div className="flex items-center gap-1 py-1.5">
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
        </div>
      ) : (
        <MessageMarkdown>{message.content}</MessageMarkdown>
      )}
    </div>
  );
}

function UserMessageBlock({ message }: { message: Message }) {
  return (
    <div className="max-w-[80%] bg-gray-800 text-gray-50 rounded-lg self-end px-4 py-2">
      <MessageMarkdown>{message.content}</MessageMarkdown>
    </div>
  );
}

function ChatModalContent({ close }: { close: () => void }) {
  const [value, setValue] = useState("");
  const isValid = value.trim().length > 0;

  const { messages, ask, loading } = useChat();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    setValue("");
    await ask(value.trim());
  };

  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      close();
    }
  }, [pathname, close]);

  return (
    <div className="flex flex-col py-6 w-full h-full bg-gray-50 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4 px-8">
        <h2 className="text-2xl font-bold">👨‍🍳 Ask Chef</h2>
        <CloseButton aria-label="Close chat">
          <XMarkIcon className="w-6 h-6" />
        </CloseButton>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 pb-8 px-8">
        {!messages.length ? (
          <>
            <AssistantMessageBlock
              message={{
                id: "default",
                content: defaultMessage,
                role: "assistant",
              }}
            />
          </>
        ) : (
          messages.map((message) =>
            message.role === "assistant" ? (
              <AssistantMessageBlock message={message} key={message.id} />
            ) : (
              <UserMessageBlock message={message} key={message.id} />
            ),
          )
        )}
        {loading && (
          <AssistantMessageBlock
            message={{ id: "loading", content: "", role: "assistant" }}
            isLoading
          />
        )}
      </div>
      <div className="pt-4 border-t px-8">
        <form className="relative w-full" onSubmit={onSubmit}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 pr-10 w-full bg-neutral-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-within:bg-white transition disabled:bg-gray-200"
            disabled={loading}
          />
          <button
            type="submit"
            className={cn(
              "w-6 h-6 bg-gray-700 text-white rounded-full absolute right-2 top-2 flex items-center justify-center transition opacity-50",
              isValid && "opacity-100",
            )}
            aria-label="Send message"
            disabled={!isValid}
          >
            <ArrowUpIcon className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function ChatModal() {
  return (
    <>
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton className="fixed bottom-4 right-4 py-3 px-4 bg-gray-50 hover:bg-gray-100 shadow-md text-gray-900 rounded-full flex items-center justify-center gap-2 transition-colors">
              <span>👨‍🍳✨</span>
              <span className="text-sm font-mono sr-only md:not-sr-only">
                Ask Chef
              </span>
            </PopoverButton>
            <PopoverBackdrop
              transition
              className="fixed inset-0 bg-black/15 transition duration-100 ease-out data-[closed]:opacity-0"
            />
            <PopoverPanel
              anchor={{
                to: "bottom end",
                gap: -64,
              }}
              className="w-full h-full overflow-hidden md:pb-4 md:w-[400px] md:h-[700px] flex flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              transition
            >
              <ChatModalContent close={close} />
            </PopoverPanel>
          </>
        )}
      </Popover>
    </>
  );
}
