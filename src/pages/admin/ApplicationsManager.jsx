import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useOutletContext } from 'react-router-dom';

const ApplicationsManager = () => {
  const { profile } = useOutletContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("Table applications non trouvée ou erreur:", error.message);
      } else {
        setApplications(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert(`Erreur mise à jour: ${err.message}`);
    }
  }

  async function deleteApp(id) {
    if (!window.confirm("Supprimer cette candidature ?")) return;
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (error) throw error;
      setApplications(prev => prev.filter(a => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      alert(`Erreur suppression: ${err.message}`);
    }
  }

  const STATUS_CLASSES = {
    'pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'reviewed': 'bg-luma-blue/10 text-luma-blue border-luma-blue/20',
    'accepted': 'bg-moss/10 text-moss border-moss/20',
    'rejected': 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="mb-8 lg:mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Recrutement & Talents</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Candidatures Reçues</h1>
          <p className="text-white/40 text-xs mt-1">Supervisé par le COO • Visible par toute l'équipe</p>
        </div>
        <button onClick={fetchApplications} className="text-white/20 hover:text-white transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-1">
           <i className="fa-solid fa-rotate"></i> Actualiser
        </button>
      </div>

      <div className="bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr className="text-[10px] font-black uppercase tracking-widest text-white/30">
                <th className="px-8 py-5">Candidat</th>
                <th className="px-8 py-5">Poste Visé</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Statut (Validation COO)</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-white/10 italic tracking-widest uppercase text-xs">Chargement des dossiers...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-white/20 italic">Aucune candidature enregistrée pour le moment. Exécutez le script SQL Supabase si requis.</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedApp(app)}>
                    <td className="px-8 py-6">
                      <p className="font-black text-sm text-white uppercase tracking-tight">{app.full_name}</p>
                      <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">{app.email} {app.phone ? `• ${app.phone}` : ''}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-luma-purple bg-luma-purple/10 px-3 py-1.5 rounded-xl border border-luma-purple/20">{app.position}</span>
                    </td>
                    <td className="px-8 py-6 text-xs text-white/40 font-semibold">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <select
                        onClick={e => e.stopPropagation()}
                        value={app.status || 'pending'}
                        onChange={e => updateStatus(app.id, e.target.value)}
                        className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${STATUS_CLASSES[app.status || 'pending']}`}
                      >
                        <option value="pending" className="bg-luma-dark text-white">En attente</option>
                        <option value="reviewed" className="bg-luma-dark text-white">En cours d'examen</option>
                        <option value="accepted" className="bg-luma-dark text-white">Validé (Accepté)</option>
                        <option value="rejected" className="bg-luma-dark text-white">Rejeté</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2" onClick={e => e.stopPropagation()}>
                      {app.cv_url && (
                        <a href={app.cv_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:text-white transition-all" title="Télécharger CV">
                          <i className="fa-solid fa-file-pdf text-xs"></i>
                        </a>
                      )}
                      <button onClick={() => deleteApp(app.id)} className="w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:text-red-500 transition-all" title="Supprimer">
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedApp(null)}></div>
          <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-1">{selectedApp.full_name}</h3>
                <p className="text-luma-purple text-xs font-bold uppercase tracking-widest">{selectedApp.position}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="w-10 h-10 rounded-full bg-white/5 text-white/40 hover:text-white flex items-center justify-center">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-6 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/30 mb-1">Email</p>
                  <p className="text-sm font-bold text-white">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/30 mb-1">Téléphone</p>
                  <p className="text-sm font-bold text-white">{selectedApp.phone || 'Non spécifié'}</p>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                <p className="text-[10px] font-black uppercase text-luma-blue tracking-widest mb-4 border-b border-white/5 pb-2">Lettre de motivation</p>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap font-medium">{selectedApp.cover_letter}</p>
              </div>

              {selectedApp.cv_url && (
                <div>
                  <a href={selectedApp.cv_url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-3 bg-luma-purple text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-luma-purple/80 transition-all">
                    <i className="fa-solid fa-file-pdf"></i> Ouvrir le CV du candidat
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManager;
