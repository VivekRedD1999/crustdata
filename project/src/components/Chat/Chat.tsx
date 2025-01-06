import { useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';  // If you have a ChatMessage component

interface MessageType {
  role: 'user' | 'assistant';
  content: string;
}

export function Chat() {
  // Stores the entire conversation
  const [messages, setMessages] = useState<MessageType[]>([]);

  // This function will be passed to ChatInput
  const handleSendMessage = async (userMessage: string) => {
    // 1) Add user message to local state
    setMessages((prev) => [
      ...prev, 
      { role: 'user', content: userMessage }
    ]);

    try {
      // 2) Prepare payload for your Flask /chat endpoint
      const payload = {
        message: userMessage,
        chat_history: messages, // or transform messages if needed
      };

      // 3) Call the Flask /chat endpoint
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      // 4) Check for errors
      if (data.error) {
        console.error('Server error:', data.error);
        return;
      }

      // 5) Add the assistant/bot response to local state
      if (data.response) {
        setMessages((prev) => [
          ...prev, 
          { role: 'assistant', content: data.response }
        ]);
      }

      // If your backend also returns an updated `chat_history`, 
      // you can use that to replace or merge with your local state.
      // For example: 
      // if (data.chat_history) {
      //   setMessages(data.chat_history);
      // }
    } catch (error) {
      console.error('Error calling /chat endpoint:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* --- Chat History --- */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.role === 'user' ? (
              // Example usage of ChatMessage component
              <ChatMessage 
                message={msg.content} 
                isBot={false}
                timestamp={new Date().toLocaleTimeString()}
              />
            ) : (
              <ChatMessage 
                message={msg.content} 
                isBot={true}
                timestamp={new Date().toLocaleTimeString()}
              />
            )}
          </div>
        ))}
      </div>

      {/* --- Chat Input --- */}
      <div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
