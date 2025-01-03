import type { AnalysisEntry } from '@/types/analysis';

export interface ProcessedData {
  stats: {
    totalCases: number;
    matchingLabels: number;
    accuracy: string;
  };
  pieData: Array<{ label: string; value: number }>;
  barData: Array<{ label: string; value: number }>;
}

export function processAnalysisData(data: AnalysisEntry[]): ProcessedData {
  const totalCases = data.length;
  const matchingLabels = data.filter(entry => entry.Annotation === entry["Human Label"]).length;
  const accuracy = (matchingLabels / totalCases) * 100;

  const labelDistribution = data.reduce((acc, entry) => {
    acc[entry.Annotation] = (acc[entry.Annotation] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const pieData = Object.entries(labelDistribution).map(([label, count]) => ({
    label: getLabelName(parseInt(label)),
    value: count
  }));

  const comparisonData = Object.entries(labelDistribution).map(([label, count]) => ({
    label: getLabelName(parseInt(label)),
    value: count
  }));

  return {
    stats: {
      totalCases,
      matchingLabels,
      accuracy: accuracy.toFixed(1)
    },
    pieData,
    barData: comparisonData
  };
}

function getLabelName(label: number): string {
  switch (label) {
    case 0: return 'Ambiguous';
    case 1: return 'Clear';
    case 2: return 'Uncertain';
    case 3: return 'Invalid';
    default: return `Label ${label}`;
  }
}