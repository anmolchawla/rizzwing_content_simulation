
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
          className={`relative p-3 max-w-[250px] ${
            isSender
              ? 'bg-[#075e54] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl before:absolute before:bottom-0 before:right-0 before:border-[6px] before:border-transparent before:border-t-[#075e54] before:translate-y-[5px]'
              : 'bg-[#1f2c34] text-white rounded-tl-2xl rounded-tr-2xl rounded-br-2xl before:absolute before:bottom-0 before:left-0 before:border-[6px] before:border-transparent before:border-t-[#1f2c34] before:translate-y-[5px]'
          }`}
        >
          <p className="text-[15px]">{text}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[11px] text-gray-300">{timestamp}</span>
            {isSender && (
              <div className="flex">
                {isRead ? (
                  <div className="flex text-[#34b7f1]">
                    <Check className="w-4 h-4" />
                    <Check className="w-4 h-4 -ml-3" />
                  </div>
                ) : (
                  <Check className="w-4 h-4 text-gray-400" />
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
