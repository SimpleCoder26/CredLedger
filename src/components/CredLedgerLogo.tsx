import React from 'react';

interface CredLedgerLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const CredLedgerLogo: React.FC<CredLedgerLogoProps> = ({ 
  className = "", 
  size = 32,
  color = "currentColor" 
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M21 16V8L12 2L3 8V16L12 22L21 16Z" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M3.27002 6.96002L12 12.01L20.73 6.96002" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M12 22.08V12" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" fill={color} opacity="0.3"/>
      </svg>
      <span className="font-bold tracking-tight text-xl" style={{ color }}>
        CredLedger
      </span>
    </div>
  );
};
