
import React from 'react';

interface MessageProps {
  text: string;
  isSender: boolean;
  image?: string;
  timestamp?: string;
}

const Message = ({ text, isSender, image, timestamp }: MessageProps) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isSender ? 'order-last' : 'order-first'}`}>
        <div
          className={`relative p-3 max-w-[250px] ${
            isSender
              ? 'bg-[#fff700] text-black rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl before:absolute before:bottom-0 before:right-0 before:border-8 before:border-transparent before:border-t-[#fff700] before:translate-y-[7px]'
              : 'bg-gray-100 text-black border border-gray-200 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl before:absolute before:bottom-0 before:left-0 before:border-8 before:border-transparent before:border-t-gray-100 before:translate-y-[7px]'
          }`}
        >
          <p className="text-[15px]">{text}</p>
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
        {timestamp && (
          <div className="text-xs text-gray-500 mt-1 text-right">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
