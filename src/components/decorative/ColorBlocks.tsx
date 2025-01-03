import { cn } from '@/lib/utils';

interface ColorBlocksProps {
  position: 'top' | 'bottom';
  className?: string;
}

export function ColorBlocks({ position, className }: ColorBlocksProps) {
  return (
    <div 
      className={cn(
        "absolute left-0 right-0 h-24 flex",
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
    >
      <div className="w-1/5 bg-[#B4B8A6]/20 transition-all duration-500 hover:bg-[#B4B8A6]/30" />
      <div className="w-1/5 bg-[#E2C1C0]/20 transition-all duration-500 hover:bg-[#E2C1C0]/30" />
      <div className="w-1/5 bg-[#A5B0BB]/20 transition-all duration-500 hover:bg-[#A5B0BB]/30" />
      <div className="w-1/5 bg-[#C4BCB1]/20 transition-all duration-500 hover:bg-[#C4BCB1]/30" />
      <div className="w-1/5 bg-[#D1B1A3]/20 transition-all duration-500 hover:bg-[#D1B1A3]/30" />
    </div>
  );
}