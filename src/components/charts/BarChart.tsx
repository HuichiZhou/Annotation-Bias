import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChartTooltip } from './ChartTooltip';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';
import { CHART_COLORS, HOVER_STYLES, calculatePercentage, getChartDimensions } from '@/lib/charts/constants';
import type { ChartDataPoint, TooltipData } from '@/types/charts';

interface BarChartProps {
  data: ChartDataPoint[];
  className?: string;
}

export function BarChart({ data, className }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const { margin, width: fullWidth, height: fullHeight } = getChartDimensions('bar');
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;
    const total = d3.sum(data, d => d.value);

    const svg = d3.select(svgRef.current)
      .attr('width', fullWidth)
      .attr('height', fullHeight);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([height, 0]);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('stroke-opacity', 0.2);

    // Add bars with hover interaction
    const bars = g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label) || 0)
      .attr('y', height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', (_, i) => CHART_COLORS[i % CHART_COLORS.length])
      .attr('rx', 4)
      .style('transform-origin', d => `${(x(d.label) || 0) + x.bandwidth() / 2}px ${height}px`);

    // Animate bars on initial render
    bars.transition()
      .duration(300)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value));

    // Add hover effects
    bars.on('mouseover', function(event, d) {
        const percentage = calculatePercentage(d.value, total);
        const rect = this as SVGRectElement;
        const containerRect = containerRef.current!.getBoundingClientRect();
        const barRect = rect.getBoundingClientRect();
        
        // Calculate position relative to the container
        const tooltipX = barRect.left - containerRect.left + barRect.width / 2;
        const tooltipY = barRect.top - containerRect.top;
        
        setTooltip({
          label: d.label,
          value: d.value,
          percentage,
          position: {
            x: tooltipX,
            y: tooltipY
          }
        });

        d3.select(this)
          .attr('opacity', HOVER_STYLES.opacity)
          .style('filter', HOVER_STYLES.filter)
          .transition()
          .duration(150)
          .attr('transform', `scale(${HOVER_STYLES.scale}, 1)`);
      })
      .on('mouseout', function() {
        setTooltip(null);
        d3.select(this)
          .attr('opacity', 1)
          .style('filter', 'none')
          .transition()
          .duration(150)
          .attr('transform', 'scale(1, 1)');
      });

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('dx', '-0.8em')
      .attr('dy', '0.6em')
      .style('text-anchor', 'end');

    g.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-lg font-semibold mb-4">Label Comparison</h3>
      <div ref={containerRef} className="relative">
        <svg ref={svgRef} />
        {tooltip && <ChartTooltip {...tooltip} />}
      </div>
    </Card>
  );
}