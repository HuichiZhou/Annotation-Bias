import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { ProcessedFile } from '@/types/analysis';

interface FileListProps {
  files: ProcessedFile[];
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
}

export function FileList({ files, selectedFile, onFileSelect }: FileListProps) {
  return (
    <div className="space-y-4">
      <Input 
        placeholder="Filter files..." 
        className="max-w-sm"
      />
      <ScrollArea className="h-[400px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Processed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow 
                key={file.filename}
                className={`cursor-pointer ${selectedFile === file.filename ? 'bg-muted' : ''}`}
                onClick={() => onFileSelect(file.filename)}
              >
                <TableCell>{file.filename}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(file.timestamp))} ago</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}