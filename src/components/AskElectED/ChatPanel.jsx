import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: "Hello! I'm ElectED's AI assistant. Ask me any educational question about the election process (e.g., 'What is Gerrymandering?')." }
  ]);
  const [input, setInput] = useState('');
  const [queriesLeft, setQueriesLeft] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || queriesLeft <= 0) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setQueriesLeft(prev => prev - 1);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file!");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are an educational assistant for 'ElectED'. You ONLY answer questions about the civic voting and election process. Deny anything else politely. Keep answers under 3 sentences for readability."
      });

      const result = await model.generateContent(userMsg.content);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        source: 'Based on educational guidelines via Google Gemini'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${error.message}`,
        source: 'System'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-navy-900 text-ivory rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Ask ElectED"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-ivory shadow-2xl z-50 border-l border-navy-200 flex flex-col"
          >
            <div className="bg-navy-900 text-ivory p-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-xl flex items-center gap-2">
                  <span className="text-red">Ask</span> ElectED
                </h3>
                <p className="text-xs text-navy-200 font-sans">Powered by Google Gemini</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-ivory hover:text-red transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="bg-gold/20 p-3 text-xs font-sans text-navy-800 flex items-start gap-2 border-b border-gold/30">
              <AlertCircle size={16} className="text-navy-700 flex-shrink-0 mt-0.5" />
              <p><strong>Disclaimer:</strong> This assistant provides educational information, not official legal or government advice. Queries left: {queriesLeft}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-navy-700 text-ivory rounded-tr-none' 
                      : 'bg-white border border-navy-100 text-navy-900 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="text-sm font-sans whitespace-pre-wrap">{msg.content}</p>
                    {msg.source && (
                      <p className="text-[10px] uppercase tracking-wider text-navy-400 mt-2 font-bold border-t border-navy-100 pt-2">
                        {msg.source}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-navy-100 p-4 rounded-lg rounded-tl-none flex gap-1">
                    <div className="w-2 h-2 bg-navy-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-navy-200">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={queriesLeft <= 0 || isLoading}
                  placeholder="Ask a question..."
                  className="flex-1 border border-navy-300 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700 disabled:bg-gray-100"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || queriesLeft <= 0 || isLoading}
                  className="bg-red text-ivory p-2 rounded hover:bg-opacity-90 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatPanel;
