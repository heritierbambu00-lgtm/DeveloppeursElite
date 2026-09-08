import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { classifyContactMessage } from '../lib/aiService';
import { sendNotificationEmail } from '../lib/emailService';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Développement logiciel',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      console.log("Démarrage de l'analyse IA...");
      const aiRouting = await classifyContactMessage(form.message);
      console.log("IA a assigné le message à:", aiRouting.assigned_to);

      console.log("Insertion en base de données Supabase...");
      const { error: submitError } = await supabase
        .from('contacts')
        .insert([{
          ...form,
          assigned_to: aiRouting.assigned_to,
          ai_analysis: aiRouting.analysis
        }]);

      if (submitError) {
        console.error("Erreur d'insertion Supabase:", submitError);
        throw submitError;
      }

      // 2.5 Création d'une notification système
      await supabase.from('notifications').insert([{
        type: 'message',
        title: `Nouveau message: ${form.name}`,
        content: form.message,
        assigned_to: aiRouting.assigned_to
      }]);

      console.log("Message enregistré en base de données.");

      console.log("Envoi de la notification email...");
      await sendNotificationEmail(form, aiRouting.assigned_to);

      setSent(true);
      setForm({ name: '', email: '', subject: 'Développement logiciel', message: '' });
    } catch (err) {
      console.error("Processus de contact échoué:", err.message);
      setError(`Échec : ${err.message}. Vérifiez la console pour plus de détails.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-paper dark:bg-luma-dark transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 min-w-0">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">{t('section.contact.badge')}</p>
          <h2 className="rv mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05] dark:text-white">
            {t('section.contact.title')}
          </h2>
          <p className="rv mt-5 text-[15px] leading-relaxed text-smoke dark:text-white/40 max-w-md font-medium italic">
            {t('section.contact.desc')}
          </p>

          <div className="rv mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-line dark:border-white/10 grid place-items-center shrink-0 shadow-sm">
                <i className="fa-solid fa-location-dot text-clay"></i>
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-smoke dark:text-white/20">{t('contact.address')}</p>
                <p className="mt-1 text-[14.5px] font-bold dark:text-white/80">Butembo, Nord-Kivu, RDC</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-line dark:border-white/10 grid place-items-center shrink-0 shadow-sm">
                <i className="fa-solid fa-envelope text-clay"></i>
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-smoke dark:text-white/20">{t('contact.email')}</p>
                <p className="mt-1 text-[14.5px] font-bold dark:text-white/80">contact@deve-lite.tech</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <div className="rv bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-line dark:border-white/5 p-7 sm:p-10 shadow-2xl">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/20 mb-3 ml-1" htmlFor="f-nom">{t('contact.form.name')}</label>
                    <input id="f-nom" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: Héritier Junior"
                           className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/20 mb-3 ml-1" htmlFor="f-mail">{t('contact.form.mail')}</label>
                    <input id="f-mail" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="vous@exemple.com"
                           className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/20 mb-3 ml-1" htmlFor="f-sujet">{t('contact.form.subject')}</label>
                  <select id="f-sujet" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                          className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition dark:text-white font-bold appearance-none cursor-pointer">
                    <option className="dark:bg-luma-dark">Développement logiciel</option>
                    <option className="dark:bg-luma-dark">Intelligence artificielle</option>
                    <option className="dark:bg-luma-dark">Formation en informatique</option>
                    <option className="dark:bg-luma-dark">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-smoke dark:text-white/20 mb-3 ml-1" htmlFor="f-msg">{t('contact.form.message')}</label>
                  <textarea id="f-msg" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows="5" placeholder="..."
                            className="w-full rounded-2xl border border-line dark:border-white/10 bg-paper dark:bg-white/5 px-5 py-4 text-[14.5px] focus:border-clay outline-none transition resize-none dark:text-white font-medium" />
                </div>
                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/5 p-4 rounded-xl border border-red-500/10">{error}</p>}
                <button type="submit" disabled={sending}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-ink dark:bg-clay text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-2xl hover:bg-clayd transition-all duration-300 disabled:opacity-70 shadow-xl active:scale-95">
                  {sending ? (
                    <><i className="fa-solid fa-circle-notch fa-spin"></i> {t('contact.btn.sending')}</>
                  ) : (
                    <>{t('contact.btn.send')} <i className="fa-solid fa-paper-plane text-[11px]"></i></>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-14">
                <span className="mx-auto w-16 h-16 rounded-[2rem] bg-moss/10 border border-moss/30 grid place-items-center mb-8 animate-in zoom-in-50 duration-500 shadow-lg shadow-moss/10">
                  <i className="fa-solid fa-check text-moss text-[24px]"></i>
                </span>
                <h3 className="font-display font-black text-3xl tracking-tight text-ink dark:text-white uppercase italic">{t('contact.success')}</h3>
                <p className="mt-4 text-sm text-smoke dark:text-white/40 font-medium leading-relaxed max-w-sm mx-auto">{t('contact.success_desc')}</p>
                <button onClick={() => setSent(false)} className="mt-10 text-clay font-black uppercase text-[10px] tracking-[0.3em] hover:text-ink dark:hover:text-white transition-colors">{t('contact.btn.again')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
