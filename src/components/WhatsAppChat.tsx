
import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppMessage from './WhatsAppMessage';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  text: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
}

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [script, setScript] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          setScript(content);
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
    
    let lastMessage: ChatMessage | null = null;
    
    for (const message of script) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If the last message was from sender and current is not, mark last as read
      if (lastMessage && lastMessage.isSender && !message.isSender) {
        setMessages(prev => prev.map(msg => 
          msg === lastMessage ? { ...msg, isRead: true } : msg
        ));
      }
      
      setMessages(prev => [...prev, message]);
      lastMessage = message;
    }
    
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[url('/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center max-w-md mx-auto">
      <div className="bg-[#075e54] p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-center text-white">WhatsApp Chat</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <WhatsAppMessage
            key={index}
            text={message.text}
            isSender={message.isSender}
            image={message.image}
            timestamp={message.timestamp}
            isRead={message.isRead}
          />
        ))}
      </div>

      <Card className="p-4 border-t bg-[#f0f2f5]">
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
            className="w-full flex items-center justify-center gap-2 bg-[#128c7e] hover:bg-[#075e54]"
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
