import { useState, useCallback } from "react";
import { Message } from "@/components/chat/MessageBubble";



export function useChat(systemInstruction?: string) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "maid",
            content: "お帰りなさいませ、旦那様。ご用命は何なりとお申し付けください。",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (content: string) => {
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: content,
                    systemInstruction
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await response.json();
            const maidMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "maid",
                content: data.response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, maidMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "maid",
                content: "申し訳ございません、少し調子が悪いようです。もう一度おっしゃっていただけますか？",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        messages,
        isLoading,
        sendMessage,
    };
}
