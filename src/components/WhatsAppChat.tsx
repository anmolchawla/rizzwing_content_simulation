import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppMessage from './WhatsAppMessage';
import WhatsAppHeader from './WhatsAppHeader';
import { Card } from '@/components/ui/card';
import { Plus, Camera, Mic } from 'react-feather';

interface ChatMessage {
  text?: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
  location?: string;
}

const WhatsAppChat = () => {
  const [scripts, setScripts] = useState<ChatMessage[][]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    setMessages([]); // Clear previous chat on new upload

    try {
      const fileContent = await file.text();
      const content = JSON.parse(fileContent);

      // Debug: log the parsed content
      console.log('Parsed content:', content);

      // Accept both array of scripts and single script object
      const scriptsArray = Array.isArray(content) ? content : [content];
      console.log('Scripts array length:', scriptsArray.length);

      // Validate and normalize each script
      const normalizedScripts = scriptsArray.map((scriptObj, idx) => {
        console.log(`Processing script ${idx}:`, scriptObj);
        
        if (
          !scriptObj ||
          typeof scriptObj !== 'object' ||
          !Array.isArray(scriptObj.messages)
        ) {
          throw new Error(`Script at index ${idx} is missing a valid messages array`);
        }

        const processedMessages = scriptObj.messages.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: msg.timestamp || new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }).toUpperCase(),
        }));

        console.log(`Processed messages for script ${idx}:`, processedMessages);
        return processedMessages;
      });

      console.log('Final normalized scripts:', normalizedScripts);
      setScripts(normalizedScripts);
      
      // Debug: Verify scripts were set
      console.log('Scripts state after setting:', normalizedScripts.length);
    } catch (error: any) {
      console.error('Error processing file:', error);
      alert(error.message || "Error loading the chat file. Please make sure it's a valid JSON file.");
      resetFileInput();
    }
  };

  const playConversation = async () => {
    console.log('Starting playConversation. Scripts length:', scripts.length);
    if (!scripts.length) {
      console.log('No scripts to play');
      alert("No scripts to play. Please upload a valid chat file first.");
      return;
    }
    setIsPlaying(true);
    try {
      for (let scriptIdx = 0; scriptIdx < scripts.length; scriptIdx++) {
        // Clear chat before each script
        setMessages([]);
        const script = scripts[scriptIdx];
        let lastMessage: ChatMessage | null = null;
        for (const message of script) {
          console.log('Playing message:', message);
          await new Promise(resolve => setTimeout(resolve, 4000));
          if (lastMessage && lastMessage.isSender && !message.isSender) {
            setMessages(prev =>
              prev.map(msg =>
                msg === lastMessage ? { ...msg, isRead: true } : msg
              )
            );
          }
          setMessages(prev => [...prev, message]);
          lastMessage = message;
        }
        // Mark the last message as read if it's a sender message
        if (lastMessage?.isSender) {
          setMessages(prev =>
            prev.map(msg =>
              msg === lastMessage ? { ...msg, isRead: true } : msg
            )
          );
        }
        // Add a separator between scripts, except after the last one
        if (scriptIdx < scripts.length - 1) {
          console.log('Adding separator after script', scriptIdx);
          await new Promise(resolve => setTimeout(resolve, 4000));
          setMessages(prev => [
            ...prev,
            {
              text: "--- End of Script ---",
              isSender: false,
              timestamp: "",
            }
          ]);
          await new Promise(resolve => setTimeout(resolve, 4000));
        }
      }
    } catch (error) {
      console.error('Error during playback:', error);
      alert("Error playing the conversation. Please try again.");
    } finally {
      console.log('Playback completed');
      setIsPlaying(false);
    }
  };

  // Debug effect to monitor scripts state
  useEffect(() => {
    console.log('Scripts state changed:', scripts.length);
  }, [scripts]);

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
            disabled={isPlaying || scripts.length === 0}
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
