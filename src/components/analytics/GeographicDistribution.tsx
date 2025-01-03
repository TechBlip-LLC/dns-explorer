import React from 'react';
import { Card } from '../ui/Card';
import { getQueryLocations } from '../../services/geoip';

export function GeographicDistribution() {
  const locations = getQueryLocations();
  const totalQueries = locations.length;
  
  const countryStats = locations.reduce((acc, loc) => {
    acc[loc.country] = (acc[loc.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
      <div className="space-y-4">
        <div className="relative h-[200px] bg-gray-100 rounded-lg overflow-hidden">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')]" />
          
          {/* Query Points */}
          {locations.map((loc, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-indigo-500 rounded-full animate-ping"
              style={{
                left: `${((loc.longitude + 180) / 360) * 100}%`,
                top: `${((loc.latitude + 90) / 180) * 100}%`
              }}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total Queries</div>
            <div className="text-2xl font-semibold text-gray-900">{totalQueries}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Active Regions</div>
            <div className="text-2xl font-semibold text-gray-900">{Object.keys(countryStats).length}</div>
          </div>
        </div>

        {/* Country Breakdown */}
        <div className="space-y-2">
          {Object.entries(countryStats).map(([country, count]) => (
            <div key={country} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{country}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(count / totalQueries) * 100}px` }} 
                />
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}