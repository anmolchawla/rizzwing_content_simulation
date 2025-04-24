
import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Message from './Message';
import { Card } from '@/components/ui/card';

interface ChatMessage {
  text: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
}

const Chat = () => {
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
    
    for (const message of script) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, message]);
    }
    
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-md mx-auto">
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-center">Chat Replay</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isSender={message.isSender}
            image={message.image}
            timestamp={message.timestamp}
          />
        ))}
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
            {isPlaying ? "Playing..." : "Play Conversation"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
