export type CaminoType = 'entrenamiento' | 'entrenamiento_nutricion' | 'solo_nutricion';

export type ModalidadType = 'presencial' | 'zoom' | 'distancia';

export type ObjetivoRunning = 
  | 'empezar_correr' 
  | 'mejorar_resistencia' 
  | 'bajar_peso' 
  | 'aumentar_masa_muscular' 
  | 'preparar_carrera' 
  | 'generar_habito';

export type NivelType = 'inicial' | 'intermedio' | 'avanzado';

export type EstadoPago = 'al_dia' | 'proximo_vencer' | 'vencido';

export type ZonaMDP = 
  | 'Playa Grande' 
  | 'Parque Camet' 
  | 'Parque San Martín' 
  | 'Plaza España' 
  | 'Costa Norte' 
  | 'La Perla' 
  | 'Varese' 
  | 'A distancia / Otra';

export interface FeedbackEntrenamiento {
  id: string;
  alumnoId: string;
  entrenamientoNumero: 1 | 2 | 3;
  fecha: string;
  modalidad: ModalidadType;
  energia: number; // 1 - 10
  esfuerzoRpe: 'Suave (1-3)' | 'Moderado (4-6)' | 'Fuerte (7-8)' | 'Máximo (9-10)';
  molestias: boolean;
  detalleMolestias?: string;
  parteFacil?: string;
  parteDificil?: string;
  terminoConEnergia: boolean;
}

export interface ModalidadDetalle {
  bloques: string[];
  descanso: string;
  nivelEsfuerzo: string;
  seguridad: string;
}

export interface EntrenamientoItem {
  id: string;
  numero: 1 | 2 | 3;
  titulo: string;
  funcion: string; // ej: "Aeróbico / Adaptación", "Fuerza & Técnica", "Resistencia"
  presencial: ModalidadDetalle;
  zoom: ModalidadDetalle;
  distancia: ModalidadDetalle;
  completado: boolean;
  modalidadRealizada?: ModalidadType;
}

export interface PlanSemanal {
  id: string;
  alumnoId: string;
  semanaNumero: number;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;
  estado: 'borrador' | 'aprobado' | 'enviado';
  objetivoSemanal: string;
  entrenamientos: EntrenamientoItem[];
  notasEntrenadora: string;
}

export interface EvaluacionNutricional {
  objetivoPrincipal: string;
  habitosAlimentarios: string;
  consumoAguaLitros: number;
  nivelEnergiaDiaria: number; // 1-10
  desayunoHabitual: string;
  almuerzoCenaHabitual: string;
  picoteoSnacks: string;
  productosHerbalifeRecomendados: string[]; // ej: "Batido Nutricional Fórmula 1", "Té Concentrado de Hierbas", "Proteína PPP", etc.
  historialSeguimiento: {
    fecha: string;
    pesoKg: number;
    sensaciones: string;
    notas: string;
  }[];
  notasGenerales: string;
}

export interface InfoPagos {
  estado: EstadoPago;
  ultimoPagoFecha: string;
  periodoAbonado: string;
  proximaRenovacionFecha: string;
  monto: number;
  servicioContratado: string;
  adelantoMesSiguiente?: number;
  notas: string;
}

export interface Alumno {
  id: string;
  tokenAcceso: string;
  nombre: string;
  telefono: string; // formato internacional ej: 5492235123456
  email: string;
  edad: number;
  pesoKg: number;
  alturaCm: number;
  medidasCorporales?: string;
  camino: CaminoType;
  objetivo: ObjetivoRunning;
  nivel: NivelType;
  fechaInicio: string;
  entrenamientosEsperadosPorSemana: number;
  
  // Disponibilidad y Zonas MDP
  diasHorariosDisponibles: string;
  horariosRotativos: boolean;
  zonaMdp: ZonaMDP;
  aceptaZoom: boolean;
  entrenaSoloOAcompanado: 'solo' | 'acompanado' | 'indiferente';
  materialesCasa: string[]; // ['Colchoneta', 'Pesas/Mancuernas', 'Tobilleras', 'Bandas elásticas', 'Silla/Escalón']
  preferenciaClase: 'individual' | 'grupal' | 'a_distancia';

  // Condición física y cuidados
  condicionFisica: {
    doloresLesiones: string;
    ejerciciosEvitar: string;
    toleranciaTrote: 'baja' | 'media' | 'alta';
    toleranciaImpacto: 'baja' | 'media' | 'alta';
    indicacionesMedicas: string;
    evaluacionesPendientes: string;
  };

  // Nutrición Herbalife (Caminos 2 y 3)
  nutricion?: EvaluacionNutricional;

  // Pagos y Cobranzas
  pagos: InfoPagos;

  // Planes y feedbacks
  planActual?: PlanSemanal;
  historialFeedback: FeedbackEntrenamiento[];
}

export interface WeatherDataMDP {
  temperatura: number;
  vientoKmH: number;
  probabilidadLluvia: number;
  descripcion: string;
  esAlertaClima: boolean;
  alertaMotivo?: string;
  horaActualizacion: string;
}
