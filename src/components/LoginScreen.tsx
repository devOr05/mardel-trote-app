import React, { useState } from 'react';
import { 
  Download, ArrowRight, ShieldCheck, Dumbbell, 
  Sparkles, CheckCircle, Apple, Smartphone, Flame, User
} from 'lucide-react';
import { Alumno } from '../types';

interface Props {
  alumnos: Alumno[];
  onLoginEntrenadora: () => void;
  onLoginAlumno: (alumno: Alumno) => void;
  onOpenInstallModal: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}

export const LoginScreen: React.FC<Props> = ({
  alumnos,
  onLoginEntrenadora,
  onLoginAlumno,
  onOpenInstallModal,
  isInstallable,
  isInstalled
}) => {
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<string>(alumnos[0]?.id || '');

  const handleAlumnoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = alumnos.find(a => a.id === selectedAlumnoId);
    if (target) {
      onLoginAlumno(target);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-sky-950 text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic ocean background light accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Logo */}
      <div className="max-w-md mx-auto w-full pt-4 text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-sky-400 p-0.5 mx-auto shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[1.4rem] flex items-center justify-center">
            <span className="text-3xl">🏃‍♂️</span>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">
          MAR DEL TROTE
        </h1>
        <p className="text-xs text-emerald-300 font-medium tracking-wide uppercase">
          Entrenamiento Running & Nutrición • Mar del Plata
        </p>
      </div>

      {/* Main card */}
      <div className="max-w-md mx-auto w-full my-6 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 shadow-2xl space-y-5">
        {/* BOTÓN PROMINENTE DE INSTALACIÓN PWA */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-400/40 rounded-2xl p-4 text-center relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                App Progresiva (PWA)
              </span>
              <p className="text-[11px] text-slate-200 mt-0.5">
                {isInstalled 
                  ? '¡App ya instalada en tu dispositivo!' 
                  : 'Instalala en tu pantalla para abrirla como app nativa.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInstallModal}
              className={`py-2 px-3.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95 ${
                isInstalled
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 animate-pulse'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              {isInstalled ? 'Ver estado' : 'Instalar App'}
            </button>
          </div>
        </div>

        {/* Acceso Entrenadora */}
        <div className="space-y-3">
          <button
            onClick={onLoginEntrenadora}
            className="w-full py-4 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-between transition-all transform active:scale-98 group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center font-bold text-lg">
                👩‍🏫
              </div>
              <div>
                <span className="text-sm font-black block text-slate-950">Panel de la Entrenadora</span>
                <span className="text-[11px] text-slate-800 font-medium">Control total, rutinas, clima & cobros</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">o ingresar como alumno</span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        {/* Acceso Alumno */}
        <form onSubmit={handleAlumnoSubmit} className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Portal del Alumno (Simular acceso por link de WhatsApp):
          </label>
          <select
            value={selectedAlumnoId}
            onChange={(e) => setSelectedAlumnoId(e.target.value)}
            className="w-full text-xs p-3 bg-slate-900/80 border border-white/15 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {alumnos.map((alm) => (
              <option key={alm.id} value={alm.id} className="bg-slate-900 text-white">
                👟 {alm.nombre} — {alm.zonaMdp} ({alm.camino === 'entrenamiento' ? 'Entrenamiento' : alm.camino === 'entrenamiento_nutricion' ? 'Entreno + Nutrición' : 'Solo Nutrición'})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-98"
          >
            <User className="w-4 h-4 text-emerald-400" />
            Entrar al Portal de Alumno
          </button>
        </form>

        {/* Los 3 Caminos Explicados */}
        <div className="pt-2 border-t border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
            3 Caminos de Ingreso en Mar del Trote
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">
              <span className="block text-emerald-400 font-bold text-xs mb-0.5">1. Entreno</span>
              <span className="text-slate-300">Plan 3 modalidades</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">
              <span className="block text-amber-400 font-bold text-xs mb-0.5">2. Integral</span>
              <span className="text-slate-300">Running + Herbalife</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">
              <span className="block text-teal-400 font-bold text-xs mb-0.5">3. Nutrición</span>
              <span className="text-slate-300">Hábitos y asesoría</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 max-w-xs mx-auto space-y-1 pb-2">
        <p className="font-semibold text-slate-300">
          Desarrollado por <span className="text-emerald-400 font-bold">@taller_it_</span>
        </p>
        <p className="text-[10px] text-slate-500">
          Mar del Plata, Argentina
        </p>
      </div>
    </div>
  );
};
