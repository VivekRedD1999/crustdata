import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-gradient' : 'bg-gradient from-emerald-400 to-teal-500'
      }`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isBot ? '' : 'items-end'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isBot ? 'message-gradient-bot text-gray-800' : 'message-gradient-user text-white'
        } shadow-sm`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}