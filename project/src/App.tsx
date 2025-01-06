import { useState } from 'react';
import { ChatHeader } from './components/Header/ChatHeader';
import { MessageList } from './components/Chat/MessageList';
import { ChatInput } from './components/Chat/ChatInput';
import { createMessage } from './utils/chatHelpers';
import { Message } from './types/chat';
import './styles/gradients.css'; // Optional, if you already have gradient styles
import './styles/loader.css';    // <-- Make sure you import your spinner/loader CSS

// Initial conversation with a welcome message
const initialMessages: Message[] = [
  createMessage(
    "Taking some leverage to briefly explain my experience, I developed a conversational search system for retail that acts as a virtual salesperson, helping users find the right products by understanding their queries and preferences. I also scaled a video summarization solution for lengthy videos (5-6 hours) using open-source models, overcoming token limitation issues to generate accurate summaries. These projects demonstrate my ability to create innovative AI solutions that enhance user experience and solve real-world challenges effectively.", true, 1),
  createMessage("Hello! I'm your (LEVEL 0) AI assistant (Open Source LLM can answer follow-up questions). How can I help you today?.", true, 1),
  
];

function App() {
  // 1) State to store the entire conversation
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // 2) Loading state to show a spinner while waiting for the backend response
  const [loading, setLoading] = useState(false);

  // 3) Function to handle sending user messages
  const handleSendMessage = async (text: string) => {
    // Add user message to local state
    const userMessage = createMessage(text, false, messages.length + 1);
    setMessages((prev) => [...prev, userMessage]);

    // Prepare the payload for the Flask /chat endpoint
    const payload = {
      message: text,
      // Convert your existing messages to a format your Flask server expects
      chat_history: messages.map((m) => ({
        role: m.isBot ? 'assistant' : 'user',
        content: m.text, // or m.content, depending on how your Message structure is defined
      })),
    };

    try {
      // Show loading indicator
      setLoading(true);

      // Make a POST request to your Flask server
      const response = await fetch('http://0.0.0.0:10000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Handle any server-side error message
      if (data.error) {
        console.error('Server error:', data.error);
        return;
      }

      // If the server returns a bot response, add it to local state
      if (data.response) {
        const botMessage = createMessage(data.response, true, messages.length + 2);
        setMessages((prev) => [...prev, botMessage]);
      }

      // If your backend returns an updated chat_history, you could optionally merge it here:
      // if (data.chat_history) {
      //   const updatedMessages = data.chat_history.map((msgObj: any, i: number) =>
      //     createMessage(msgObj.content, msgObj.role === 'assistant', i + 1)
      //   );
      //   setMessages(updatedMessages);
      // }

    } catch (error) {
      console.error('Error calling /chat endpoint:', error);
    } finally {
      // Hide loading indicator once the request completes or fails
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
        {/* Top Header (optional) */}
        <ChatHeader />

        {/* Chat History */}
        <MessageList messages={messages} />

        {/* Loading Indicator (Spinner) */}
        {loading && (
          <div className="p-2 text-center text-indigo-600">
            <span className="loader inline-block mr-2" />
            Generating response...
          </div>
        )}

        {/* Chat Input at the bottom */}
        <div className="p-4 bg-white rounded-b-lg shadow-md backdrop-blur-lg bg-opacity-90">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
