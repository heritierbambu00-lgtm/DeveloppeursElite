import React from 'react';
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-blue mb-2">Performance</h2>
        <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Ecosystem Analytics</h1>
      </div>
      <AnalyticsDashboard />
    </div>
  );
};

export default Analytics;
