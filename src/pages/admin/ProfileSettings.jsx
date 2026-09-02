import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
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

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name || '');
        setRole(data.role || '');
        setBio(data.bio || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error.message);
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
        full_name: fullName,
        role,
        bio,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display font-bold text-3xl mb-8">Paramètres du profil</h1>

      <form onSubmit={updateProfile} className="space-y-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-lg border-2 border-line overflow-hidden bg-white">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-smoke">
                <i className="fa-solid fa-user text-3xl"></i>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-clay mb-2 cursor-pointer">
              {uploading ? 'Chargement...' : 'Changer la photo'}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </label>
            <p className="text-xs text-smoke">JPG, PNG ou JPEG. Max 2MB.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Nom complet</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-line p-3 rounded-md outline-none focus:border-clay transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Rôle / Poste</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border border-line p-3 rounded-md outline-none focus:border-clay transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Biographie</label>
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-white border border-line p-3 rounded-md outline-none focus:border-clay transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-paper px-8 py-3 rounded-md font-bold text-sm hover:bg-clay transition-colors disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
