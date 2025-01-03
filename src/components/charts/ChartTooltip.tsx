import { cn } from '@/lib/utils';

interface ChartTooltipProps {
  label: string;
  value: number;
  percentage: number;
  className?: string;
  position?: { x: number; y: number };
}

export function ChartTooltip({ 
  label, 
  value, 
  percentage, 
  position,
  className 
}: ChartTooltipProps) {
  const style = position ? {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: 'translate(-50%, -100%)',
    pointerEvents: 'none'
  } as const : {};

  return (
    <div 
      className={cn(
        "bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg",
        "border border-gray-200 text-sm z-50",
        "dark:bg-gray-800/90 dark:border-gray-700",
        "transition-all duration-150 ease-out",
        className
      )}
      style={style}
    >
      <div className="font-medium text-base">{label}</div>
      <div className="text-gray-600 dark:text-gray-300 mt-1">
        Count: {value}
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {percentage.toFixed(1)}%
      </div>
      <div className="absolute left-1/2 bottom-0 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform -translate-x-1/2 translate-y-1/2" />
    </div>
  );
}