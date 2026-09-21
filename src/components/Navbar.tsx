import React from 'react';
import { Download, LogOut, Smartphone, User, Sparkles } from 'lucide-react';
import { WeatherDataMDP } from '../types';

interface Props {
  weather: WeatherDataMDP;
  onOpenInstallModal: () => void;
  onLogout: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}

export const Navbar: React.FC<Props> = ({
  weather,
  onOpenInstallModal,
  onLogout,
  isInstallable,
  isInstalled
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-sky-500 p-0.5 shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[0.9rem] flex items-center justify-center text-lg">
              🏃‍♀️
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-slate-900 text-base tracking-tight">MAR DEL TROTE</h1>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Entrenadora
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Mar del Plata • Planificación y Nutrición
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <button
            onClick={onOpenInstallModal}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isInstalled
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
            title="Instalar Mar del Trote en el dispositivo"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isInstalled ? 'App Instalada' : 'Instalar App'}</span>
          </button>

          {/* Salir / Cambiar */}
          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Volver a la pantalla de acceso"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
