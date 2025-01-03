import { useState, useEffect } from 'react';
import { ColorBlocks } from '@/components/decorative/ColorBlocks';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardContent } from '@/components/layout/DashboardContent';
import { StatsCards } from '@/components/StatsCards';
import { fetchAnalysisData } from '@/lib/api';
import { processAnalysisData } from '@/lib/processAnalysisData';
import type { ProcessedFile } from '@/types/analysis';

export default function App() {
  const [selectedModel, setSelectedModel] = useState('llama-3.1');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [files, setFiles] = useState<ProcessedFile[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchAnalysisData();
      const processed = processAnalysisData(data);
      setAnalysisData(processed);
      setFiles([{
        filename: 'analysis.jsonl',
        timestamp: new Date().toISOString(),
        data
      }]);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <ColorBlocks position="top" />
      
      <div className="max-w-7xl mx-auto p-8 space-y-8 relative z-10">
        <DashboardHeader 
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />

        {analysisData && <StatsCards {...analysisData.stats} />}

        <DashboardContent
          files={files}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          analysisData={analysisData}
        />
      </div>

      <ColorBlocks position="bottom" />
    </div>
  );
}