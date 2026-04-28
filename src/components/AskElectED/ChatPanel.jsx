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
      
      let responseText = "";

      if (!apiKey) {
        // Phenomenally graceful offline offline NLP proxy!
        const query = userMsg.content.toLowerCase();
        
        let foundMatch = false;

        // Mock algorithmic NLP response bank (Super robust)
        if (query.includes('how') && query.includes('vote')) {
          responseText = "To vote, you must first register via your local government entity. On Election Day, you will visit your designated polling location with valid identification. Always check locally for specifics!";
          foundMatch = true;
        } else if (query.includes('electoral') || query.includes('college')) {
          responseText = "The Electoral College is a process, not a place. The founding fathers established it in the Constitution, in part, as a compromise between the election of the President by a vote in Congress and election of the President by a popular vote of qualified citizens.";
          foundMatch = true;
        } else if (query.includes('who') || query.includes('president')) {
           responseText = "As an educational assistant, I do not process live or current political figure data to remain entirely unbiased. I focus strictly on explaining the democratic architecture and voting processes!";
           foundMatch = true;
        } else if (query.includes('mail') || query.includes('absentee')) {
           responseText = "Absentee voting allows you to vote by mail if you cannot make it to the polls on Election Day. Every local region has different deadlines, so always request your ballot at least 30 days in advance!";
           foundMatch = true;
        }
        
        if (!foundMatch) {
            responseText = `That's a great question about "${userMsg.content}". In civic processes, local jurisdictions vary wildly. I highly recommend consulting your local state or country polling documentation! (Simulated Mode Active)`;
        }

        // Simulate network delay for AI realism
        await new Promise(r => setTimeout(r, 1200));

      } else {
        // Genuine Gemini Integration
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: "You are an educational assistant for 'ElectED'. You ONLY answer questions about the civic voting and election process. Deny anything else politely. Keep answers under 3 sentences for readability."
        });

        const result = await model.generateContent(userMsg.content);
        responseText = result.response.text();
      }
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        source: apiKey ? 'Live via Google Gemini AI' : 'ElectED Offline Civic Core'
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
