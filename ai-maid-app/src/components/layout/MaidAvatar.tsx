import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaidAvatarProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
};

const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
};

export function MaidAvatar({ size = "md", className }: MaidAvatarProps) {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full bg-maid-primary border-2 border-maid-gold shadow-md",
                sizeClasses[size],
                className
            )}
        >
            <Sparkles
                className="text-maid-secondary"
                size={iconSizes[size]}
                strokeWidth={1.5}
            />
            <div className="absolute bottom-0 right-0 w-[25%] h-[25%] bg-green-500 rounded-full border border-white" />
        </div>
    );
}
