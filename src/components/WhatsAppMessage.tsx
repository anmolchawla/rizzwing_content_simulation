import React from 'react';
import { Check } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Emoji, { Twemoji } from 'react-emoji-render';

interface ChatMessage {
  text?: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
  isRead?: boolean;
  location?: string;
}

const WhatsAppMessage = ({
  text,
  isSender,
  image,
  timestamp,
  isRead,
  location,
}: ChatMessage) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-1`}>
      <div className={`max-w-[65%] ${isSender ? 'order-last' : 'order-first'}`}>
        <div
          className={`relative ${
            isSender
              ? 'bg-[#d9fad3] text-black rounded-xl rounded-br-sm before:absolute before:bottom-0 before:-right-[6px] before:border-b-[20px] before:border-r-[20px] before:border-b-[#d9fad3] before:border-r-transparent'
              : 'bg-white text-black rounded-xl rounded-bl-sm before:absolute before:bottom-0 before:-left-[6px] before:border-b-[20px] before:border-l-[20px] before:border-b-white before:border-l-transparent'
          }`}
        >
          {image && (
            <div className={`p-[2px] ${text ? '-mb-[2px]' : ''}`}>
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt="Shared content"
                  className="w-full object-cover max-h-[300px] rounded-[14px]"
                />
              </div>
            </div>
          )}
          {(text || location) && (
            <div className="">
              <div className="relative min-w-[128px]">
                {location && (
                  <div className="flex items-center text-[#1a7aed] mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-medium">{location}</span>
                  </div>
                )}
                <div className="relative p-2">
                  <div className="absolute bottom-1 right-2 flex items-center text-[11px] text-[#667781] whitespace-nowrap">
                    <span>{timestamp}</span>
                    {isSender && (
                      <div
                        className="ml-[2px] relative"
                        style={{ width: '21px', height: '13px' }}
                      >
                        <Check
                          className="absolute right-0 z-[1] w-[13px] h-[13px] text-[#1a7aed]"
                          style={{ strokeWidth: 3 }}
                        />
                        <Check
                          className="absolute right-0 z-[2] w-[13px] h-[13px] text-[#1a7aed]"
                          style={{
                            transform: 'translateX(-5px)',
                            strokeWidth: 3,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Text with inline-block span for the timestamp space */}
                  <div
                    className="text-[15px] whitespace-pre-wrap break-words font-[-apple-system,BlinkMacSystemFont,'SF Pro Text',system-ui]"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {text && (
                      <Twemoji
                        svg
                        text={text}
                        options={{
                          className: 'inline',
                        }}
                      />
                    )}
                    {/* Invisible spacer element that keeps space for the timestamp */}
                    <span className="inline-block w-[70px] h-[16px]"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessage;
