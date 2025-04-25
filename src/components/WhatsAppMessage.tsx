import React from 'react';
import { Check } from 'lucide-react';
import { MapPin } from 'lucide-react';

interface ChatMessage {
  text?: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
  location?: string;
}

const WhatsAppMessage = ({ text, isSender, image, timestamp, isRead, location }: ChatMessage) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-1`}>
      <div className={`max-w-[65%] ${isSender ? 'order-last' : 'order-first'}`}>
        <div
          className={`relative px-3 py-[6px] ${
            isSender
              ? 'bg-[#d9fad3] text-black rounded-2xl rounded-br-sm before:absolute before:bottom-0 before:-right-[6px] before:border-b-[20px] before:border-r-[20px] before:border-b-[#d9fad3] before:border-r-transparent'
              : 'bg-white text-black rounded-2xl rounded-bl-sm before:absolute before:bottom-0 before:-left-[6px] before:border-b-[20px] before:border-l-[20px] before:border-b-white before:border-l-transparent'
          }`}
        >
          {image && (
            <div className="mb-1 -mx-3 -mt-[6px]">
              <img 
                src={image} 
                alt="Shared content" 
                className="w-full rounded-t-2xl object-cover max-h-[300px]" 
              />
            </div>
          )}
          <div className="relative text-[15px] min-w-[120px] whitespace-pre-wrap break-words">
            {location && (
              <div className="flex items-center text-[#1a7aed] mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="font-medium">{location}</span>
              </div>
            )}
            {text && <span className="mr-12">{text}</span>}
            <div className="absolute bottom-0 right-0 flex items-center text-[11px] text-[#667781]">
              <span>{timestamp}</span>
              {isSender && (
                <div className="ml-[2px] relative" style={{ width: '21px', height: '13px' }}>
                  <Check 
                    className="absolute right-0 z-[1] w-[13px] h-[13px] text-[#1a7aed]" 
                    style={{ strokeWidth: 3 }}
                  />
                  <Check 
                    className="absolute right-0 z-[2] w-[13px] h-[13px] text-[#1a7aed]"
                    style={{ transform: 'translateX(-5px)', strokeWidth: 3 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessage;
