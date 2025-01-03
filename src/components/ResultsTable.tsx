import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AnalysisEntry } from '@/types/analysis';

interface ResultsTableProps {
  data: AnalysisEntry[];
}

function getLabelText(value: number): string {
  switch (value) {
    case 0: return 'Ambiguous';
    case 1: return 'Clear';
    case 2: return 'Uncertain';
    case 3: return 'Invalid';
    default: return `Label ${value}`;
  }
}

export function ResultsTable({ data }: ResultsTableProps) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-foreground/90 mb-6">Detailed Results</h2>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] text-foreground/70">Scenario</TableHead>
              <TableHead className="text-foreground/70">Human Label</TableHead>
              <TableHead className="text-foreground/70">Model Label</TableHead>
              <TableHead className="w-[30%] text-foreground/70">Reasoning</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-foreground/80">{entry.Scenario}</TableCell>
                <TableCell className="text-foreground/80">{getLabelText(entry["Human Label"])}</TableCell>
                <TableCell className="text-foreground/80">{getLabelText(entry.Annotation)}</TableCell>
                <TableCell className="text-foreground/60">
                  {entry.Reasoning === 'N/A' ? '—' : entry.Reasoning}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}