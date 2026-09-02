import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const Loader = ({ onFinish }) => {
  const [isDone, setIsDone] = useState(false);
  const word = 'DEVELITE TECH';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onFinish, 950); // Match CSS transition duration
    }, 2500); // Duration to show the loader

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="loader" className={isDone ? 'is-done' : ''} aria-hidden="true">
      <div className="ld-mark mb-6">
        <Logo className="w-16 h-16" />
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

      <p className="ld-sub mt-4 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-smoke">
        Ingénierie · Innovation · Excellence
      </p>

      <div className="ld-track mt-10 w-48 sm:w-64 h-[2px] bg-mist overflow-hidden">
        <div className="ld-bar h-full bg-clay"></div>
      </div>

      <p className="ld-sub mt-3 text-[10px] uppercase tracking-[0.3em] text-smoke/70">Chargement ...</p>
    </div>
  );
};

export default Loader;
