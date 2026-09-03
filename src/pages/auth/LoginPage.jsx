import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, Lock, User as UserIcon, Github, Chrome, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HangingLamp from "../../components/login/HangingLamp";
import GlowingRobot from "../../components/login/GlowingRobot";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsPending(false);
      } else {
        navigate("/admin");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Une erreur est survenue lors de la connexion.");
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#050810] overflow-hidden selection:bg-[#00ff88]/30 selection:text-white">
      {/* Left Decoration (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-between py-12 relative border-r border-white/5 bg-slate-900/20">
        <HangingLamp />
        <GlowingRobot />
        <div className="text-center z-10">
          <h2 className="text-white font-black text-xl tracking-widest uppercase italic opacity-10 font-display">DEVELITE TECH</h2>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00ff88]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9E7AFF]/20 rounded-full blur-[120px]" />
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative">
        {/* Mobile Decoration */}
        <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 opacity-20 scale-50 pointer-events-none">
          <GlowingRobot />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8 lg:mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-display font-black text-white tracking-tighter leading-none mb-3">
              Bon retour <span className="text-[#00ff88]">parmi nous.</span>
            </h1>
            <p className="text-blue-100/30 text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">
              Console de gestion Elite
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
            <motion.div variants={itemVariants}>
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100/20 mb-2 block px-2">
                Utilisateur
              </label>
              <div className="relative group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-100/20 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl pl-14 pr-6 py-4 lg:py-4.5 outline-none focus:border-[#00ff88]/50 transition-all font-bold text-white text-xs lg:text-sm"
                  placeholder="admin@deve-lite.tech"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100/20 mb-2 block px-2">
                Mot de passe
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-100/20 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl pl-14 pr-6 py-4 lg:py-4.5 outline-none focus:border-[#00ff88]/50 transition-all font-bold text-white text-xs lg:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {error && (
              <motion.div variants={itemVariants} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-bold text-center">
                {error}
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isPending}
              type="submit"
              className="w-full bg-[#00ff88] text-[#050810] py-5 lg:py-5.5 rounded-xl lg:rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-all flex items-center justify-center group disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <div className="flex items-center font-bold">
                  S'identifier <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="my-8 lg:my-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[8px] font-black text-blue-100/10 uppercase tracking-widest">ou</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex items-center justify-center gap-3 py-3.5 lg:py-4 bg-white/[0.01] border border-white/5 rounded-xl lg:rounded-2xl text-blue-100/30 text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <Chrome size={16} /> Google
            </motion.button>
            <motion.button
              type="button"
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex items-center justify-center gap-3 py-3.5 lg:py-4 bg-white/[0.01] border border-white/5 rounded-xl lg:rounded-2xl text-blue-100/30 text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <Github size={16} /> GitHub
            </motion.button>
          </div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-10 text-center">
            <p className="text-[8px] lg:text-[9px] font-black text-blue-100/10 uppercase tracking-widest">
              Besoin d'aide ? <span className="text-[#00ff88]/50 cursor-pointer hover:underline">Support technique</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#9E7AFF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
