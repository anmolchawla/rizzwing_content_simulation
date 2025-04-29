import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppMessage from './WhatsAppMessage';
import WhatsAppHeader from './WhatsAppHeader';
import { Card } from '@/components/ui/card';
import { Plus, Camera, Mic } from 'react-feather';
import { Sticker } from 'lucide-react';

interface ChatMessage {
  text?: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
  location?: string;
}

interface ChatScript {
  messages: ChatMessage[];
}

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [script, setScript] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug effect to monitor script state
  useEffect(() => {
    console.log('Current script state:', script);
    console.log('Script length:', script.length);
  }, [script]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name);
    
    try {
      const fileContent = await file.text();
      console.log('Raw file content:', fileContent);
      
      const content = JSON.parse(fileContent);
      console.log('Parsed content:', content);
      
      if (!content.messages || !Array.isArray(content.messages)) {
        console.error('Invalid JSON structure: missing messages array');
        alert('Invalid chat file format. File must contain a messages array.');
        resetFileInput();
        return;
      }

      const messagesWithTimestamp = content.messages.map((msg: ChatMessage) => ({
        ...msg,
        timestamp: msg.timestamp || new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }).toUpperCase(),
      }));
      
      console.log('Processed messages:', messagesWithTimestamp);
      console.log('Number of messages:', messagesWithTimestamp.length);
      
      // Reset existing messages and script
      setMessages([]);
      setScript(messagesWithTimestamp);
      
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error loading the chat file. Please make sure it's a valid JSON file.");
      resetFileInput();
    }
  };

  const playConversation = async () => {
    console.log('Starting playback with script:', script);
    if (script.length === 0) {
      console.log('No messages to play');
      alert("No messages to play. Please upload a valid chat file first.");
      return;
    }

    setIsPlaying(true);
    setMessages([]);
    
    try {
      let lastMessage: ChatMessage | null = null;
      
      for (const message of script) {
        console.log('Playing message:', message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (lastMessage && lastMessage.isSender && !message.isSender) {
          setMessages(prev => prev.map(msg => 
            msg === lastMessage ? { ...msg, isRead: true } : msg
          ));
        }
        
        setMessages(prev => [...prev, message]);
        lastMessage = message;
      }
      
      // Mark the last message as read if it's a sender message
      if (lastMessage?.isSender) {
        setMessages(prev => prev.map(msg => 
          msg === lastMessage ? { ...msg, isRead: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error during playback:', error);
      alert("Error playing the conversation. Please try again.");
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0c1317] max-w-md mx-auto overflow-hidden">
      <WhatsAppHeader 
        profileImage="https://rizzwing.pro/logo_dark.png"
        name="RizzWing"
      />
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          backgroundImage: "url('https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      >
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <WhatsAppMessage
              key={index}
              text={message.text}
              isSender={message.image ? true : !message.isSender}
              image={message.image}
              timestamp={message.timestamp}
              isRead={message.isRead}
              location={message.location}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* WhatsApp-style footer */}
      <div className="w-full px-4 py-2 bg-[#fef7ea] flex items-center gap-3">
        <button className="p-0">
          <Plus size={28} className="text-black" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder=""
            className="w-full rounded-full bg-white border border-[#e0e0e0] pl-4 pr-4 py-2 text-base text-black outline-none"
            disabled
          />
        </div>
        <button className="p-0">
          <Camera size={26} className="text-black" />
        </button>
        <button className="p-0">
          <Mic size={26} className="text-black" />
        </button>
      </div>
      <Card className="p-4 border-t bg-[#1f2c34] rounded-none">
        <div className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#075e54] file:text-white
              hover:file:bg-[#128c7e]"
          />
          <Button
            onClick={playConversation}
            disabled={isPlaying || script.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-[#075e54] hover:bg-[#128c7e] text-white"
          >
            <Play className="w-4 h-4" />
            {isPlaying ? "Playing..." : "Play Conversation"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WhatsAppChat;
