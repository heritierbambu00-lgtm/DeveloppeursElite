import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Développement logiciel',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.rv');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    // Simulation of API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
      setForm({ name: '', email: '', subject: 'Développement logiciel', message: '' });
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 min-w-0">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(07) — Contact</p>
          <h2 className="rv mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05]" style={{ transitionDelay: '0.08s' }}>
            Parlons de votre projet.
          </h2>
          <p className="rv mt-5 text-[15px] leading-relaxed text-smoke max-w-md" style={{ transitionDelay: '0.16s' }}>
            Un logiciel à concevoir, un réseau à installer, une formation à organiser — ou simplement une idée à éprouver ? Écrivez-nous.
          </p>

          <div className="rv mt-10 space-y-6" style={{ transitionDelay: '0.24s' }}>
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-md bg-white border border-line grid place-items-center shrink-0">
                <i className="fa-solid fa-location-dot text-clay"></i>
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke">Adresse</p>
                <p className="mt-1 text-[14.5px] font-medium">Butembo, Nord-Kivu, RDC</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-md bg-white border border-line grid place-items-center shrink-0">
                <i className="fa-solid fa-envelope text-clay"></i>
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke">Email</p>
                <p className="mt-1 text-[14.5px] font-medium">contact@deve-lite.tech</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <div className="rv bg-white rounded-lg border border-line p-7 sm:p-10 shadow-[0_24px_60px_-40px_rgba(24,27,32,0.35)]">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2" htmlFor="f-nom">Nom complet</label>
                    <input id="f-nom" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Votre nom"
                           className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2" htmlFor="f-mail">Adresse email</label>
                    <input id="f-mail" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="vous@exemple.com"
                           className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2" htmlFor="f-sujet">Sujet</label>
                  <select id="f-sujet" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                          className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition">
                    <option>Développement logiciel</option>
                    <option>Intelligence artificielle</option>
                    <option>Formation en informatique</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2" htmlFor="f-msg">Votre message</label>
                  <textarea id="f-msg" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows="5" placeholder="Décrivez votre besoin..."
                            className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition resize-none"></textarea>
                </div>
                <button type="submit" disabled={sending}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-ink text-paper font-semibold text-sm px-8 py-4 rounded-md hover:bg-clay transition-colors duration-300 disabled:opacity-70">
                  {sending ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <span>Envoyer le message <i className="fa-solid fa-paper-plane text-[12px] ml-2"></i></span>}
                </button>
              </form>
            ) : (
              <div className="text-center py-14">
                <span className="mx-auto w-14 h-14 rounded-full bg-moss/10 border border-moss/30 grid place-items-center mb-5">
                  <i className="fa-solid fa-check text-moss text-[20px]"></i>
                </span>
                <h3 className="font-display font-bold text-2xl tracking-tight">Message bien reçu.</h3>
                <button onClick={() => setSent(false)} className="mt-7 u-link text-sm font-semibold text-clay">Envoyer un autre message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
