import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputAreaProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export function InputArea({ onSendMessage, disabled }: InputAreaProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSendMessage(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="relative flex items-end gap-2 bg-white p-2 rounded-3xl shadow-lg border border-gray-100 focus-within:ring-2 focus-within:ring-maid-gold/50 transition-all duration-300">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="メイドにお申し付けください..."
                    disabled={disabled}
                    rows={1}
                    className="flex-1 max-h-32 bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-maid-primary placeholder:text-gray-400 text-sm scrollbar-hide"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className={cn(
                        "p-3 rounded-full flex-shrink-0 transition-colors duration-200",
                        input.trim() && !disabled
                            ? "bg-maid-primary text-white shadow-md hover:bg-maid-accent"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                >
                    {input.trim() ? <Send size={18} /> : <Sparkles size={18} />}
                </motion.button>
            </div>
            <div className="text-center mt-2 text-[10px] text-gray-400 font-serif">
                AI Maid is thinking about how to serve you better.
            </div>
        </div>
    );
}
