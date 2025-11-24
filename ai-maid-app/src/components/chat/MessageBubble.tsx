import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MaidAvatar } from "@/components/layout/MaidAvatar";

export interface Message {
    id: string;
    role: "user" | "maid";
    content: string;
    timestamp: Date;
}

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isMaid = message.role === "maid";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex w-full mb-4",
                isMaid ? "justify-start" : "justify-end"
            )}
        >
            {isMaid && (
                <div className="mr-3 flex-shrink-0 self-end">
                    <MaidAvatar size="sm" />
                </div>
            )}

            <div
                className={cn(
                    "max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed",
                    isMaid
                        ? "bg-white text-maid-primary rounded-bl-none border border-gray-100"
                        : "bg-maid-primary text-white rounded-br-none"
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div
                    className={cn(
                        "text-[10px] mt-1 opacity-70 text-right",
                        isMaid ? "text-gray-400" : "text-gray-300"
                    )}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </motion.div>
    );
}
