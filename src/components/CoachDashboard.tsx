import React, { useState } from 'react';
import { 
  Users, Calendar, DollarSign, Apple, Plus, Search, Filter, 
  Send, CheckCircle, AlertTriangle, Clock, Dumbbell, 
  MapPin, HeartPulse, ChevronRight, Edit3, Sparkles, Video, ExternalLink
} from 'lucide-react';
import { Alumno, PlanSemanal, EstadoPago, CaminoType, ZonaMDP, ModalidadType } from '../types';
import { formatWhatsAppUrl, generateRutinaWAMessage, generateRecordatorioPagoWAMessage, generateFeedbackReminderWAMessage, generateNutricionWAMessage } from '../utils/whatsapp';
import { generarBorradorPlanSemanal } from '../utils/routineGenerator';

interface Props {
  alumnos: Alumno[];
  onUpdateAlumno: (alumno: Alumno) => void;
  onOpenNewPupilModal: () => void;
  appBaseUrl: string;
}

export const CoachDashboard: React.FC<Props> = ({
  alumnos,
  onUpdateAlumno,
  onOpenNewPupilModal,
  appBaseUrl
}) => {
  const [activeTab, setActiveTab] = useState<'fichas' | 'planificador' | 'pagos' | 'nutricion'>('fichas');
  
  // Filtros de Fichas
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCamino, setFiltroCamino] = useState<string>('todos');
  const [filtroPago, setFiltroPago] = useState<string>('todos');
  const [filtroZona, setFiltroZona] = useState<string>('todas');
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<string>(alumnos[0]?.id || '');

  // Estado del Planificador
  const alumnoPlan = alumnos.find(a => a.id === selectedAlumnoId) || alumnos[0];
  const [editingPlan, setEditingPlan] = useState<PlanSemanal | null>(null);
  const [modalidadVistaPlan, setModalidadVistaPlan] = useState<ModalidadType>('presencial');

  // Filtrado de alumnos
  const filteredAlumnos = alumnos.filter(a => {
    const matchSearch = a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.zonaMdp.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCamino = filtroCamino === 'todos' || a.camino === filtroCamino;
    const matchPago = filtroPago === 'todos' || a.pagos.estado === filtroPago;
    const matchZona = filtroZona === 'todas' || a.zonaMdp === filtroZona;
    return matchSearch && matchCamino && matchPago && matchZona;
  });

  // Estadísticas rápidas
  const totalAlumnos = alumnos.length;
  const alDia = alumnos.filter(a => a.pagos.estado === 'al_dia').length;
  const porVencer = alumnos.filter(a => a.pagos.estado === 'proximo_vencer').length;
  const vencidos = alumnos.filter(a => a.pagos.estado === 'vencido').length;
  const conNutricion = alumnos.filter(a => a.camino !== 'entrenamiento').length;

  const handleSelectAlumnoPlan = (id: string) => {
    setSelectedAlumnoId(id);
    const target = alumnos.find(a => a.id === id);
    if (target?.planActual) {
      setEditingPlan(JSON.parse(JSON.stringify(target.planActual)));
    } else if (target) {
      // Generar borrador si no tiene
      const borrador = generarBorradorPlanSemanal(target);
      setEditingPlan(borrador);
    }
  };

  const handleGenerarNuevoBorrador = () => {
    if (!alumnoPlan) return;
    const borrador = generarBorradorPlanSemanal(alumnoPlan);
    setEditingPlan(borrador);
  };

  const handleGuardarYAprobarPlan = () => {
    if (!alumnoPlan || !editingPlan) return;
    const planAprobado: PlanSemanal = {
      ...editingPlan,
      estado: 'aprobado'
    };
    const updatedAlumno = {
      ...alumnoPlan,
      planActual: planAprobado
    };
    onUpdateAlumno(updatedAlumno);
    setEditingPlan(planAprobado);
  };

  const handleRegistrarPago = (alumno: Alumno) => {
    const hoy = new Date().toISOString().split('T')[0];
    const proxima = new Date();
    proxima.setDate(proxima.getDate() + 30);

    const updated: Alumno = {
      ...alumno,
      pagos: {
        ...alumno.pagos,
        estado: 'al_dia',
        ultimoPagoFecha: hoy,
        periodoAbonado: 'Ciclo abonado ' + new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }),
        proximaRenovacionFecha: proxima.toISOString().split('T')[0],
        adelantoMesSiguiente: 0,
        notas: 'Pago renovado por 30 días.'
      }
    };
    onUpdateAlumno(updated);
  };

  const handleAgregarControlPeso = (alumno: Alumno, peso: number, sensaciones: string) => {
    if (!alumno.nutricion) return;
    const nuevoHistorial = [
      ...(alumno.nutricion.historialSeguimiento || []),
      {
        fecha: new Date().toISOString().split('T')[0],
        pesoKg: peso,
        sensaciones,
        notas: 'Control registrado desde el panel'
      }
    ];

    const updated: Alumno = {
      ...alumno,
      pesoKg: peso,
      nutricion: {
        ...alumno.nutricion,
        historialSeguimiento: nuevoHistorial
      }
    };
    onUpdateAlumno(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Alumnos Activos</span>
            <span className="text-2xl font-black text-slate-900">{totalAlumnos}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{conNutricion} con Herbalife</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🟢 Al Día</span>
            <span className="text-2xl font-black text-emerald-600">{alDia}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Cuotas vigentes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🟡 Por Vencer</span>
            <span className="text-2xl font-black text-amber-600">{porVencer}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Próximos 5 días</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🔴 Vencidos</span>
            <span className="text-2xl font-black text-rose-600">{vencidos}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Requiere aviso</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('fichas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'fichas'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            Fichas 360° ({filteredAlumnos.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('planificador');
              if (selectedAlumnoId && !editingPlan) {
                handleSelectAlumnoPlan(selectedAlumnoId);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'planificador'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            Planificador Semanal
          </button>

          <button
            onClick={() => setActiveTab('pagos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pagos'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-600" />
            Semáforo de Pagos
          </button>

          <button
            onClick={() => setActiveTab('nutricion')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'nutricion'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Apple className="w-4 h-4 text-teal-600" />
            Nutrición Herbalife ({conNutricion})
          </button>
        </div>

        <button
          onClick={onOpenNewPupilModal}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nuevo Alumno / Onboarding
        </button>
      </div>

      {/* TAB 1: FICHAS 360° */}
      {activeTab === 'fichas' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre o zona de Mar del Plata..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                <Filter className="w-3 h-3" /> Filtrar:
              </span>

              <select
                value={filtroCamino}
                onChange={(e) => setFiltroCamino(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
              >
                <option value="todos">Todos los Caminos</option>
                <option value="entrenamiento">1. Solo Entrenamiento</option>
                <option value="entrenamiento_nutricion">2. Entreno + Nutrición</option>
                <option value="solo_nutricion">3. Solo Nutrición</option>
              </select>

              <select
                value={filtroPago}
                onChange={(e) => setFiltroPago(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
              >
                <option value="todos">Todos los Pagos</option>
                <option value="al_dia">🟢 Al Día</option>
                <option value="proximo_vencer">🟡 Por Vencer</option>
                <option value="vencido">🔴 Vencido</option>
              </select>

              <select
                value={filtroZona}
                onChange={(e) => setFiltroZona(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
              >
                <option value="todas">Todas las Zonas MDP</option>
                <option value="Playa Grande">Playa Grande</option>
                <option value="Parque Camet">Parque Camet</option>
                <option value="Parque San Martín">Parque San Martín</option>
                <option value="Plaza España">Plaza España</option>
                <option value="Costa Norte">Costa Norte</option>
                <option value="Varese">Varese</option>
              </select>
            </div>
          </div>

          {/* Pupils Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumnos.map((alm) => {
              const semaforoColor = alm.pagos.estado === 'al_dia' 
                ? 'bg-emerald-500' 
                : alm.pagos.estado === 'proximo_vencer' 
                ? 'bg-amber-500' 
                : 'bg-rose-500';

              const caminoBadge = alm.camino === 'entrenamiento'
                ? { label: 'Entrenamiento', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                : alm.camino === 'entrenamiento_nutricion'
                ? { label: 'Entreno + Nutrición', color: 'bg-purple-50 text-purple-700 border-purple-200' }
                : { label: 'Solo Nutrición', color: 'bg-teal-50 text-teal-700 border-teal-200' };

              return (
                <div 
                  key={alm.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header card */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${semaforoColor}`} />
                          <h4 className="font-bold text-slate-900 text-base">{alm.nombre}</h4>
                        </div>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {alm.edad} años • {alm.pesoKg} kg • {alm.alturaCm} cm
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${caminoBadge.color}`}>
                        {caminoBadge.label}
                      </span>
                    </div>

                    {/* Zone & Availability */}
                    <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{alm.zonaMdp}</span>
                        <span className="text-slate-400">•</span>
                        <span>{alm.diasHorariosDisponibles}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Zoom: {alm.aceptaZoom ? '✓ Acepta' : '✕ No'}</span>
                        <span>•</span>
                        <span>Objetivo: {alm.objetivo.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* Health & Safety alert */}
                    {alm.condicionFisica.doloresLesiones && (
                      <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                        <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold block">Cuidado físico:</strong>
                          {alm.condicionFisica.doloresLesiones}
                        </div>
                      </div>
                    )}

                    {/* Materials at home */}
                    {alm.materialesCasa.length > 0 && (
                      <div className="text-xs text-slate-500">
                        <span className="font-medium text-slate-700">En casa: </span>
                        {alm.materialesCasa.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Actions & WhatsApp buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleSelectAlumnoPlan(alm.id);
                        setActiveTab('planificador');
                      }}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Plan Semanal
                    </button>

                    <a
                      href={formatWhatsAppUrl(alm.telefono, generateRutinaWAMessage(alm, appBaseUrl))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      title="Enviar rutina por WhatsApp"
                    >
                      <Send className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PLANIFICADOR SEMANAL INTELIGENTE */}
      {activeTab === 'planificador' && alumnoPlan && (
        <div className="space-y-5">
          {/* Selector de alumno & resumen de semana anterior */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black">
                {alumnoPlan.nombre.charAt(0)}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Planificando para:
                </label>
                <select
                  value={selectedAlumnoId}
                  onChange={(e) => handleSelectAlumnoPlan(e.target.value)}
                  className="font-bold text-slate-900 text-base bg-transparent border-none p-0 cursor-pointer outline-none focus:ring-0"
                >
                  {alumnos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre} — {a.zonaMdp} ({a.camino.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerarNuevoBorrador}
                className="px-3.5 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                ✨ Generar Nuevo Borrador Inteligente
              </button>

              <button
                onClick={handleGuardarYAprobarPlan}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Aprobar Plan
              </button>

              <a
                href={formatWhatsAppUrl(alumnoPlan.telefono, generateRutinaWAMessage(alumnoPlan, appBaseUrl))}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Enviar al Alumno por WhatsApp
              </a>
            </div>
          </div>

          {/* Context Banner: Qué hizo la semana anterior */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5" />
                Realidad de la semana anterior (Punto de partida del criterio)
              </span>
              <span className="text-xs text-slate-400">
                {alumnoPlan.historialFeedback.length} de {alumnoPlan.entrenamientosEsperadosPorSemana} sesiones registradas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {alumnoPlan.historialFeedback.length > 0 ? (
                alumnoPlan.historialFeedback.map((fb, idx) => (
                  <div key={fb.id || idx} className="p-3 bg-slate-800/90 rounded-xl text-xs border border-slate-700 space-y-1">
                    <div className="flex justify-between font-bold text-slate-200">
                      <span>Entrenamiento #{fb.entrenamientoNumero}</span>
                      <span className="text-sky-300 capitalize">{fb.modalidad}</span>
                    </div>
                    <div className="text-slate-300">
                      Energía: <strong>{fb.energia}/10</strong> • Esfuerzo: <strong>{fb.esfuerzoRpe}</strong>
                    </div>
                    {fb.molestias ? (
                      <div className="text-rose-300 font-semibold text-[11px] bg-rose-950/60 p-1.5 rounded-lg border border-rose-800">
                        ⚠️ Molestia: {fb.detalleMolestias || 'Reportó molestia'}
                      </div>
                    ) : (
                      <div className="text-emerald-300 text-[11px]">✓ Sin molestias físicas</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 col-span-3 py-2 italic">
                  Sin registros en la semana anterior. Se propone retomar con carga moderada para construir regularidad.
                </div>
              )}
            </div>
          </div>

          {/* Editor Tri-Modalidad */}
          {editingPlan && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    Semana #{editingPlan.semanaNumero} ({editingPlan.fechaInicio} al {editingPlan.fechaFin})
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      editingPlan.estado === 'aprobado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {editingPlan.estado}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Las 3 versiones comparten el mismo objetivo biológico pero adaptadas al espacio y supervisión.
                  </p>
                </div>

                {/* Modalidad switcher for previewing */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setModalidadVistaPlan('presencial')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      modalidadVistaPlan === 'presencial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    🏃‍♂️ Presencial (Costero)
                  </button>
                  <button
                    onClick={() => setModalidadVistaPlan('zoom')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      modalidadVistaPlan === 'zoom' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    💻 Zoom (En Casa)
                  </button>
                  <button
                    onClick={() => setModalidadVistaPlan('distancia')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      modalidadVistaPlan === 'distancia' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    🏡 A Distancia (Por cuenta propia)
                  </button>
                </div>
              </div>

              {/* Objetivo de la semana */}
              <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                <label className="block text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1">
                  🎯 Objetivo Principal de la Semana:
                </label>
                <input
                  type="text"
                  value={editingPlan.objetivoSemanal}
                  onChange={(e) => setEditingPlan({ ...editingPlan, objetivoSemanal: e.target.value })}
                  className="w-full text-sm font-semibold text-slate-800 bg-white p-2 rounded-lg border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Los 3 Entrenamientos */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {editingPlan.entrenamientos.map((ent, idx) => {
                  const mod = ent[modalidadVistaPlan];

                  return (
                    <div key={ent.id || idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                            Entrenamiento {ent.numero}
                          </span>
                          <span className="text-[11px] font-semibold text-sky-700">{ent.funcion}</span>
                        </div>

                        <input
                          type="text"
                          value={ent.titulo}
                          onChange={(e) => {
                            const newEnts = [...editingPlan.entrenamientos];
                            newEnts[idx].titulo = e.target.value;
                            setEditingPlan({ ...editingPlan, entrenamientos: newEnts });
                          }}
                          className="w-full font-bold text-sm text-slate-900 bg-white p-1.5 rounded-lg border border-slate-200"
                        />

                        {/* Bloques de la modalidad actual */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Bloques ({modalidadVistaPlan}):
                          </span>
                          {mod.bloques.map((b, bIdx) => (
                            <div key={bIdx} className="text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100 flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold shrink-0">•</span>
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const newEnts = [...editingPlan.entrenamientos];
                                  newEnts[idx][modalidadVistaPlan].bloques[bIdx] = e.target.value;
                                  setEditingPlan({ ...editingPlan, entrenamientos: newEnts });
                                }}
                                className="w-full text-xs text-slate-700 bg-transparent border-none p-0 outline-none"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Descanso y Esfuerzo */}
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] font-semibold text-slate-400 block">Descanso:</span>
                            <span className="font-medium text-slate-700">{mod.descanso}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] font-semibold text-slate-400 block">Esfuerzo:</span>
                            <span className="font-medium text-slate-700">{mod.nivelEsfuerzo}</span>
                          </div>
                        </div>

                        {/* Seguridad */}
                        <div className="p-2 bg-amber-50 rounded-lg text-[11px] text-amber-900 border border-amber-200/60">
                          <strong>Cuidado:</strong> {mod.seguridad}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botón flotante para ver como alumno */}
              <div className="pt-2 flex justify-end">
                <a
                  href={`?token=${alumnoPlan.tokenAcceso}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Previsualizar cómo lo ve {alumnoPlan.nombre} en su teléfono
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SEMÁFORO DE COBROS */}
      {activeTab === 'pagos' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Semáforo de Pagos & Renovaciones</h4>
              <p className="text-xs text-slate-500">
                Monitorea fechas de vencimiento, adelantos y despacha recordatorios de WhatsApp con un solo clic.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Columna AL DÍA 🟢 */}
            <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Al Día ({alumnos.filter(a => a.pagos.estado === 'al_dia').length})
                </span>
              </div>

              <div className="space-y-2.5">
                {alumnos.filter(a => a.pagos.estado === 'al_dia').map((a) => (
                  <div key={a.id} className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="font-bold text-slate-900 block">{a.nombre}</strong>
                        <span className="text-slate-400">{a.pagos.servicioContratado}</span>
                      </div>
                      <span className="font-bold text-emerald-700">${a.pagos.monto.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Vence el: <strong>{a.pagos.proximaRenovacionFecha}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna PRÓXIMO A VENCER 🟡 */}
            <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Próximo a Vencer ({alumnos.filter(a => a.pagos.estado === 'proximo_vencer').length})
                </span>
              </div>

              <div className="space-y-2.5">
                {alumnos.filter(a => a.pagos.estado === 'proximo_vencer').map((a) => (
                  <div key={a.id} className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm space-y-2.5 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="font-bold text-slate-900 block">{a.nombre}</strong>
                        <span className="text-slate-400">{a.pagos.servicioContratado}</span>
                      </div>
                      <span className="font-bold text-amber-700">${a.pagos.monto.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="text-[11px] text-amber-900 font-semibold bg-amber-50 p-1.5 rounded-lg">
                      ⏰ Renueva el: {a.pagos.proximaRenovacionFecha}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleRegistrarPago(a)}
                        className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px]"
                      >
                        Registrar Pago
                      </button>
                      <a
                        href={formatWhatsAppUrl(a.telefono, generateRecordatorioPagoWAMessage(a))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1"
                        title="Enviar recordatorio por WhatsApp"
                      >
                        <Send className="w-3 h-3" /> Recordar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna VENCIDO 🔴 */}
            <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Vencido ({alumnos.filter(a => a.pagos.estado === 'vencido').length})
                </span>
              </div>

              <div className="space-y-2.5">
                {alumnos.filter(a => a.pagos.estado === 'vencido').map((a) => (
                  <div key={a.id} className="bg-white p-3.5 rounded-xl border border-rose-200 shadow-sm space-y-2.5 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="font-bold text-slate-900 block">{a.nombre}</strong>
                        <span className="text-slate-400">{a.pagos.servicioContratado}</span>
                      </div>
                      <span className="font-bold text-rose-700">${a.pagos.monto.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="text-[11px] text-rose-900 font-semibold bg-rose-50 p-1.5 rounded-lg">
                      ⚠️ Venció el: {a.pagos.proximaRenovacionFecha}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleRegistrarPago(a)}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px]"
                      >
                        Cobrado ✓
                      </button>
                      <a
                        href={formatWhatsAppUrl(a.telefono, generateRecordatorioPagoWAMessage(a))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" /> Cobrar WA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NUTRICIÓN HERBALIFE */}
      {activeTab === 'nutricion' && (
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Asesoramiento Nutricional & Suplementación (Herbalife)</h4>
              <p className="text-xs text-slate-500">
                Gestión de hábitos, control de peso corporal y recomendaciones de productos para los Caminos 2 y 3.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {alumnos.filter(a => a.camino !== 'entrenamiento' && a.nutricion).map((alm) => {
              const nut = alm.nutricion!;
              return (
                <div key={alm.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{alm.nombre}</h4>
                      <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
                        {alm.camino === 'entrenamiento_nutricion' ? 'Camino 2: Entreno + Nutrición' : 'Camino 3: Solo Nutrición'}
                      </span>
                    </div>
                    <a
                      href={formatWhatsAppUrl(alm.telefono, generateNutricionWAMessage(alm))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Send className="w-3 h-3" /> WhatsApp Nutricional
                    </a>
                  </div>

                  {/* Hábitos e ingesta de agua */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Agua diaria:</span>
                      <span className="font-bold text-slate-800 text-sm">{nut.consumoAguaLitros} L / día</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Nivel Energía:</span>
                      <span className="font-bold text-slate-800 text-sm">{nut.nivelEnergiaDiaria} / 10</span>
                    </div>
                  </div>

                  {/* Objetivo y Comidas */}
                  <div className="text-xs space-y-1 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                    <div>
                      <strong className="text-teal-900">Objetivo: </strong>
                      <span className="text-slate-700">{nut.objetivoPrincipal}</span>
                    </div>
                    <div>
                      <strong className="text-teal-900">Desayuno actual: </strong>
                      <span className="text-slate-700">{nut.desayunoHabitual}</span>
                    </div>
                  </div>

                  {/* Productos Herbalife Recomendados */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                      Suplementos Herbalife Asignados:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {nut.productosHerbalifeRecomendados.map((prod, pIdx) => (
                        <span key={pIdx} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl font-medium">
                          🌿 {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Historial de Peso y Medidas */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                      Evolución de Peso:
                    </span>
                    <div className="space-y-1.5">
                      {nut.historialSeguimiento.map((h, hIdx) => (
                        <div key={hIdx} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500 font-mono">{h.fecha}</span>
                          <span className="font-bold text-slate-800">{h.pesoKg} kg</span>
                          <span className="text-slate-600 text-[11px] truncate max-w-[160px]">{h.sensaciones}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
