import React, { useEffect, useRef } from "react";
import { Message, MessageBubble } from "./MessageBubble";

interface ChatWindowProps {
    messages: Message[];
    isLoading?: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-maid-gold/20 scrollbar-track-transparent">
            <div className="max-w-3xl mx-auto w-full pb-4">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-4 animate-pulse">
                        <div className="mr-3 flex-shrink-0 self-end w-8 h-8 rounded-full bg-gray-200" />
                        <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-maid-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-2 h-2 bg-maid-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-2 h-2 bg-maid-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
