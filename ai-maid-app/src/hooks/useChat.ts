import { useState, useCallback } from "react";
import { Message } from "@/components/chat/MessageBubble";

const MAID_RESPONSES = [
    "はい、旦那様。承知いたしました。",
    "お疲れ様でございます、旦那様。お茶はいかがですか？",
    "ふふっ、旦那様はお優しいですね。",
    "何かお手伝いできることはございますか？",
    "申し訳ございません、もう一度おっしゃっていただけますか？",
    "旦那様、今日のお召し物も素敵ですね。",
    "お掃除をしておきました。お部屋が綺麗だと気持ちが良いですね。",
];

const KEYWORD_RESPONSES: Record<string, string> = {
    "おはよう": "おはようございます、旦那様。今日も良い一日になりますように。",
    "おやすみ": "おやすみなさいませ、旦那様。良い夢を。",
    "疲れた": "お疲れ様でございます。肩をお揉みしましょうか？それとも温かいお飲み物をご用意しましょうか？",
    "ありがとう": "もったいないお言葉でございます。お役に立てて光栄です。",
    "名前は": "私はあなたの専属メイドでございます。お好きなようにお呼びくださいませ。",
};

export function useChat() {
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

        // Simulate AI delay
        const delay = 1000 + Math.random() * 2000;

        setTimeout(() => {
            let responseContent = MAID_RESPONSES[Math.floor(Math.random() * MAID_RESPONSES.length)];

            // Simple keyword matching
            for (const [keyword, response] of Object.entries(KEYWORD_RESPONSES)) {
                if (content.includes(keyword)) {
                    responseContent = response;
                    break;
                }
            }

            const maidMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "maid",
                content: responseContent,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, maidMessage]);
            setIsLoading(false);
        }, delay);
    }, []);

    return {
        messages,
        isLoading,
        sendMessage,
    };
}
