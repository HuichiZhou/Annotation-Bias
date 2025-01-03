import type { AnalysisEntry } from '@/types/analysis';

export async function fetchAnalysisData(): Promise<AnalysisEntry[]> {
  try {
    const response = await fetch('/analysis.jsonl');
    const text = await response.text();
    // Handle JSONL format by splitting on newlines and parsing each line
    return text
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
  } catch (error) {
    console.error('Error loading analysis data:', error);
    return [];
  }
}