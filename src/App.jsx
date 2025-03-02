import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Info, X, ChevronDown, ChevronUp, Database, RefreshCw } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import PlatformSelector from './components/PlatformSelector';
import { generateResponse } from './utils/chatbot';
import { WELCOME_MESSAGE, PLATFORMS, SAMPLE_QUESTIONS } from './utils/constants';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: WELCOME_MESSAGE, sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['segment', 'mparticle', 'lytics', 'zeotap']);
  const [showInfo, setShowInfo] = useState(false);
  const [showSampleQuestions, setShowSampleQuestions] = useState(true);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Simulate API call delay
      setTimeout(async () => {
        const response = await generateResponse(inputValue, selectedPlatforms);
        
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handleClearChat = () => {
    setMessages([
      { id: 1, text: WELCOME_MESSAGE, sender: 'bot', timestamp: new Date() }
    ]);
  };

  const handleSampleQuestionClick = (question) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-800">CDP Chatbot</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Information"
            >
              <Info className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={handleClearChat}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Clear chat"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-indigo-50 border-b border-indigo-100 p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-indigo-800 mb-2">About CDP Chatbot</h2>
                <p className="text-sm text-indigo-700 mb-2">
                  This chatbot helps you find information about how to use various Customer Data Platforms (CDPs).
                  Ask questions about specific tasks or features in Segment, mParticle, Lytics, or Zeotap.
                </p>
                <p className="text-sm text-indigo-700">
                  Example: "How do I set up a new source in Segment?" or "How can I create a user profile in mParticle?"
                </p>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="p-1 rounded-full hover:bg-indigo-100 transition-colors"
                aria-label="Close information panel"
              >
                <X className="h-5 w-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Platform Selector */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="container mx-auto">
          <PlatformSelector 
            platforms={PLATFORMS}
            selectedPlatforms={selectedPlatforms}
            onChange={handlePlatformChange}
          />
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Sample Questions */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Sample Questions</h3>
              <button 
                onClick={() => setShowSampleQuestions(!showSampleQuestions)}
                className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-500"
                aria-label={showSampleQuestions ? "Hide sample questions" : "Show sample questions"}
              >
                {showSampleQuestions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            {showSampleQuestions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {SAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleQuestionClick(question)}
                    className="text-left text-xs bg-gray-50 hover:bg-gray-100 rounded p-2 transition-colors text-gray-700 truncate"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="chat-bubble-bot py-2 px-4">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="container mx-auto max-w-4xl">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question about CDPs..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`p-2 rounded-full ${
                  inputValue.trim() 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } transition-colors`}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;