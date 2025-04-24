
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
          className={`rounded-3xl p-3 max-w-[250px] ${
            isSender
              ? 'bg-[#FEF7CD] text-black'
              : 'bg-gray-100 text-black border border-gray-200'
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
