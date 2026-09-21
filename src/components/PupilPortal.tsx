import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, ShieldAlert, 
  MapPin, Apple, Sparkles, Send, Video, Home, MessageCircle, Droplet
} from 'lucide-react';
import { Alumno, ModalidadType, FeedbackEntrenamiento } from '../types';
import { generarBorradorPlanSemanal } from '../utils/routineGenerator';
import { formatWhatsAppUrl } from '../utils/whatsapp';

interface Props {
  alumno: Alumno;
  onGuardarFeedback: (feedback: FeedbackEntrenamiento) => void;
  onVolverALogin: () => void;
}

export const PupilPortal: React.FC<Props> = ({ alumno, onGuardarFeedback, onVolverALogin }) => {
  // Asegurar que si es de entrenamiento siempre tenga plan activo y nunca quede vacío
  const plan = alumno.planActual || (alumno.camino !== 'solo_nutricion' ? generarBorradorPlanSemanal(alumno) : undefined);

  const [modalidadSeleccionada, setModalidadSeleccionada] = useState<ModalidadType>('presencial');
  const [activeEntrenamientoIndex, setActiveEntrenamientoIndex] = useState<number>(0);
  
  // Estado del formulario de feedback post-entreno
  const [mostrarModalFeedback, setMostrarModalFeedback] = useState(false);
  const [feedbackNumeroEntreno, setFeedbackNumeroEntreno] = useState<1 | 2 | 3>(1);
  const [energia, setEnergia] = useState<number>(8);
  const [esfuerzoRpe, setEsfuerzoRpe] = useState<'Suave (1-3)' | 'Moderado (4-6)' | 'Fuerte (7-8)' | 'Máximo (9-10)'>('Moderado (4-6)');
  const [huboMolestia, setHuboMolestia] = useState(false);
  const [detalleMolestia, setDetalleMolestia] = useState('');
  const [parteFacil, setParteFacil] = useState('');
  const [parteDificil, setParteDificil] = useState('');
  const [terminoConEnergia, setTerminoConEnergia] = useState(true);
  const [feedbackEnviadoExitoso, setFeedbackEnviadoExitoso] = useState(false);

  const entrenamientoActual = plan?.entrenamientos ? plan.entrenamientos[activeEntrenamientoIndex] : null;
  const detalleModalidad = entrenamientoActual ? entrenamientoActual[modalidadSeleccionada] : null;

  const handleAbrirFeedback = (numero: 1 | 2 | 3) => {
    setFeedbackNumeroEntreno(numero);
    setMostrarModalFeedback(true);
    setFeedbackEnviadoExitoso(false);
  };

  const handleEnviarFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoFeedback: FeedbackEntrenamiento = {
      id: 'fb-' + Date.now(),
      alumnoId: alumno.id,
      entrenamientoNumero: feedbackNumeroEntreno,
      fecha: new Date().toISOString().split('T')[0],
      modalidad: modalidadSeleccionada,
      energia: Number(energia),
      esfuerzoRpe,
      molestias: huboMolestia,
      detalleMolestias: huboMolestia ? detalleMolestia : undefined,
      parteFacil,
      parteDificil,
      terminoConEnergia
    };

    onGuardarFeedback(nuevoFeedback);

    // Lanzar confeti de celebración
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setFeedbackEnviadoExitoso(true);
    setTimeout(() => {
      setMostrarModalFeedback(false);
      setFeedbackEnviadoExitoso(false);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-slate-50 flex flex-col justify-between pb-12">
      {/* Header Mobile Alumno */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 text-white p-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20">
              🌊
            </span>
            <span className="font-bold tracking-wide text-xs uppercase text-emerald-200">Mar del Trote</span>
          </div>
          <button
            onClick={onVolverALogin}
            className="text-[11px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/15 transition-colors"
          >
            Cambiar usuario
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight">¡Hola, {alumno.nombre.split(' ')[0]}! 👋</h2>
          <p className="text-xs text-emerald-100 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            Zona {alumno.zonaMdp} • {alumno.diasHorariosDisponibles}
          </p>
        </div>

        {/* Semáforo cuota alumno */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-emerald-200/80 text-[11px]">Tu ciclo actual:</span>
          <span className="font-semibold text-emerald-100 flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className={`w-2 h-2 rounded-full ${alumno.pagos.estado === 'al_dia' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            {alumno.pagos.estado === 'al_dia' ? 'Al día' : 'Por renovar'} ({alumno.pagos.proximaRenovacionFecha})
          </span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="px-4 pt-4 space-y-4">
        
        {/* CASO 1: ALUMNO EN CAMINO 3 (SOLO NUTRICIÓN HERBALIFE) */}
        {alumno.camino === 'solo_nutricion' ? (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Plan de Asesoramiento Nutricional</h3>
                  <p className="text-xs text-slate-500">Hábitos, composición corporal & suplementación</p>
                </div>
              </div>

              {/* Objetivo */}
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                  Tu Objetivo Principal:
                </span>
                <p className="text-sm font-bold text-emerald-950">
                  {alumno.nutricion?.objetivoPrincipal || 'Mejora de composición corporal y vitalidad'}
                </p>
              </div>

              {/* Pautas diarias */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 text-sky-500" /> Agua Recomendada
                  </span>
                  <p className="text-base font-black text-slate-900">
                    {alumno.nutricion?.consumoAguaLitros || 2.0} Litros
                  </p>
                  <p className="text-[10px] text-slate-500">Distribuir durante todo el día</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Nivel de Energía
                  </span>
                  <p className="text-base font-black text-slate-900">
                    {alumno.nutricion?.nivelEnergiaDiaria || 7} / 10
                  </p>
                  <p className="text-[10px] text-slate-500">Evaluación inicial</p>
                </div>
              </div>

              {/* Suplementos Herbalife Asignados */}
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Tus Productos Herbalife Asignados:
                </span>
                <div className="space-y-2">
                  {alumno.nutricion?.productosHerbalifeRecomendados.map((prod, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs text-slate-800">
                      <span className="text-teal-600 font-bold text-base">🌿</span>
                      <span className="font-semibold">{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón WhatsApp Asesora */}
              <a
                href={formatWhatsAppUrl('5492235000000', `Hola! Quería hacerte una consulta sobre mi plan de nutrición Herbalife de esta semana.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-transform active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar a mi Asesora por WhatsApp
              </a>
            </div>
          </div>
        ) : (
          /* CASO 2: ALUMNO EN ENTRENAMIENTO (CAMINOS 1 Y 2) */
          <>
            {/* Objetivo Semanal */}
            {plan && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Objetivo de tu semana #{plan.semanaNumero}
                </span>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {plan.objetivoSemanal}
                </p>
                {plan.notasEntrenadora && (
                  <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    💬 <em>"{plan.notasEntrenadora}"</em>
                  </p>
                )}
              </div>
            )}

            {/* Selector de Modalidad (Presencial / Zoom / Distancia) */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                ¿Cómo vas a entrenar hoy?
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setModalidadSeleccionada('presencial')}
                  className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    modalidadSeleccionada === 'presencial'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Presencial</span>
                </button>

                <button
                  onClick={() => setModalidadSeleccionada('zoom')}
                  className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    modalidadSeleccionada === 'zoom'
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Zoom</span>
                </button>

                <button
                  onClick={() => setModalidadSeleccionada('distancia')}
                  className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    modalidadSeleccionada === 'distancia'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>En Casa</span>
                </button>
              </div>
            </div>

            {/* Selector de los 3 Entrenamientos */}
            {plan && plan.entrenamientos && (
              <div className="flex gap-2">
                {plan.entrenamientos.map((ent, idx) => (
                  <button
                    key={ent.id || idx}
                    onClick={() => setActiveEntrenamientoIndex(idx)}
                    className={`flex-1 py-2.5 px-2 rounded-2xl text-xs font-bold transition-all border ${
                      activeEntrenamientoIndex === idx
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Sesión {ent.numero}
                  </button>
                ))}
              </div>
            )}

            {/* Tarjeta del Entrenamiento Seleccionado */}
            {entrenamientoActual && detalleModalidad && (
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      {entrenamientoActual.funcion}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 capitalize font-medium">
                      {modalidadSeleccionada}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {entrenamientoActual.titulo}
                  </h3>
                </div>

                {/* Bloques de la rutina */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Estructura de la sesión:
                  </span>
                  {detalleModalidad.bloques.map((bloque, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {bIdx + 1}
                      </span>
                      <span>{bloque}</span>
                    </div>
                  ))}
                </div>

                {/* Descanso y Nivel de esfuerzo */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Pausas:</span>
                    <span className="font-semibold text-slate-800">{detalleModalidad.descanso}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Intensidad:</span>
                    <span className="font-semibold text-slate-800">{detalleModalidad.nivelEsfuerzo}</span>
                  </div>
                </div>

                {/* Indicaciones de Seguridad */}
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Indicación clave: </strong>
                    {detalleModalidad.seguridad}
                  </div>
                </div>

                {/* Botón de Check-in Post-Entreno */}
                <button
                  onClick={() => handleAbrirFeedback(entrenamientoActual.numero)}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-transform active:scale-98"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  ¡Terminé este entrenamiento! (Check-in)
                </button>
              </div>
            )}

            {/* Asesoramiento Nutricional Herbalife (si aplica a Camino 2) */}
            {alumno.nutricion && (
              <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-3xl p-5 border border-teal-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-teal-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Tu Plan de Nutrición & Suplementos</h4>
                </div>
                <p className="text-xs text-slate-600">
                  Objetivo: <strong>{alumno.nutricion.objetivoPrincipal}</strong>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {alumno.nutricion.productosHerbalifeRecomendados.map((prod, pIdx) => (
                    <span key={pIdx} className="text-xs bg-white text-teal-900 border border-teal-200 font-medium px-2.5 py-1 rounded-xl shadow-2xs">
                      🌿 {prod}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Check-in de Feedback Post-Entreno */}
      {mostrarModalFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 space-y-4">
            {feedbackEnviadoExitoso ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  🎉
                </div>
                <h3 className="font-black text-slate-900 text-lg">¡Excelente entrenamiento!</h3>
                <p className="text-xs text-slate-500">
                  Tu respuesta fue enviada a la entrenadora para ajustar tu próxima semana.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnviarFeedback} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base">
                    Feedback de Sesión #{feedbackNumeroEntreno}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMostrarModalFeedback(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Energía 1 al 10 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Nivel de Energía:</span>
                    <span className="text-emerald-600">{energia} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energia}
                    onChange={(e) => setEnergia(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Cansado/a</span>
                    <span>Lleno/a de energía</span>
                  </div>
                </div>

                {/* Esfuerzo RPE */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ¿Cómo sentiste la exigencia? (RPE)
                  </label>
                  <select
                    value={esfuerzoRpe}
                    onChange={(e) => setEsfuerzoRpe(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Suave (1-3)">Suave (1-3) - Pude hablar cómodamente</option>
                    <option value="Moderado (4-6)">Moderado (4-6) - Buen ritmo sostenido</option>
                    <option value="Fuerte (7-8)">Fuerte (7-8) - Exigente pero controlado</option>
                    <option value="Máximo (9-10)">Máximo (9-10) - Al límite del esfuerzo</option>
                  </select>
                </div>

                {/* Molestias */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ¿Sentiste alguna molestia o dolor?
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setHuboMolestia(false)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border ${
                        !huboMolestia ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      No, me sentí bien
                    </button>
                    <button
                      type="button"
                      onClick={() => setHuboMolestia(true)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border ${
                        huboMolestia ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      Sí, tuve una molestia
                    </button>
                  </div>
                  {huboMolestia && (
                    <input
                      type="text"
                      value={detalleMolestia}
                      onChange={(e) => setDetalleMolestia(e.target.value)}
                      placeholder="¿Dónde y cómo fue? Ej: rodilla, gemelo..."
                      required
                      className="w-full text-xs p-2 bg-rose-50 border border-rose-200 rounded-xl text-slate-800"
                    />
                  )}
                </div>

                {/* Fácil y difícil */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lo más fácil:</label>
                    <input
                      type="text"
                      value={parteFacil}
                      onChange={(e) => setParteFacil(e.target.value)}
                      placeholder="Ej: el trote"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lo más difícil:</label>
                    <input
                      type="text"
                      value={parteDificil}
                      onChange={(e) => setParteDificil(e.target.value)}
                      placeholder="Ej: el viento"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMostrarModalFeedback(false)}
                    className="flex-1 py-2.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20"
                  >
                    Enviar feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
