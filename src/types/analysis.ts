export interface AnalysisEntry {
  Scenario: string;
  Reasoning: string;
  Annotation: number;
  "Human Label": number;
}

export interface ProcessedFile {
  filename: string;
  timestamp: string;
  data: AnalysisEntry[];
}