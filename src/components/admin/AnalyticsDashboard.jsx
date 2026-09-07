import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, growth: 0 });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    // Simulation de données basées sur les projets réels
    const { data: projects } = await supabase.from('projects').select('created_at, title');

    // On groupe par mois pour le graphique
    const months = ['Jan', 'Féb', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    const chartData = months.map((m, i) => ({
      name: m,
      projets: projects?.filter(p => new Date(p.created_at).getMonth() === i).length || 0,
      impact: Math.floor(Math.random() * 100)
    }));

    setData(chartData);
    setStats({ total: projects?.length || 0, growth: '+15%' });
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Indice de Production', val: stats.total, color: 'text-luma-purple' },
          { label: 'Taux de Conversion', val: '24%', color: 'text-luma-blue' },
          { label: 'Croissance Matrice', val: stats.growth, color: 'text-moss' }
        ].map((s, i) => (
          <div key={i} className="bg-luma-card border border-white/5 p-8 rounded-[2rem] shadow-xl">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{s.label}</p>
             <p className={`text-4xl font-display font-black ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-luma-card border border-white/5 p-10 rounded-[3rem] shadow-2xl h-[450px]">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-10">Flux de Développement Annuel</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9E7AFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#9E7AFF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="bold" />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="bold" />
            <Tooltip
              contentStyle={{ background: '#120E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }}
              itemStyle={{ color: '#9E7AFF', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="projets" stroke="#9E7AFF" fillOpacity={1} fill="url(#colorP)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
