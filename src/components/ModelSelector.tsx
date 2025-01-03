import { Brain } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ModelSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center space-x-4">
      <Brain className="h-5 w-5 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="llama-3.1">LLaMA 3.1</SelectItem>
          <SelectItem value="gpt-4" disabled className="text-[#808080] cursor-not-allowed">
            GPT-4 (in progress)
          </SelectItem>
          <SelectItem value="claude" disabled className="text-[#808080] cursor-not-allowed">
            Claude (in progress)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}