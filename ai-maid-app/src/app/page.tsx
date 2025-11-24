'use client'

import { useState } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { InputArea } from "@/components/chat/InputArea";
import { SettingsDialog } from "@/components/chat/SettingsDialog";
import { useChat } from "@/hooks/useChat";
import { Sparkles, Settings } from "lucide-react";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemInstruction, setSystemInstruction] = useState(
    "あなたはユーザーに仕えるメイドです。丁寧な言葉遣いで、主人（ユーザー）をサポートしてください。語尾には「〜ですわ」「〜ますわ」など、メイドらしい口調を使ってください。"
  );

  const { messages, isLoading, sendMessage } = useChat(systemInstruction);

  return (
    <div className="flex flex-col h-screen bg-maid-bg">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-maid-gold/20 z-10">
        <div className="w-8" /> {/* Spacer for centering */}
        <div className="flex items-center gap-2">
          <Sparkles className="text-maid-gold" size={24} />
          <h1 className="text-xl font-bold text-maid-primary tracking-wider">
            AI Maid Chat
          </h1>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-maid-primary hover:bg-maid-bg rounded-full transition-colors"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1a1a2e_1px,transparent_1px)] [background-size:16px_16px]" />

        <ChatWindow messages={messages} isLoading={isLoading} />

        <div className="w-full bg-gradient-to-t from-maid-bg via-maid-bg to-transparent pt-4 pb-2 z-10">
          <InputArea onSendMessage={sendMessage} disabled={isLoading} />
        </div>
      </main>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSystemInstruction={systemInstruction}
        onSave={setSystemInstruction}
      />
    </div>
  );
}
