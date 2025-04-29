import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface WhatsAppHeaderProps {
  profileImage: string;
  name: string;
  className?: string;
}

const WhatsAppHeader: React.FC<WhatsAppHeaderProps> = ({
  profileImage,
  name,
  className
}) => {
  return (
    <div className="w-full bg-[#fef7ea] text-black px-2 py-2 flex items-center">
      <button 
        className="flex items-center justify-center w-8 h-8 hover:bg-[#e5dfd3] rounded-full transition-colors mr-1"
        aria-label="Back"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-black flex items-center justify-center p-1.5">
          <img 
            src={profileImage} 
            alt={`${name}'s profile`}
            className="w-full h-full object-contain"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-base">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppHeader; 