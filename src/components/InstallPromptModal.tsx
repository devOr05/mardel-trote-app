import React from 'react';
import { Download, Share, PlusSquare, CheckCircle, X, Smartphone } from 'lucide-react';
import { usePwaInstall } from '../hooks/usePwaInstall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPromptModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, triggerInstall } = usePwaInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-100 rounded-full blur-2xl opacity-70 pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Instalar Mar del Trote</h3>
              <p className="text-xs text-slate-500">Acceso rápido sin usar la barra del navegador</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isInstalled ? (
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-3 animate-bounce" />
            <p className="font-semibold text-slate-800 text-base">¡La aplicación ya está instalada!</p>
            <p className="text-xs text-slate-500 mt-1">Podés abrirla directamente desde el icono en tu pantalla de inicio.</p>
            <button
              onClick={onClose}
              className="mt-5 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors"
            >
              Entendido
            </button>
          </div>
        ) : isIOS ? (
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600 leading-relaxed">
              En iPhone o iPad, podés agregar Mar del Trote a tu pantalla principal en dos pasos:
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs shrink-0">1</span>
                <span>Tocá el botón <strong>Compartir</strong> en la barra de Safari:</span>
                <Share className="w-4 h-4 text-sky-600 shrink-0 inline ml-auto" />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs shrink-0">2</span>
                <span>Deslizá hacia abajo y elegí <strong>Agregar a pantalla de inicio</strong>:</span>
                <PlusSquare className="w-4 h-4 text-emerald-600 shrink-0 inline ml-auto" />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/25"
            >
              ¡Listo, ya lo agregué!
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600">
              Instalá la app en tu teléfono o computadora para acceder instantáneamente, recibir avisos de entrenamientos y usarla incluso con conexión inestable en la costa.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Sin ocupar memoria pesada
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Funciona sin conexión
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Notificaciones directas
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Pantalla completa limpia
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={async () => {
                  const success = await triggerInstall();
                  if (success) onClose();
                }}
                disabled={!isInstallable}
                className={`w-full py-3.5 px-4 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isInstallable
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-95 shadow-emerald-600/25 active:scale-98'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" />
                {isInstallable ? 'Instalar ahora en este dispositivo' : 'Instalación disponible desde el navegador'}
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
              >
                Continuar usando en la web por ahora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
