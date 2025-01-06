import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../../types/chat';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white bg-opacity-90 backdrop-blur-lg shadow-inner">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.text}
          isBot={message.isBot}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
}