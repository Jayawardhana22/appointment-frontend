import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from '../types';

const ChatWidget = ({ shopName }: { shopName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 0,
      senderName: 'System',
      text: `Welcome to ${shopName}! How can we help you today?`,
      timestamp: new Date(),
      isSelf: false
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 999,
      senderName: 'Me',
      text: input,
      timestamp: new Date(),
      isSelf: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate auto-reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 0,
        senderName: 'Support',
        text: "Thanks for your message! An employee will be with you shortly.",
        timestamp: new Date(),
        isSelf: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="font-medium hidden md:inline">Chat with us</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 flex flex-col h-[500px] border border-gray-200 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-indigo-600 p-4 rounded-t-lg flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">{shopName} Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.isSelf 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border shadow-sm rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`text-xs block mt-1 ${msg.isSelf ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t bg-white rounded-b-lg flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button 
              type="submit" 
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
