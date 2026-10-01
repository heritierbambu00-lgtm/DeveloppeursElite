import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Loader = ({ onFinish }) => {
  const { t } = useLanguage();
  const [isDone, setIsDone] = useState(false);
  const word = 'DEVELITE TECH';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onFinish, 950);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="loader" className={isDone ? 'is-done' : ''} aria-hidden="true">
      {/* Glow Backdrop */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-luma-purple/20 to-luma-blue/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-black uppercase tracking-[0.3em] text-ink/70 ld-sub shadow-sm">
        <span className="w-2 h-2 rounded-full bg-luma-purple animate-ping" />
        DEVELITE OS v2.0
      </div>

      {/* Extremely Large & Rounded Logo Frame */}
      <div className="ld-mark mb-6 relative">
        <div className="absolute inset-0 bg-luma-purple/20 rounded-[3rem] blur-3xl filter" />
        <Logo className="w-40 h-40 sm:w-52 sm:h-52 relative z-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.18)] object-cover border-2 border-white/40 p-2 bg-white/80 backdrop-blur-md" />
      </div>

      <div className="ld-word" aria-label={word}>
        {word.split('').map((char, i) => (
          <span key={i} className="ld-l">
            <span
              style={{ animationDelay: `${0.22 + i * 0.05}s` }}
              dangerouslySetInnerHTML={{ __html: char === ' ' ? '&nbsp;' : char }}
            />
          </span>
        ))}
      </div>

      <p className="ld-sub mt-4 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-smoke font-bold">
        {t('loader.line1')}
      </p>

      {/* Progress Bar */}
      <div className="ld-track mt-8 w-60 sm:w-80 h-[3px] bg-mist overflow-hidden rounded-full relative">
        <div className="ld-bar h-full bg-gradient-to-r from-luma-purple via-luma-blue to-luma-purple rounded-full"></div>
      </div>

      <div className="flex items-center gap-3 mt-4 ld-sub">
        <span className="w-1.5 h-1.5 rounded-full bg-clay" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-smoke/70 font-semibold">{t('loader.loading')}</p>
        <span className="w-1.5 h-1.5 rounded-full bg-clay" />
      </div>
    </div>
  );
};

export default Loader;
