import { type ChartDataPoint } from '@/types/charts';

// Softer, more natural pastel color palette with reduced saturation
export const CHART_COLORS = [
  '#c8e6d5', // Sage green
  '#d5e1e8', // Dusty blue
  '#e6d5e2', // Muted lavender
  '#e8dfd5', // Warm beige
  '#e2e6d5'  // Soft olive
] as const;

export const HOVER_STYLES = {
  scale: 1.05,
  opacity: 0.85, // Slightly increased opacity for better visibility
  filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.08))' // Softer shadow
} as const;

export function calculatePercentage(value: number, total: number): number {
  return (value / total) * 100;
}

export function getChartDimensions(type: 'pie' | 'bar') {
  if (type === 'pie') {
    const size = 300;
    const padding = size * 0.1;
    return {
      width: size,
      height: size,
      padding,
      radius: size / 2
    };
  }
  
  return {
    margin: { top: 20, right: 20, bottom: 60, left: 40 },
    width: 400,
    height: 300
  };
}