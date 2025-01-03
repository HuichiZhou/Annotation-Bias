import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChartTooltip } from './ChartTooltip';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';
import { CHART_COLORS, HOVER_STYLES, calculatePercentage, getChartDimensions } from '@/lib/charts/constants';
import type { ChartDataPoint, TooltipData } from '@/types/charts';

interface PieChartProps {
  data: ChartDataPoint[];
  className?: string;
}

export function PieChart({ data, className }: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [centerText, setCenterText] = useState<string>('');

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const { width, height, padding, radius } = getChartDimensions('pie');
    const total = d3.sum(data, d => d.value);

    const svg = d3.select(svgRef.current)
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${(width + padding * 2) / 2},${(height + padding * 2) / 2})`);

    // Add center text group
    const centerGroup = g.append('g')
      .attr('class', 'center-text')
      .style('opacity', 0);

    centerGroup.append('text')
      .attr('class', 'percentage')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '24px')
      .attr('fill', 'currentColor')
      .attr('opacity', '0.9');

    const pie = d3.pie<ChartDataPoint>().value(d => d.value);
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    const arcs = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (_, i) => CHART_COLORS[i % CHART_COLORS.length])
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('transition', 'all 0.3s');

    // Add hover effects
    arcs.on('mouseover', function(event, d: any) {
      const percentage = calculatePercentage(d.value, total);
      const [x, y] = arc.centroid(d);
      const containerRect = containerRef.current!.getBoundingClientRect();
      
      // Update center text
      g.select('.center-text')
        .style('opacity', 1)
        .select('.percentage')
        .text(`${percentage.toFixed(1)}%`);

      // Calculate tooltip position relative to container
      const tooltipX = containerRect.width / 2 + x;
      const tooltipY = containerRect.height / 2 + y;

      setTooltip({
        label: d.data.label,
        value: d.value,
        percentage,
        position: {
          x: tooltipX,
          y: tooltipY
        }
      });

      d3.select(this)
        .attr('transform', `scale(${HOVER_STYLES.scale})`)
        .attr('opacity', HOVER_STYLES.opacity)
        .style('filter', HOVER_STYLES.filter);
    })
    .on('mouseout', function() {
      setTooltip(null);
      g.select('.center-text').style('opacity', 0);
      
      d3.select(this)
        .attr('transform', 'scale(1)')
        .attr('opacity', 1)
        .style('filter', 'none');
    });

  }, [data]);

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-lg font-semibold mb-4">Label Distribution</h3>
      <div ref={containerRef} className="relative flex justify-center">
        <svg ref={svgRef} />
        {tooltip && <ChartTooltip {...tooltip} />}
      </div>
    </Card>
  );
}