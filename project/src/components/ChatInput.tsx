import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-full px-4 py-2 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-indigo-300"
      />
      <button
        type="submit"
        className="rounded-full p-2 bg-gradient hover:opacity-90 text-white transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}