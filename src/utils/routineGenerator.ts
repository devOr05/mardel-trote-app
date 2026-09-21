import { Alumno, PlanSemanal, EntrenamientoItem } from '../types';

export function generarBorradorPlanSemanal(alumno: Alumno): PlanSemanal {
  const feedbacks = alumno.historialFeedback || [];
  const sesionesCompletadas = feedbacks.length;
  const huboMolestias = feedbacks.some(f => f.molestias);
  const promedioEnergia = sesionesCompletadas > 0 
    ? feedbacks.reduce((acc, f) => acc + f.energia, 0) / sesionesCompletadas 
    : 7;

  // Criterio de la entrenadora implementado en la sugerencia inicial:
  let objetivoSemanal = 'Mantener regularidad y consolidar base aeróbica';
  let multiplicadorVolumen = 1;
  let recomendacionSeguridad = 'Atención a la postura en los últimos minutos. Terminar con energía de reserva.';

  if (huboMolestias) {
    objetivoSemanal = 'Descarga activa y adaptación por molestias previas. Priorizar bajo impacto.';
    multiplicadorVolumen = 0.8;
    recomendacionSeguridad = 'Suspender inmediatamente ante pinchazos o dolor punzante. No forzar rango articular.';
  } else if (sesionesCompletadas >= 3 && promedioEnergia >= 7.5) {
    objetivoSemanal = 'Progresión controlada: estímulo de resistencia y fuerza con técnica';
    multiplicadorVolumen = 1.1;
    recomendacionSeguridad = 'Mantener respiración fluida y cadencia ágil. Hidratarse adecuadamente.';
  } else if (sesionesCompletadas < 2 && sesionesCompletadas > 0) {
    objetivoSemanal = 'Recuperar continuidad semanal sin sobrecargar articulaciones';
    multiplicadorVolumen = 0.9;
  }

  // Materiales de casa que tiene el alumno
  const tienePesas = alumno.materialesCasa.some(m => m.toLowerCase().includes('pesa') || m.toLowerCase().includes('mancuerna'));
  const tieneBandas = alumno.materialesCasa.some(m => m.toLowerCase().includes('banda'));
  const equipamientoZoom = [
    alumno.materialesCasa.join(', ') || 'Colchoneta y botella de agua'
  ].join('');

  // Entrenamiento 1: Aeróbico / Adaptación
  const e1: EntrenamientoItem = {
    id: 'e1-' + Date.now(),
    numero: 1,
    titulo: 'Adaptación Aeróbica y Cadencia',
    funcion: 'Aeróbico / Adaptación / Recuperación activa',
    completado: false,
    presencial: {
      bloques: [
        'Entrada en calor: 8 min movilidad articular y activación de tobillos en pasto.',
        huboMolestias 
          ? 'Bloque principal: 4 x (4 min caminata rápida + 2 min trote muy suave regenerativo).'
          : `Bloque principal: ${Math.round(20 * multiplicadorVolumen)} min de trote continuo en zona cómoda (conversacional).`,
        'Vuelta a la calma: 5 min caminata + elongación suave de gemelos, isquiotibiales y cuádriceps.'
      ],
      descanso: '1 a 2 min caminando entre bloques si es necesario.',
      nivelEsfuerzo: 'RPE 4-5 (Moderado / Capacidad de hablar sin agitarse).',
      seguridad: recomendacionSeguridad
    },
    zoom: {
      bloques: [
        'Activación en casa: 6 min movilidad de caderas, tobillos y aperturas escapulares.',
        'Circuito aeróbico bajo impacto: 4 vueltas de (40s skipping bajo + 40s talones a glúteos suaves + 40s desplazamientos laterales + 40s paso cruzado).',
        'Cierre: Movilidad torácica en colchoneta y respiración diafragmática.'
      ],
      descanso: '45 segundos entre estaciones, 2 minutos entre vueltas completas.',
      nivelEsfuerzo: 'RPE 5 (Control del ritmo cardíaco en espacio reducido).',
      seguridad: `Usar calzado con buen agarre. Material: ${equipamientoZoom}.`
    },
    distancia: {
      bloques: [
        'Calentamiento individual: 10 min caminata progresiva.',
        huboMolestias
          ? 'Trote suave fraccionado: 15 min alternando 3 min trote / 2 min caminata.'
          : `Trote continuo al aire libre: ${Math.round(25 * multiplicadorVolumen)} min manteniendo pulsaciones estables.`,
        'Elongación general de miembros inferiores.'
      ],
      descanso: 'A demanda, priorizando no forzar ritmo.',
      nivelEsfuerzo: 'RPE 4-5.',
      seguridad: 'Elegir terreno plano (evitar desniveles bruscos o asfalto roto).'
    }
  };

  // Entrenamiento 2: Fuerza y Estabilidad
  const e2: EntrenamientoItem = {
    id: 'e2-' + Date.now(),
    numero: 2,
    titulo: 'Fuerza Funcional, Core y Estabilidad',
    funcion: 'Fuerza, estabilidad, técnica o control corporal',
    completado: false,
    presencial: {
      bloques: [
        'Activación neuromuscular: Puentes de glúteo unipodales, planchas frontales y laterales.',
        tienePesas
          ? 'Circuito fuerza: 3 series de 10 sentadillas goblet + 12 peso muerto rumano + 10 estocadas controladas + 15 elevaciones de talones.'
          : 'Circuito con peso corporal: 3 series de 12 sentadillas profundas + 10 estocadas hacia atrás + 15 puentes de glúteo.',
        'Técnica de carrera: Skipping A, tijeras rusas y zancada con braceo fluido (4 x 30 metros).'
      ],
      descanso: '60 a 90 segundos entre ejercicios.',
      nivelEsfuerzo: 'RPE 6-7 (Esfuerzo medio-alto muscular sin pérdida de técnica).',
      seguridad: 'Cuidar alineación rodilla-puntera del pie. Espalda neutra en todo momento.'
    },
    zoom: {
      bloques: [
        'Calentamiento guiado en pantalla: Activación de zona media (Bird-Dog + Dead Bug).',
        tieneBandas
          ? 'Bloque fuerza con bandas: Caminatas laterales con miniband + monster walks + remos con banda.'
          : 'Bloque isométrica en colchoneta: Plancha con apoyos alternados + puente con elevación de talón.',
        'Core y equilibrio: Desafíos propioceptivos sobre una sola pierna.'
      ],
      descanso: '45 segundos entre ejercicios.',
      nivelEsfuerzo: 'RPE 6.',
      seguridad: 'Cámara orientada para corregir postura de cadera y hombros.'
    },
    distancia: {
      bloques: [
        'Rutina en casa o parque: 3 series de 10 sentadillas lentas (3 seg bajada) + 12 puentes de glúteo + 30 seg plancha prona.',
        'Fortalecimiento de tobillos: 3 series de 20 elevaciones de pantorrilla con pausa arriba.',
        'Estiramientos de cadenas posteriores y psoas.'
      ],
      descanso: '1 minuto entre series.',
      nivelEsfuerzo: 'RPE 6.',
      seguridad: 'Controlar que el apoyo sea parejo sobre ambos pies.'
    }
  };

  // Entrenamiento 3: Resistencia o Progresión
  const e3: EntrenamientoItem = {
    id: 'e3-' + Date.now(),
    numero: 3,
    titulo: 'Resistencia Dinámica y Cambio de Ritmos',
    funcion: 'Resistencia, progresión o combinación de estímulos',
    completado: false,
    presencial: {
      bloques: [
        'Entrada en calor: 10 min trote suave + 4 rectas progresivas.',
        huboMolestias
          ? 'Bloque aeróbico continuo suave: 20 min en terreno blando (pasto) sin cambios de ritmo bruscos.'
          : `Bloque fartlek costero: ${Math.round(25 * multiplicadorVolumen)} min combinando 2 min a ritmo vivo + 2 min ritmo de recuperación.`,
        'Vuelta a la calma: 5 min caminata regenerativa + respiración profunda.'
      ],
      descanso: 'En trote suave de recuperación.',
      nivelEsfuerzo: huboMolestias ? 'RPE 5' : 'RPE 7-8 (Exigencia controlada).',
      seguridad: 'Si el viento en la costa está en contra, regular zancada y no forzar cadencia.'
    },
    zoom: {
      bloques: [
        'Activación aeróbica en casa: 5 min pasos cruzados y movilidad.',
        'Intervalos metabólicos: 4 series de (30 seg step o escalón rápido + 30 seg trote en el lugar + 30 seg descanso activo).',
        'Enfriamiento: Elongación asistida guiada por Zoom.'
      ],
      descanso: '1 minuto entre bloques metabólicos.',
      nivelEsfuerzo: 'RPE 7.',
      seguridad: 'Controlar pulsaciones. Hidratarse a sorbos pequeños.'
    },
    distancia: {
      bloques: [
        '10 min trote muy suave de calentamiento.',
        `Fondo progresivo de ${Math.round(30 * multiplicadorVolumen)} min: primeros 15 min suaves, últimos 15 min a ritmo objetivo de carrera / entrenamiento.`,
        'Caminata final y descarga en colchoneta.'
      ],
      descanso: 'Ritmo continuo controlado.',
      nivelEsfuerzo: 'RPE 7.',
      seguridad: 'Llevar reloj o celular con cronómetro para respetar los tiempos.'
    }
  };

  const hoy = new Date();
  const proximoLunes = new Date();
  proximoLunes.setDate(hoy.getDate() + ((1 + 7 - hoy.getDay()) % 7 || 7));
  const domingo = new Date(proximoLunes);
  domingo.setDate(proximoLunes.getDate() + 6);

  return {
    id: 'plan-' + Date.now(),
    alumnoId: alumno.id,
    semanaNumero: (alumno.planActual?.semanaNumero || 0) + 1,
    fechaInicio: proximoLunes.toISOString().split('T')[0],
    fechaFin: domingo.toISOString().split('T')[0],
    estado: 'borrador',
    objetivoSemanal,
    entrenamientos: [e1, e2, e3],
    notasEntrenadora: huboMolestias
      ? 'Ajustamos la semana con foco en recuperación por las molestias registradas. Monitorear sensaciones día a día.'
      : 'Excelente respuesta la semana pasada. Esta semana consolidamos con una leve progresión.'
  };
}
