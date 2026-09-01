import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Contact from './components/Contact'
import { CheckCircle2, ShieldCheck, Clock, Users } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen w-full bg-elite-dark selection:bg-elite-blue selection:text-white">
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>

      <footer className="py-8 border-t border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Qualité</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Sécurité</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Respect des délais</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Accompagnement</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
