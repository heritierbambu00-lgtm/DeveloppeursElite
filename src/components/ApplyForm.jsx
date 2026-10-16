import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

const ApplyForm = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: 'Software Engineer',
    cover_letter: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const positions = [
    'Software Engineer (Fullstack / Mobile)',
    'Intelligence Artificielle & Machine Learning',
    'UI/UX Designer',
    'DevOps & Cloud Engineer',
    'Community Manager & Marketing',
    'Autre / Stage'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      let cv_url = null;

      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(filePath, cvFile);

        if (uploadError) {
          console.warn("Erreur d'upload du CV (stockage non configuré ou autre):", uploadError.message);
        } else {
          const { data: urlData } = supabase.storage
            .from('cvs')
            .getPublicUrl(filePath);
          cv_url = urlData?.publicUrl || null;
        }
      }

      // Insert into applications table
      const { error: submitError } = await supabase
        .from('applications')
        .insert([{
          ...form,
          cv_url,
          status: 'pending',
          assigned_to: 'COO'
        }]);

      if (submitError) {
        throw submitError;
      }

      // Create notification for COO/Team
      await supabase.from('notifications').insert([{
        type: 'application',
        title: `Nouvelle candidature: ${form.full_name}`,
        content: `Poste: ${form.position} - Email: ${form.email}`,
        assigned_to: 'COO'
      }]);

      setSent(true);
      setForm({
        full_name: '',
        email: '',
        phone: '',
        position: 'Software Engineer',
        cover_letter: ''
      });
      setCvFile(null);
    } catch (err) {
      console.error("Erreur lors de la soumission de la candidature:", err.message);
      setError(`Échec : ${err.message}. Veuillez vérifier que la table 'applications' existe dans Supabase.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="postuler" className="py-24 lg:py-32 bg-paper dark:bg-luma-dark relative overflow-hidden transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Info */}
        <div className="lg:col-span-5 min-w-0">
          <p className="rv text-[11px] font-black uppercase tracking-[0.4em] text-clay mb-4">
            {language === 'en' ? 'Careers & Talent' : 'Carrières & Talents'}
          </p>
          <h2 className="rv font-display font-black tracking-tight text-4xl lg:text-[3.2rem] leading-[1.05] uppercase italic dark:text-white mb-6">
            {language === 'en' ? 'Join Our Elite Engineering Team' : 'Rejoignez notre équipe d’élite'}
          </h2>
          <p className="rv text-[15px] leading-relaxed text-smoke dark:text-white/60 font-medium italic mb-8">
            {language === 'en'
              ? 'We are always looking for exceptional engineers, AI researchers, and digital innovators. Submit your application below and our COO will review your profile.'
              : 'Nous recherchons constamment des ingénieurs d’élite, des chercheurs en IA et des innovateurs passionnés. Soumettez votre candidature ci-dessous pour examen par notre COO.'}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-line dark:border-white/10">
              <span className="w-10 h-10 rounded-xl bg-clay/10 text-clay grid place-items-center font-bold">01</span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest dark:text-white">
                  {language === 'en' ? 'Rigorous Selection' : 'Sélection Rigoureuse'}
                </h4>
                <p className="text-xs text-smoke dark:text-white/40 mt-0.5">
                  {language === 'en' ? 'Evaluated directly by leadership.' : 'Évalué directement par la direction.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-line dark:border-white/10">
              <span className="w-10 h-10 rounded-xl bg-luma-purple/10 text-luma-purple grid place-items-center font-bold">02</span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest dark:text-white">
                  {language === 'en' ? 'Innovative Projects' : 'Projets Innovants'}
                </h4>
                <p className="text-xs text-smoke dark:text-white/40 mt-0.5">
                  {language === 'en' ? 'Work on cutting-edge XR, AI & Web3.' : 'Travaillez sur des technos de pointe.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-7 min-w-0">
          <div className="rv bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-line dark:border-white/5 p-8 lg:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-clay/5 rounded-full blur-3xl pointer-events-none"></div>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-name">
                      {language === 'en' ? 'Full Name' : 'Nom Complet'} *
                    </label>
                    <input
                      id="app-name"
                      required
                      type="text"
                      value={form.full_name}
                      onChange={e => setForm({...form, full_name: e.target.value})}
                      placeholder="Ex: Héritier Junior"
                      className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-email">
                      {language === 'en' ? 'Email Address' : 'Adresse Email'} *
                    </label>
                    <input
                      id="app-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="vous@exemple.com"
                      className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-phone">
                      {language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+243 ..."
                      className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-position">
                      {language === 'en' ? 'Position' : 'Poste Visé'} *
                    </label>
                    <select
                      id="app-position"
                      value={form.position}
                      onChange={e => setForm({...form, position: e.target.value})}
                      className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold appearance-none cursor-pointer"
                    >
                      {positions.map((pos, idx) => (
                        <option key={idx} className="dark:bg-luma-dark">{pos}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-cv">
                    {language === 'en' ? 'CV / Resume (PDF)' : 'CV / Fichier (PDF / Document)'}
                  </label>
                  <input
                    id="app-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => setCvFile(e.target.files[0])}
                    className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-3 text-[14.5px] focus:border-clay outline-none transition dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-clay file:text-white hover:file:bg-clayd cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/40 mb-2 ml-1" htmlFor="app-letter">
                    {language === 'en' ? 'Cover Letter / Motivation' : 'Lettre de motivation & Message'} *
                  </label>
                  <textarea
                    id="app-letter"
                    required
                    rows="4"
                    value={form.cover_letter}
                    onChange={e => setForm({...form, cover_letter: e.target.value})}
                    placeholder={language === 'en' ? 'Tell us why you want to join...' : 'Parlez-nous de vos compétences et de votre motivation...'}
                    className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition resize-none dark:text-white font-medium"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-4 bg-ink dark:bg-clay text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-clayd transition-all duration-300 disabled:opacity-70 shadow-xl active:scale-95"
                >
                  {sending ? (
                    <><i className="fa-solid fa-circle-notch fa-spin"></i> {language === 'en' ? 'Submitting...' : 'Envoi en cours...'}</>
                  ) : (
                    <>{language === 'en' ? 'Submit Application' : 'Soumettre ma candidature'} <i className="fa-solid fa-paper-plane text-[11px]"></i></>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-16 relative z-10">
                <span className="mx-auto w-20 h-20 rounded-[2.5rem] bg-moss/10 border border-moss/30 grid place-items-center mb-8 animate-in zoom-in-50 duration-500 shadow-xl shadow-moss/10">
                  <i className="fa-solid fa-check text-moss text-[28px]"></i>
                </span>
                <h3 className="font-display font-black text-3xl tracking-tight text-ink dark:text-white uppercase italic">
                  {language === 'en' ? 'Application Received!' : 'Candidature Transmise !'}
                </h3>
                <p className="mt-4 text-sm text-smoke dark:text-white/60 font-medium leading-relaxed max-w-md mx-auto">
                  {language === 'en'
                    ? 'Thank you for applying. Our COO has received your profile and will review it shortly.'
                    : 'Merci d’avoir postulé. Notre COO a bien reçu votre dossier et examinera votre profil dans les plus brefs délais.'}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-10 text-clay font-black uppercase text-[10px] tracking-[0.3em] hover:text-ink dark:hover:text-white transition-colors"
                >
                  {language === 'en' ? 'Submit another application' : 'Envoyer une autre candidature'}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ApplyForm;
