import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { sendChatMessage } from '../services/api';

export default function ChatUI() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { chatHistory, addMessage, userRole, complexity, language } = useStore();
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    addMessage(userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const context = chatHistory.slice(-5);
      const res = await sendChatMessage(input, context, userRole, complexity, language);
      
      const botMsg = { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: res.answer,
        suggestions: res.suggestions,
        steps: res.steps,
        timeline: res.timeline
      };
      addMessage(botMsg);
    } catch (error) {
      addMessage({ id: Date.now() + 1, sender: 'bot', text: 'Error connecting to the intelligence core.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[70vh] glass-card overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot className="w-16 h-16" />
            <h2 className="text-xl font-semibold">Start a Conversation</h2>
            <p>Ask anything about the election process.</p>
          </div>
        )}

        <AnimatePresence>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-primary-500 ml-3' : 'bg-dark-800 dark:bg-dark-900 border border-white/10 mr-3'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-primary-400" />}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className={`group relative p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-500 text-white rounded-tr-sm' : 'bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 rounded-tl-sm text-slate-800 dark:text-slate-200'}`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.sender === 'bot' && (
                      <button 
                        onClick={() => speak(msg.text)}
                        className="absolute -right-10 top-2 p-2 text-slate-400 hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Read aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Rich Content Rendering */}
                    {msg.steps && msg.steps.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {msg.steps.map(s => (
                          <div key={s.id} className="bg-slate-50 dark:bg-dark-900 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                            <h4 className="font-semibold text-primary-600 dark:text-primary-400">{s.title}</h4>
                            <p className="text-sm opacity-80 mt-1">{s.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(s)}
                          className="text-xs bg-slate-200 dark:bg-dark-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-primary-500/30"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 rounded-2xl p-4 ml-11">
                 <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 bg-white/50 dark:bg-dark-900/50 border-t border-slate-200 dark:border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voter registration, timelines, candidates..."
            className="w-full bg-white dark:bg-dark-950 border border-slate-300 dark:border-white/10 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
