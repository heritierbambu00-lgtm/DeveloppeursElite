import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, ArrowLeft, Image as ImageIcon, Rocket, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NewProject() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Web",
    description: "",
    challenge: "",
    solution: "",
    result: "",
    project_link: "",
    meta_title: "",
    meta_description: "",
    status: "Prototype",
    status_color: "clay"
  });

  function handleImageChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié.");

      let image_url = "";

      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, file);

        if (uploadError) {
          // Fallback to 'avatars' bucket if 'project-images' doesn't exist
          const { error: fallbackError } = await supabase.storage
            .from("avatars")
            .upload(`projects/${fileName}`, file);

          if (fallbackError) throw new Error(`Erreur upload image: ${fallbackError.message}`);

          const { data: { publicUrl } } = supabase.storage
            .from("avatars")
            .getPublicUrl(`projects/${fileName}`);
          image_url = publicUrl;
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from("project-images")
            .getPublicUrl(fileName);
          image_url = publicUrl;
        }
      }

      const { error: insertError } = await supabase.from("projects").insert([
        {
          ...formData,
          image_url,
          created_by: user.id
        },
      ]);

      if (insertError) throw insertError;

      // Notification système
      await supabase.from('notifications').insert([{
        type: 'project',
        title: 'Nouveau projet gravé',
        content: `Le projet "${formData.title}" a été ajouté à la matrice.`,
        assigned_to: 'CTO'
      }]);

      navigate("/admin/projects");
    } catch (err) {
      console.error("CREATE ERROR:", err);
      setError(err.message);
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-luma-dark p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 lg:mb-12">
          <Link to="/admin/projects" className="inline-flex items-center text-white/20 hover:text-luma-purple font-black text-[10px] uppercase tracking-[0.4em] transition-all group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" />
            Retour à la Pipeline
          </Link>
          <div className="hidden lg:block text-luma-purple font-black text-[10px] uppercase tracking-[0.6em] border border-luma-purple/20 px-4 py-2 rounded-full">
            Protocol: Project Creation
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[3.5rem] border border-white/5 shadow-2xl"
        >
          <header className="mb-12 lg:mb-16">
            <h1 className="text-3xl lg:text-5xl font-display font-black text-white tracking-tighter uppercase italic mb-4">Graver un <span className="text-luma-purple">Projet</span></h1>
            <p className="text-white/30 font-medium italic text-sm lg:text-base">Inscrivez votre vision dans la pierre numérique de la matrice.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10 lg:space-y-14">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Nom de la réalisation</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
                  placeholder="Ex: Matrix Ecosystem"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Catégorie Matrix</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Web" className="bg-luma-dark text-white">Web & Cloud Infrastructure</option>
                  <option value="Mobile" className="bg-luma-dark text-white">Mobile Neural App</option>
                  <option value="AI" className="bg-luma-dark text-white">Artificial Intelligence</option>
                  <option value="Branding" className="bg-luma-dark text-white">Identity Design</option>
                </select>
              </div>
            </div>

            {/* Manifeste */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Manifeste du Projet (Description)</label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 outline-none focus:border-luma-purple/40 text-white font-medium text-sm lg:text-base leading-relaxed resize-none"
                placeholder="Décrivez l'âme et le but de cette création..."
              ></textarea>
            </div>

            {/* Case Study */}
            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase text-luma-blue tracking-[0.4em] border-b border-white/5 pb-3 ml-2">Étude de Cas (Optionnel)</h3>
              <div className="grid gap-8 lg:gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Le Défi (Challenge)</label>
                  <textarea
                    value={formData.challenge}
                    onChange={e => setFormData({...formData, challenge: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white text-sm"
                    placeholder="Quel était l'obstacle technique ou business ?"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">La Solution Élite</label>
                  <textarea
                    value={formData.solution}
                    onChange={e => setFormData({...formData, solution: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white text-sm"
                    placeholder="Quelles technologies et stratégies ont été déployées ?"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">L'Impact (Résultat)</label>
                  <textarea
                    value={formData.result}
                    onChange={e => setFormData({...formData, result: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white text-sm"
                    placeholder="Quel a été le succès final mesurable ?"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Link & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Lien d'accès (URL)</label>
                <input
                  type="url"
                  value={formData.project_link}
                  onChange={e => setFormData({...formData, project_link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white font-bold"
                  placeholder="https://develite-demo.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Visuel Haute Définition</label>
                <div className="relative group/upload">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  <div className="w-full h-[60px] bg-white/5 border-2 border-dashed border-white/5 rounded-2xl px-6 flex items-center justify-center text-white/20 group-hover/upload:border-luma-purple transition-all font-black text-[10px] uppercase tracking-widest">
                    <ImageIcon size={18} className="mr-3 shrink-0" />
                    <span className="truncate">{file ? file.name : "Sélectionner un fichier"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            {preview && (
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl">
                <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                <button
                   type="button"
                   onClick={() => {setPreview(null); setFile(null);}}
                   className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={24} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 pointer-events-none">
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 flex items-center gap-2">
                     <CheckCircle size={14} className="text-luma-purple" /> Aperçu du Rendu Final
                   </span>
                </div>
              </div>
            )}

            {/* SEO Section */}
            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase text-luma-pink tracking-[0.4em] border-b border-white/5 pb-3 ml-2">Optimisation SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={e => setFormData({...formData, meta_title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white text-xs font-bold"
                    placeholder="Titre pour les moteurs de recherche"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Meta Description</label>
                  <input
                    type="text"
                    value={formData.meta_description}
                    onChange={e => setFormData({...formData, meta_description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-luma-purple/40 text-white text-xs font-bold"
                    placeholder="Résumé court pour Google"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-red-400 text-xs font-bold text-center">
                ALERTE SYSTÈME : {error}
              </div>
            )}

            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-white text-luma-dark py-6 lg:py-8 rounded-[2rem] font-black text-xs lg:text-sm uppercase tracking-[0.5em] hover:bg-luma-purple hover:text-white hover:shadow-[0_0_60px_rgba(158,122,255,0.4)] transition-all duration-700 flex items-center justify-center group disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 size={24} className="animate-spin mr-4" />
                  Initialisation de la Gravure...
                </>
              ) : (
                <>
                  Graver dans la Matrice
                  <Rocket size={24} className="ml-5 group-hover:-translate-y-3 group-hover:translate-x-3 transition-transform duration-700" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
