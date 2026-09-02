import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    role: '',
    bio: '',
    avatarUrl: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, role, bio, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setProfile({
          fullName: data.full_name || '',
          role: data.role || '',
          bio: data.bio || '',
          avatarUrl: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Erreur profile:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const updates = {
        id: user.id,
        full_name: profile.fullName,
        role: profile.role,
        bio: profile.bio,
        avatar_url: profile.avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      setIsEditing(false);
      alert('Profil synchronisé avec la matrice !');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) throw new Error('Sélectionnez une image.');

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setProfile({ ...profile, avatarUrl: publicUrl });
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  if (loading && !profile.fullName) {
    return (
      <div className="flex items-center justify-center py-20 text-white/20">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl"></i>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Identité Numérique</h2>
        <h1 className="font-display font-black text-4xl text-white tracking-tight">Mon Profil</h1>
      </div>

      {!isEditing ? (
        /* PREMIUM MEMBER CARD VIEW */
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-luma-purple to-luma-pink rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-luma-card backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Visual */}
              <div className="md:w-1/3 bg-white/5 p-10 flex flex-col items-center justify-center border-r border-white/5">
                <div className="w-40 h-40 rounded-3xl p-1 bg-neon-purple shadow-2xl shadow-luma-purple/20 mb-6">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-luma-dark">
                    <img
                      src={profile.avatarUrl || '/Heritier.jpg'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status Matrice</p>
                   <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss/10 text-moss text-[10px] font-black uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse"></span>
                      Actif
                   </span>
                </div>
              </div>

              {/* Right Side - Info */}
              <div className="flex-1 p-10 lg:p-14 relative">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-4xl font-display font-black text-white tracking-tighter mb-2">{profile.fullName}</h3>
                    <p className="text-luma-purple font-bold uppercase tracking-[0.2em] text-xs">{profile.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                    <i className="fa-solid fa-id-card text-white/20 text-xl"></i>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Biographie Technique</p>
                    <p className="text-white/60 leading-relaxed font-medium">
                      {profile.bio || "Aucune biographie n'a encore été synchronisée avec la console."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                     <div>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Expertise</p>
                        <p className="text-sm font-bold text-white/80">Full-Stack Architect</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Localisation</p>
                        <p className="text-sm font-bold text-white/80">Butembo, RDC</p>
                     </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-12 w-full sm:w-auto bg-white text-luma-dark px-10 py-4 rounded-2xl text-sm font-black hover:bg-luma-purple hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  Modifier les informations
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* EDIT FORM VIEW */
        <div className="bg-luma-card backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={updateProfile} className="space-y-8">
            <div className="flex items-center gap-8 pb-8 border-b border-white/5">
              <div className="w-24 h-24 rounded-2xl border border-white/10 overflow-hidden bg-white/5 relative group">
                <img src={profile.avatarUrl || '/Heritier.jpg'} alt="Preview" className="w-full h-full object-cover" />
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
                  </div>
                )}
              </div>
              <div>
                <label className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 cursor-pointer transition-all">
                  <i className="fa-solid fa-camera"></i>
                  {uploading ? 'Chargement...' : 'Télécharger une photo'}
                  <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
                </label>
                <p className="text-[10px] text-white/30 mt-3 font-bold uppercase tracking-widest">Dimension recommandée: 800x800px</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Nom complet</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Rôle / Poste</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Biographie</label>
              <textarea
                rows="5"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-medium transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-neon-purple text-white px-10 py-4 rounded-2xl text-sm font-black shadow-lg shadow-luma-purple/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Synchronisation...' : 'Confirmer les changements'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-white/5 text-white/40 px-10 py-4 rounded-2xl text-sm font-black border border-white/10 hover:text-white hover:bg-white/10 transition-all"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
