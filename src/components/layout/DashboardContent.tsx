import { FileList } from '@/components/FileList';
import { ResultsTable } from '@/components/ResultsTable';
import { PieChart } from '@/components/charts/PieChart';
import { BarChart } from '@/components/charts/BarChart';
import type { ProcessedFile } from '@/types/analysis';
import type { ProcessedData } from '@/lib/processAnalysisData';

interface DashboardContentProps {
  files: ProcessedFile[];
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
  analysisData: ProcessedData | null;
}

export function DashboardContent({ 
  files, 
  selectedFile, 
  onFileSelect, 
  analysisData 
}: DashboardContentProps) {
  const currentFile = files.find(f => f.filename === selectedFile) || files[0];

  return (
    <div className="space-y-8 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysisData && (
          <>
            <PieChart data={analysisData.pieData} />
            <BarChart data={analysisData.barData} />
          </>
        )}
      </div>

      {currentFile && <ResultsTable data={currentFile.data} />}
      
      <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
        <FileList 
          files={files}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
        />
      </div>
    </div>
  );
}