import React, { useState } from 'react';
import { CloudRain, Wind, Sun, AlertTriangle, Video, Send, RefreshCw } from 'lucide-react';
import { WeatherDataMDP, Alumno } from '../types';
import { formatWhatsAppUrl, generateAlertaClimaWAMessage } from '../utils/whatsapp';

interface Props {
  weather: WeatherDataMDP;
  alumnos: Alumno[];
  onRefreshWeather: () => void;
  onToggleSudestadaSimulada: () => void;
  isSudestadaSimulada: boolean;
}

export const WeatherBanner: React.FC<Props> = ({
  weather,
  alumnos,
  onRefreshWeather,
  onToggleSudestadaSimulada,
  isSudestadaSimulada
}) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<string>(alumnos[0]?.id || '');
  const [zoomLink, setZoomLink] = useState('https://zoom.us/j/mardeltrote');

  const selectedAlumno = alumnos.find(a => a.id === selectedAlumnoId) || alumnos[0];
  const alumnosPresenciales = alumnos.filter(a => a.aceptaZoom && a.camino !== 'solo_nutricion');

  return (
    <div className="w-full">
      <div className={`p-4 rounded-2xl border transition-all shadow-sm ${
        weather.esAlertaClima 
          ? 'bg-amber-500/10 border-amber-400/40 text-amber-950' 
          : 'bg-white/80 backdrop-blur-sm border-slate-200/80 text-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Weather Info */}
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              weather.esAlertaClima ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-sky-100 text-sky-700'
            }`}>
              {weather.probabilidadLluvia > 50 ? (
                <CloudRain className="w-6 h-6" />
              ) : weather.vientoKmH > 35 ? (
                <Wind className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6 text-amber-500" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Mar del Plata</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-medium">
                  {weather.temperatura}°C
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Wind className="w-3 h-3" /> {weather.vientoKmH} km/h
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <CloudRain className="w-3 h-3" /> {weather.probabilidadLluvia}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                {weather.esAlertaClima && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                {weather.descripcion}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Simulation toggle button for testing */}
            <button
              onClick={onToggleSudestadaSimulada}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isSudestadaSimulada 
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Simular cambio de clima en la costa"
            >
              {isSudestadaSimulada ? '⛈️ Clima Real MDP' : '⚡ Simular Sudestada'}
            </button>

            <button
              onClick={onRefreshWeather}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Actualizar pronóstico"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {weather.esAlertaClima && (
              <button
                onClick={() => setShowNotificationModal(true)}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
              >
                <Video className="w-3.5 h-3.5" />
                Pasar a Zoom por Clima
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for sending weather alert to pupils via WhatsApp */}
      {showNotificationModal && selectedAlumno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-amber-500" />
                  Notificar cambio de modalidad por clima
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mar del Plata: {weather.alertaMotivo || weather.descripcion}
                </p>
              </div>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Seleccionar Alumno a Notificar:
                </label>
                <select
                  value={selectedAlumnoId}
                  onChange={(e) => setSelectedAlumnoId(e.target.value)}
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {alumnosPresenciales.map((alm) => (
                    <option key={alm.id} value={alm.id}>
                      {alm.nombre} ({alm.zonaMdp} - {alm.diasHorariosDisponibles})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Link de sala Zoom / Meet:
                </label>
                <input
                  type="text"
                  value={zoomLink}
                  onChange={(e) => setZoomLink(e.target.value)}
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="https://zoom.us/j/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Vista previa del mensaje para WhatsApp:
                </label>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono">
                  {generateAlertaClimaWAMessage(selectedAlumno, weather.alertaMotivo || 'lluvia y viento fuerte', zoomLink)}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNotificationModal(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <a
                  href={formatWhatsAppUrl(
                    selectedAlumno.telefono,
                    generateAlertaClimaWAMessage(selectedAlumno, weather.alertaMotivo || 'lluvia y viento fuerte', zoomLink)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  Abrir WhatsApp con mensaje
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
