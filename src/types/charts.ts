export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface TooltipData {
  label: string;
  value: number;
  percentage: number;
  position: {
    x: number;
    y: number;
  };
}