import { Card } from '@/components/ui/card';
import { Brain, BarChart3, Users } from 'lucide-react';

interface StatsCardsProps {
  totalCases: number;
  matchingLabels: number;
  accuracy: string;
}

export function StatsCards({ totalCases, matchingLabels, accuracy }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6 space-y-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-[#B4B8A6]" />
          <h3 className="text-sm font-medium">Total Cases</h3>
        </div>
        <p className="text-2xl font-bold">{totalCases}</p>
      </Card>
      
      <Card className="p-6 space-y-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-[#E2C1C0]" />
          <h3 className="text-sm font-medium">Matching Labels</h3>
        </div>
        <p className="text-2xl font-bold">{matchingLabels}</p>
      </Card>

      <Card className="p-6 space-y-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-[#A5B0BB]" />
          <h3 className="text-sm font-medium">Accuracy</h3>
        </div>
        <p className="text-2xl font-bold">{accuracy}%</p>
      </Card>
    </div>
  );
}