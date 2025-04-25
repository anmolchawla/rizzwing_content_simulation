
import React from 'react';
import { Check } from 'lucide-react';

interface MessageProps {
  text: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
}

const WhatsAppMessage = ({ text, isSender, image, timestamp, isRead }: MessageProps) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isSender ? 'order-last' : 'order-first'}`}>
        <div
          className={`relative px-3 py-2 ${
            isSender
              ? 'bg-[#075e54] text-white rounded-[18px] rounded-tr-sm before:absolute before:top-0 before:-right-[8px] before:border-t-[10px] before:border-r-[10px] before:border-t-[#075e54] before:border-r-transparent'
              : 'bg-[#1f2c34] text-white rounded-[18px] rounded-tl-sm before:absolute before:top-0 before:-left-[8px] before:border-t-[10px] before:border-l-[10px] before:border-t-[#1f2c34] before:border-l-transparent'
          }`}
        >
          <p className="text-[15px] mb-1">{text}</p>
          <div className={`flex items-center justify-end gap-1 text-[11px] ${isSender ? 'text-gray-300' : 'text-gray-400'}`}>
            <span>{timestamp}</span>
            {isSender && (
              <div className="flex">
                {isRead ? (
                  <div className="flex text-[#34b7f1]">
                    <Check className="w-3 h-3" />
                    <Check className="w-3 h-3 -ml-2" />
                  </div>
                ) : (
                  <Check className="w-3 h-3 text-gray-400" />
                )}
              </div>
            )}
          </div>
        </div>
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Shared content"
              className="rounded-lg max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppMessage;
