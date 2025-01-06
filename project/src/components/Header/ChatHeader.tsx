//import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-t-lg shadow-md backdrop-blur-lg bg-opacity-90">
      <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center shadow-md">
        <MessageSquare className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold bg-gradient bg-clip-text text-transparent">
          CrustData
        </h1>
        <p className="text-sm text-indigo-400 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Real-time company & people data.
        </p>
      </div>
    </div>
  );
}