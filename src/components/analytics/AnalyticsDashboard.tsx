import React from 'react';
import { BarChart2, Clock, Zap } from 'lucide-react';
import { ResponseTimeChart } from './ResponseTimeChart';
import { QueryMetrics } from './QueryMetrics';
import { MetricCard } from './MetricCard';
import { useAnalyticsContext } from '../../contexts/AnalyticsContext';
import { useAnalyticsMetrics } from '../../hooks/useAnalyticsMetrics';

export function AnalyticsDashboard() {
  const { events, stats } = useAnalyticsContext();
  const metrics = useAnalyticsMetrics(events);
  const successRate = metrics.getSuccessRate().toFixed(1);
  const avgResponseTime = metrics.getAverageResponseTime().toFixed(0);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <MetricCard
          title="Total Queries"
          value={stats.totalQueries.toString()}
          trend={`${stats.cacheHits} cache hits`}
          icon={Zap}
          trendUp={true}
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate}%`}
          trend={`${stats.failedQueries} failed`}
          icon={Clock}
          trendUp={stats.failedQueries === 0}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${avgResponseTime}ms`}
          trend="last hour"
          icon={BarChart2}
          trendUp={Number(avgResponseTime) < 200}
        />
      </div>
      
      <ResponseTimeChart events={stats.recentEvents} />
      <QueryMetrics events={stats.recentEvents} />
    </div>
  );
}