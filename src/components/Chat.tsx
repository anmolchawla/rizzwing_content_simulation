import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Camera, Quote, Video as LucideVideo, Mic } from 'lucide-react';
import { ChevronDown, Phone, Video, MoreVertical } from 'react-feather';
import { Button } from '@/components/ui/button';
import Message from './Message';
import { Card } from '@/components/ui/card';

interface ChatMessage {
  text?: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
}

interface ChatScript {
  messages: ChatMessage[];
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [script, setScript] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content: ChatScript = JSON.parse(e.target?.result as string);
          if (!content.messages || !Array.isArray(content.messages)) {
            console.error("Invalid JSON structure: missing messages array");
            return;
          }
          // Filter out messages that have images or image-related text
          const textMessages = content.messages.filter(msg => {
            if (!msg.text) return false;
            // Skip messages that mention images or are image-related
            const lowerText = msg.text.toLowerCase();
            return !lowerText.includes('image') && 
                   !lowerText.includes('photo') && 
                   !lowerText.includes('picture') &&
                   !lowerText.includes('give me an opening line');
          });
          setScript(textMessages);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const playConversation = async () => {
    setIsPlaying(true);
    setMessages([]);
    
    for (const message of script) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, message]);
    }
    
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
      {/* Bumble-style header */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-white">
        {/* Left: Rotated Chevron, Avatar, V */}
        <div className="flex items-center gap-2">
          <ChevronDown size={20} className="text-black rotate-90" />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-lg text-black">V</span>
        </div>
        {/* Right: Phone, Video, More */}
        <div className="flex items-center gap-4">
          <Phone size={24} className="text-black" />
          <Video size={24} className="text-black" />
          <MoreVertical size={24} className="text-black" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isSender={message.isSender}
            image={message.image}
            timestamp={undefined} // Remove timestamp display
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Bumble-style footer */}
      <div className="w-full px-4 py-2 bg-white flex items-center gap-3">
        <button className="p-0">
          <Camera className="w-6 h-6 text-black" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Aa"
            className="w-full rounded-full border border-gray-300 pl-4 pr-14 py-2 text-base outline-none"
            disabled
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
            <span className="text-xs font-semibold">GIF</span>
          </button>
        </div>
        <button className="p-0">
          <Quote className="w-6 h-6 text-black" />
        </button>
        <button className="p-0">
          <LucideVideo className="w-6 h-6 text-black" />
        </button>
        <button className="p-0">
          <Mic className="w-6 h-6 text-black" />
        </button>
      </div>
      <Card className="p-4 border-t">
        <div className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/90"
          />
          <Button
            onClick={playConversation}
            disabled={isPlaying || script.length === 0}
            className="w-full flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isPlaying ? "Playing..." : `Play Conversation (${script.length} messages)`}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
