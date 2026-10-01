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
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-luma-purple/15 to-luma-blue/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-black uppercase tracking-[0.3em] text-ink/70 ld-sub">
        <span className="w-2 h-2 rounded-full bg-luma-purple animate-ping" />
        DEVELITE OS v2.0
      </div>

      {/* Large Logo Frame */}
      <div className="ld-mark mb-6 relative">
        <div className="absolute inset-0 bg-luma-purple/10 rounded-3xl blur-2xl filter" />
        <Logo className="w-28 h-28 sm:w-36 sm:h-36 relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]" />
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
      <div className="ld-track mt-8 w-56 sm:w-72 h-[3px] bg-mist overflow-hidden rounded-full relative">
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
