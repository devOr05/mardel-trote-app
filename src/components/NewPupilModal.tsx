import React, { useState } from 'react';
import { X, UserCheck, Flame, Dumbbell, Apple, MapPin } from 'lucide-react';
import { Alumno, CaminoType, ObjetivoRunning, NivelType, ZonaMDP } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddAlumno: (nuevoAlumno: Alumno) => void;
}

const ZONAS_MDP: ZonaMDP[] = [
  'Playa Grande',
  'Parque Camet',
  'Parque San Martín',
  'Plaza España',
  'Costa Norte',
  'La Perla',
  'Varese',
  'A distancia / Otra'
];

export const NewPupilModal: React.FC<Props> = ({ isOpen, onClose, onAddAlumno }) => {
  const [camino, setCamino] = useState<CaminoType>('entrenamiento_nutricion');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('549223');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState<number>(30);
  const [pesoKg, setPesoKg] = useState<number>(65);
  const [alturaCm, setAlturaCm] = useState<number>(170);
  const [objetivo, setObjetivo] = useState<ObjetivoRunning>('mejorar_resistencia');
  const [nivel, setNivel] = useState<NivelType>('inicial');
  const [zonaMdp, setZonaMdp] = useState<ZonaMDP>('Playa Grande');
  const [diasHorarios, setDiasHorarios] = useState('Lunes, Miércoles y Viernes 8:00 hs');
  const [aceptaZoom, setAceptaZoom] = useState(true);
  const [materiales, setMateriales] = useState<string[]>(['Colchoneta']);
  const [dolores, setDolores] = useState('');
  const [ejerciciosEvitar, setEjerciciosEvitar] = useState('');
  const [monto, setMonto] = useState<number>(24000);

  // Campos nutrición
  const [objetivoNutricional, setObjetivoNutricional] = useState('Mejorar energía y composición corporal');
  const [consumoAgua, setConsumoAgua] = useState<number>(2.0);
  const [desayunoHabitual, setDesayunoHabitual] = useState('Café con tostadas');

  if (!isOpen) return null;

  const toggleMaterial = (mat: string) => {
    setMateriales(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const token = `${nombre.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fechaHoy = new Date().toISOString().split('T')[0];
    const proximaRenov = new Date();
    proximaRenov.setDate(proximaRenov.getDate() + 30);

    const nuevo: Alumno = {
      id: 'alm-' + Date.now(),
      tokenAcceso: token,
      nombre,
      telefono,
      email,
      edad: Number(edad),
      pesoKg: Number(pesoKg),
      alturaCm: Number(alturaCm),
      camino,
      objetivo,
      nivel,
      fechaInicio: fechaHoy,
      entrenamientosEsperadosPorSemana: camino === 'solo_nutricion' ? 0 : 3,
      diasHorariosDisponibles: diasHorarios,
      horariosRotativos: false,
      zonaMdp,
      aceptaZoom,
      entrenaSoloOAcompanado: 'acompanado',
      materialesCasa: materiales,
      preferenciaClase: 'grupal',
      condicionFisica: {
        doloresLesiones: dolores || 'Sin dolores reportados',
        ejerciciosEvitar: ejerciciosEvitar || 'Ninguno',
        toleranciaTrote: nivel === 'inicial' ? 'baja' : 'media',
        toleranciaImpacto: nivel === 'inicial' ? 'baja' : 'media',
        indicacionesMedicas: 'Apto médico requerido',
        evaluacionesPendientes: 'Evaluación postural inicial'
      },
      nutricion: camino !== 'entrenamiento' ? {
        objetivoPrincipal: objetivoNutricional,
        habitosAlimentarios: 'En proceso de ordenamiento de horarios',
        consumoAguaLitros: Number(consumoAgua),
        nivelEnergiaDiaria: 7,
        desayunoHabitual,
        almuerzoCenaHabitual: 'Comidas caseras',
        picoteoSnacks: 'Frutas',
        productosHerbalifeRecomendados: [
          'Batido Nutricional Fórmula 1',
          'Proteína en Polvo Personalizada (PPP)',
          'Té Concentrado de Hierbas'
        ],
        historialSeguimiento: [
          { fecha: fechaHoy, pesoKg: Number(pesoKg), sensaciones: 'Inicio de asesoramiento', notas: 'Evaluación inicial cargada en ficha' }
        ],
        notasGenerales: 'Seguimiento quincenal programado.'
      } : undefined,
      pagos: {
        estado: 'al_dia',
        ultimoPagoFecha: fechaHoy,
        periodoAbonado: 'Primer ciclo 30 días',
        proximaRenovacionFecha: proximaRenov.toISOString().split('T')[0],
        monto: Number(monto),
        servicioContratado: camino === 'entrenamiento' 
          ? 'Solo Entrenamiento' 
          : camino === 'entrenamiento_nutricion' 
          ? 'Entrenamiento + Nutrición' 
          : 'Solo Nutrición Herbalife',
        notas: 'Alta registrada recientemente.'
      },
      historialFeedback: []
    };

    onAddAlumno(nuevo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 my-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-600" />
              Nuevo Ingreso a Mar del Trote
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Crea la ficha única del alumno y asígnale su camino inicial.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selector de los 3 Caminos */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Elegir Camino del Alumno:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setCamino('entrenamiento')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  camino === 'entrenamiento'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Dumbbell className="w-4 h-4 text-emerald-600" />
                  1. Solo Entrenamiento
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Planificación semanal, 3 modalidades y running.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCamino('entrenamiento_nutricion')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  camino === 'entrenamiento_nutricion'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Flame className="w-4 h-4 text-amber-500" />
                  2. Entreno + Nutrición
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Plan de carrera + asesoramiento y suplementación Herbalife.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCamino('solo_nutricion')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  camino === 'solo_nutricion'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Apple className="w-4 h-4 text-sky-600" />
                  3. Solo Nutrición
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Evaluación de hábitos, recomposición y seguimiento de productos.
                </p>
              </button>
            </div>
          </div>

          {/* Datos Personales y Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre y Apellido *</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Lucía Benítez"
                className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp (con código de área) *</label>
              <input
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="5492235123456"
                className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alumno@ejemplo.com"
                className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Edad</label>
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(Number(e.target.value))}
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={pesoKg}
                  onChange={(e) => setPesoKg(Number(e.target.value))}
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={alturaCm}
                  onChange={(e) => setAlturaCm(Number(e.target.value))}
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sección de Entrenamiento (si aplica) */}
          {camino !== 'solo_nutricion' && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                Variables de Entrenamiento & Mar del Plata
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Objetivo Running</label>
                  <select
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value as ObjetivoRunning)}
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="empezar_correr">Empezar a correr</option>
                    <option value="mejorar_resistencia">Mejorar resistencia</option>
                    <option value="bajar_peso">Bajar de peso</option>
                    <option value="aumentar_masa_muscular">Aumentar masa muscular</option>
                    <option value="preparar_carrera">Preparar una carrera</option>
                    <option value="generar_habito">Generar el hábito</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nivel Actual</label>
                  <select
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value as NivelType)}
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="inicial">Inicial / Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" /> Zona MDP
                  </label>
                  <select
                    value={zonaMdp}
                    onChange={(e) => setZonaMdp(e.target.value as ZonaMDP)}
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                  >
                    {ZONAS_MDP.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Días y Horarios Disponibles</label>
                  <input
                    type="text"
                    value={diasHorarios}
                    onChange={(e) => setDiasHorarios(e.target.value)}
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                    placeholder="Ej: Martes y Jueves 8:00 hs"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="aceptaZoom"
                    checked={aceptaZoom}
                    onChange={(e) => setAceptaZoom(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-600"
                  />
                  <label htmlFor="aceptaZoom" className="text-xs font-medium text-slate-700 cursor-pointer">
                    Acepta pasar a clase Zoom cuando el clima no acompaña
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Materiales que tiene en casa (para versiones Zoom y a Distancia):
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Colchoneta', 'Pesas/Mancuernas', 'Tobilleras', 'Bandas elásticas', 'Silla/Escalón'].map((mat) => (
                    <button
                      type="button"
                      key={mat}
                      onClick={() => toggleMaterial(mat)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium border transition-colors ${
                        materiales.includes(mat)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {materiales.includes(mat) ? '✓ ' : '+ '} {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Dolores o Lesiones a Cuidar</label>
                  <input
                    type="text"
                    value={dolores}
                    onChange={(e) => setDolores(e.target.value)}
                    placeholder="Ej: molestia lumbar, rodilla, etc."
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Movimientos o Ejercicios a Evitar</label>
                  <input
                    type="text"
                    value={ejerciciosEvitar}
                    onChange={(e) => setEjerciciosEvitar(e.target.value)}
                    placeholder="Ej: saltos en cemento, flexión profunda"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección de Nutrición Herbalife (si aplica) */}
          {camino !== 'entrenamiento' && (
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-3">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-emerald-600" />
                Evaluación Inicial de Hábitos & Nutrición Herbalife
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Objetivo Nutricional Principal</label>
                  <input
                    type="text"
                    value={objetivoNutricional}
                    onChange={(e) => setObjetivoNutricional(e.target.value)}
                    placeholder="Ej: Descenso de peso, masa muscular, energía"
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Consumo de agua diario (Litros)</label>
                  <input
                    type="number"
                    step="0.2"
                    value={consumoAgua}
                    onChange={(e) => setConsumoAgua(Number(e.target.value))}
                    className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Desayuno habitual hoy</label>
                <input
                  type="text"
                  value={desayunoHabitual}
                  onChange={(e) => setDesayunoHabitual(e.target.value)}
                  placeholder="Ej: Mate solo, galletitas, tostadas con queso..."
                  className="w-full text-sm p-2 bg-white border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Arancel / Cobro */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-700 block">Cuota / Ciclo Inicial:</span>
              <span className="text-xs text-slate-500">Período de 30 días renovable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm">$</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-32 text-sm p-2 font-bold bg-white border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all"
            >
              Crear Ficha y Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
