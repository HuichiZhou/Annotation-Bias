import { ModelSelector } from '@/components/ModelSelector';

interface DashboardHeaderProps {
  selectedModel: string;
  onModelChange: (value: string) => void;
}

export function DashboardHeader({ selectedModel, onModelChange }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-foreground/90">Annotation-Bias Check Dashboard</h1>
      <ModelSelector value={selectedModel} onChange={onModelChange} />
    </div>
  );
}