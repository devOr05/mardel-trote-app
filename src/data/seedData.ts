import { Alumno } from '../types';

export const INITIAL_ALUMNOS: Alumno[] = [
  {
    id: 'alm-1',
    tokenAcceso: 'sofia-martinez-8291',
    nombre: 'Sofía Martínez',
    telefono: '5492235889911',
    email: 'sofia.mtz@gmail.com',
    edad: 32,
    pesoKg: 64,
    alturaCm: 167,
    medidasCorporales: 'Cintura: 72cm | Cadera: 98cm',
    camino: 'entrenamiento_nutricion',
    objetivo: 'mejorar_resistencia',
    nivel: 'intermedio',
    fechaInicio: '2026-01-15',
    entrenamientosEsperadosPorSemana: 3,
    diasHorariosDisponibles: 'Lunes, Miércoles y Viernes 8:00 hs',
    horariosRotativos: false,
    zonaMdp: 'Playa Grande',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'acompanado',
    materialesCasa: ['Colchoneta', 'Mancuernas 3kg', 'Bandas circulares'],
    preferenciaClase: 'grupal',
    condicionFisica: {
      doloresLesiones: 'Leve sobrecarga en gemelo derecho hace 2 semanas, ya recuperada.',
      ejerciciosEvitar: 'Saltos pliométricos en cemento duro.',
      toleranciaTrote: 'alta',
      toleranciaImpacto: 'media',
      indicacionesMedicas: 'Apto médico al día presentado en Febrero.',
      evaluacionesPendientes: 'Ninguna'
    },
    nutricion: {
      objetivoPrincipal: 'Tonificación, aumento de energía y recuperación muscular post-trote.',
      habitosAlimentarios: 'Desayunos rápidos, poco consumo de proteínas a media tarde.',
      consumoAguaLitros: 2.2,
      nivelEnergiaDiaria: 8,
      desayunoHabitual: 'Café con tostadas y mermelada',
      almuerzoCenaHabitual: 'Ensaladas con pollo o pescado, arroz integral',
      picoteoSnacks: 'Frutas secas y barras de cereal',
      productosHerbalifeRecomendados: [
        'Batido Nutricional Fórmula 1 (Vainilla)',
        'Proteína en Polvo Personalizada (PPP)',
        'Té Concentrado de Hierbas (Sabor Limón)',
        'Herbal Aloe Concentrado'
      ],
      historialSeguimiento: [
        { fecha: '2026-08-01', pesoKg: 66.2, sensaciones: 'Sensación de pesadez matutina', notas: 'Inicio plan de hidratación con Aloe y Batido matutino' },
        { fecha: '2026-08-20', pesoKg: 65.0, sensaciones: 'Mucha más energía durante el trote', notas: 'Se suma Té de Hierbas pre-entreno' },
        { fecha: '2026-09-15', pesoKg: 64.0, sensaciones: 'Recuperación muscular rápida', notas: 'Excelente adherencia y medidas reducidas' }
      ],
      notasGenerales: 'Muy constante. Consulta con frecuencia cómo dosificar el batido los días de fondos largos.'
    },
    pagos: {
      estado: 'al_dia',
      ultimoPagoFecha: '2026-09-05',
      periodoAbonado: 'Septiembre 2026',
      proximaRenovacionFecha: '2026-10-05',
      monto: 28000,
      servicioContratado: 'Entrenamiento + Nutrición',
      notas: 'Abona siempre por transferencia los primeros 5 días del mes.'
    },
    historialFeedback: [
      {
        id: 'fb-1',
        alumnoId: 'alm-1',
        entrenamientoNumero: 1,
        fecha: '2026-09-16',
        modalidad: 'presencial',
        energia: 8,
        esfuerzoRpe: 'Moderado (4-6)',
        molestias: false,
        parteFacil: 'El ritmo continuo costero',
        parteDificil: 'La última cuesta hacia el Golf',
        terminoConEnergia: true
      },
      {
        id: 'fb-2',
        alumnoId: 'alm-1',
        entrenamientoNumero: 2,
        fecha: '2026-09-18',
        modalidad: 'zoom',
        energia: 9,
        esfuerzoRpe: 'Fuerte (7-8)',
        molestias: false,
        parteFacil: 'Planchas y core',
        parteDificil: 'Sentadillas goblet con 3kg',
        terminoConEnergia: true
      },
      {
        id: 'fb-3',
        alumnoId: 'alm-1',
        entrenamientoNumero: 3,
        fecha: '2026-09-20',
        modalidad: 'presencial',
        energia: 8,
        esfuerzoRpe: 'Moderado (4-6)',
        molestias: false,
        parteFacil: 'Rectas progresivas',
        parteDificil: 'Viento en contra a la vuelta',
        terminoConEnergia: true
      }
    ],
    planActual: {
      id: 'plan-act-1',
      alumnoId: 'alm-1',
      semanaNumero: 9,
      fechaInicio: '2026-09-22',
      fechaFin: '2026-09-28',
      estado: 'aprobado',
      objetivoSemanal: 'Consolidar ritmo en zona aeróbica con técnica de braceo en subidas',
      notasEntrenadora: 'Muy buen progreso la semana pasada. Hacemos hincapié en el remate del entrenamiento 3.',
      entrenamientos: [
        {
          id: 'ent-1-1',
          numero: 1,
          titulo: 'Adaptación Aeróbica & Viento Costero',
          funcion: 'Aeróbico / Adaptación / Recuperación activa',
          completado: true,
          modalidadRealizada: 'presencial',
          presencial: {
            bloques: [
              '8 min movilidad articular y trote suave en pasto de Playa Grande.',
              '25 min trote continuo a ritmo parejo (conversacional) por el paseo costero.',
              '5 min vuelta a la calma + elongación de cadenas posteriores.'
            ],
            descanso: 'Continuo sin pausas bruscas.',
            nivelEsfuerzo: 'RPE 5 (Moderado).',
            seguridad: 'Cuidar apoyo en las bajadas de la rambla.'
          },
          zoom: {
            bloques: [
              'Movilidad dinámica de cadera y tobillos (6 min).',
              'Circuito aeróbico en casa: 4 rondas de skipping bajo, talones y desplazamientos.',
              'Vuelta a la calma en colchoneta.'
            ],
            descanso: '45 seg entre ejercicios.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Espacio despejado.'
          },
          distancia: {
            bloques: [
              '10 min caminata progresiva.',
              '25 min trote continuo al aire libre con cadencia fluida.',
              'Elongación suave.'
            ],
            descanso: 'Continuo.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Llevar agua para hidratación intermedia.'
          }
        },
        {
          id: 'ent-1-2',
          numero: 2,
          titulo: 'Fuerza Muscular y Prevención de Lesiones',
          funcion: 'Fuerza, estabilidad, técnica o control corporal',
          completado: false,
          presencial: {
            bloques: [
              'Activación de core: Planchas frontales y puentes de glúteos.',
              '3 series de 10 sentadillas goblet + 12 peso muerto + 10 estocadas reversas.',
              'Drills de técnica de carrera: Talones a glúteo y zancada amplia (4 x 30m).'
            ],
            descanso: '60 seg entre ejercicios.',
            nivelEsfuerzo: 'RPE 7 (Exigencia muscular controlada).',
            seguridad: 'Mirada al frente, espalda derecha.'
          },
          zoom: {
            bloques: [
              'Activación en suelo guiada.',
              '3 vueltas con mancuernas y bandas: sentadilla isométrica en pared + monster walk + puentes.',
              'Estiramiento guiado de flexores de cadera.'
            ],
            descanso: '45 seg.',
            nivelEsfuerzo: 'RPE 7.',
            seguridad: 'Chequear postura en cámara.'
          },
          distancia: {
            bloques: [
              'Fuerza en casa: 3 series de sentadillas lentas + 15 puentes de glúteo + elevación de talones.',
              'Planchas 3 x 30 seg.',
              'Movilidad articular.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'No apurar las repeticiones.'
          }
        },
        {
          id: 'ent-1-3',
          numero: 3,
          titulo: 'Fondo Continuo y Progresión Final',
          funcion: 'Resistencia, progresión o combinación de estímulos',
          completado: false,
          presencial: {
            bloques: [
              '10 min trote suave de calentamiento.',
              '30 min continuo: primeros 20 min suaves, últimos 10 min aumentando cadencia 10%.',
              'Elongación completa.'
            ],
            descanso: 'Ritmo sostenido.',
            nivelEsfuerzo: 'RPE 7.',
            seguridad: 'Terminar con reserva de energía.'
          },
          zoom: {
            bloques: [
              'Calentamiento articular.',
              'Intervalos metabólicos con step o escalón.',
              'Enfriamiento suave.'
            ],
            descanso: '1 min entre bloques.',
            nivelEsfuerzo: 'RPE 7.',
            seguridad: 'Hidratación constante.'
          },
          distancia: {
            bloques: [
              '35 min de fondo al aire libre buscando sensaciones placenteras.',
              'Caminata de 5 min y estiramientos.'
            ],
            descanso: 'Ritmo estable.',
            nivelEsfuerzo: 'RPE 7.',
            seguridad: 'Elegir circuito seguro y con sombra.'
          }
        }
      ]
    }
  },
  {
    id: 'alm-2',
    tokenAcceso: 'juan-perez-1029',
    nombre: 'Juan Pérez',
    telefono: '5492236112233',
    email: 'juan.perez@live.com',
    edad: 41,
    pesoKg: 78,
    alturaCm: 178,
    camino: 'entrenamiento',
    objetivo: 'preparar_carrera',
    nivel: 'intermedio',
    fechaInicio: '2025-11-10',
    entrenamientosEsperadosPorSemana: 3,
    diasHorariosDisponibles: 'Martes, Jueves 19:00 hs y Sábados 9:00 hs',
    horariosRotativos: false,
    zonaMdp: 'Parque Camet',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'acompanado',
    materialesCasa: ['Colchoneta', 'Silla'],
    preferenciaClase: 'grupal',
    condicionFisica: {
      doloresLesiones: 'Ninguna lesión activa.',
      ejerciciosEvitar: 'Ninguno en particular.',
      toleranciaTrote: 'alta',
      toleranciaImpacto: 'alta',
      indicacionesMedicas: 'Apto médico al día.',
      evaluacionesPendientes: 'Prueba de 5km de control el mes próximo.'
    },
    pagos: {
      estado: 'al_dia',
      ultimoPagoFecha: '2026-09-02',
      periodoAbonado: 'Septiembre 2026',
      proximaRenovacionFecha: '2026-10-02',
      monto: 22000,
      servicioContratado: 'Solo Entrenamiento',
      notas: 'Pago puntual por transferencia.'
    },
    historialFeedback: [
      {
        id: 'fb-j1',
        alumnoId: 'alm-2',
        entrenamientoNumero: 1,
        fecha: '2026-09-17',
        modalidad: 'presencial',
        energia: 8,
        esfuerzoRpe: 'Fuerte (7-8)',
        molestias: false,
        parteFacil: 'La primera mitad en Camet',
        parteDificil: 'Las series de 400m',
        terminoConEnergia: true
      }
    ],
    planActual: {
      id: 'plan-juan-1',
      alumnoId: 'alm-2',
      semanaNumero: 12,
      fechaInicio: '2026-09-22',
      fechaFin: '2026-09-28',
      estado: 'aprobado',
      objetivoSemanal: 'Ritmo sostenido de 10k y técnica de braceo en recta final',
      notasEntrenadora: 'Enfocate en mantener la cadencia ágil y respirar de forma rítmica en Camet.',
      entrenamientos: [
        {
          id: 'ent-j-1',
          numero: 1,
          titulo: 'Rodaje Aeróbico Progresivo en Parque Camet',
          funcion: 'Aeróbico / Adaptación / Recuperación activa',
          completado: true,
          modalidadRealizada: 'presencial',
          presencial: {
            bloques: [
              '10 min calentamiento con movilidad articular y trote suave en pasto.',
              '35 min de rodaje continuo progresivo por el circuito arbolado de Camet.',
              '5 min de caminata suave y estiramiento completo de piernas.'
            ],
            descanso: 'Sin pausas, ritmo conversacional que va acelerando 5 seg/km al final.',
            nivelEsfuerzo: 'RPE 5 a 6.',
            seguridad: 'Cuidar raíces y desniveles del pasto en Camet.'
          },
          zoom: {
            bloques: [
              'Activación articular en casa (8 min).',
              'Circuito aeróbico indoor: 5 series de 45s skipping medio + 45s escalador + 45s jumping jacks.',
              'Descarga en colchoneta y respiración profunda.'
            ],
            descanso: '1 min entre series.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Piso antideslizante con colchoneta.'
          },
          distancia: {
            bloques: [
              '10 min trote suave progresivo.',
              '40 min continuo a ritmo aeróbico controlado en calle o parque.',
              'Elongación de gemelos, sóleo y cuádriceps.'
            ],
            descanso: 'Continuo.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Llevar hidratación.'
          }
        },
        {
          id: 'ent-j-2',
          numero: 2,
          titulo: 'Fuerza de Impulsión y Core de Carrera',
          funcion: 'Fuerza, estabilidad, técnica o control corporal',
          completado: false,
          presencial: {
            bloques: [
              '10 min trote suave + movilidad de cadera.',
              '4 series de: 12 sentadillas profundas + 10 estocadas caminando + 15 puentes de glúteo a una pierna.',
              'Técnica de zancada: 4 pasadas de 40 metros enfocadas en el empuje del metatarso.'
            ],
            descanso: '1 minuto entre ejercicios.',
            nivelEsfuerzo: 'RPE 7 (Exigencia muscular media-alta).',
            seguridad: 'Alineación de rodilla y tronco erguido.'
          },
          zoom: {
            bloques: [
              'Activación de glúteo medio y core (Bird Dog + Plancha lateral).',
              'Circuito con peso corporal y silla: Step-ups a silla + sentadillas búlgaras + flexiones.',
              'Estiramiento guiado de cadenas posteriores.'
            ],
            descanso: '45 segundos entre ejercicios.',
            nivelEsfuerzo: 'RPE 7.',
            seguridad: 'Verificar que la silla esté firme contra la pared.'
          },
          distancia: {
            bloques: [
              'Circuito de fuerza en casa o parque: 3 series de 12 sentadillas + 10 estocadas reversas + 40s plancha.',
              'Fortalecimiento de tobillos: 3 series de 20 elevaciones de pantorrilla.',
              'Movilidad de cadera.'
            ],
            descanso: '1 minuto.',
            nivelEsfuerzo: 'RPE 6-7.',
            seguridad: 'Respetar los descansos para mantener buena técnica.'
          }
        },
        {
          id: 'ent-j-3',
          numero: 3,
          titulo: 'Series de Ritmo de Carrera 10k y Remate',
          funcion: 'Resistencia, progresión o combinación de estímulos',
          completado: false,
          presencial: {
            bloques: [
              '12 min trote de calentamiento + 4 rectas progresivas.',
              'Bloque de pasadas: 5 x 600m a ritmo objetivo 10k con 90 seg de trote suave de recuperación.',
              '10 min trote regenerativo muy suave + elongación profunda.'
            ],
            descanso: '90 seg en trote suave entre repeticiones.',
            nivelEsfuerzo: 'RPE 8 (Exigente y controlado).',
            seguridad: 'No salir al sprint en los primeros 100 metros de cada pasada.'
          },
          zoom: {
            bloques: [
              'Calentamiento con movilidad dinámica.',
              'Bloque interválico HIIT guiado: 6 rounds de 1 min alta intensidad / 1 min descanso activo.',
              'Vuelta a la calma guiada en pantalla.'
            ],
            descanso: '1 minuto de descanso activo.',
            nivelEsfuerzo: 'RPE 8.',
            seguridad: 'Hidratarse constantemente.'
          },
          distancia: {
            bloques: [
              '10 min trote suave.',
              'Fartlek: 30 min alternando 2 min a ritmo vivo / 2 min suave.',
              '10 min caminata y estiramientos.'
            ],
            descanso: 'En trote suave.',
            nivelEsfuerzo: 'RPE 7-8.',
            seguridad: 'Monitorear sensaciones de fatiga.'
          }
        }
      ]
    }
  },
  {
    id: 'alm-3',
    tokenAcceso: 'valentina-rossi-4491',
    nombre: 'Valentina Rossi',
    telefono: '5492235990022',
    email: 'valen.rossi@yahoo.com',
    edad: 28,
    pesoKg: 59,
    alturaCm: 162,
    camino: 'entrenamiento',
    objetivo: 'empezar_correr',
    nivel: 'inicial',
    fechaInicio: '2026-08-01',
    entrenamientosEsperadosPorSemana: 3,
    diasHorariosDisponibles: 'Lunes y Miércoles 18:30 hs',
    horariosRotativos: true,
    zonaMdp: 'Plaza España',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'solo',
    materialesCasa: ['Colchoneta', 'Bandas elásticas'],
    preferenciaClase: 'individual',
    condicionFisica: {
      doloresLesiones: 'Molestia femoropatelar en rodilla izquierda al correr en cemento.',
      ejerciciosEvitar: 'Bajadas rápidas en pendiente pronunciada y saltos.',
      toleranciaTrote: 'baja',
      toleranciaImpacto: 'baja',
      indicacionesMedicas: 'Kinesiólogo indicó fortalecer glúteo medio y vasto interno.',
      evaluacionesPendientes: 'Control de estabilidad unipodal.'
    },
    pagos: {
      estado: 'al_dia',
      ultimoPagoFecha: '2026-09-10',
      periodoAbonado: 'Septiembre 2026',
      proximaRenovacionFecha: '2026-10-10',
      monto: 24000,
      servicioContratado: 'Solo Entrenamiento Individual',
      notas: 'Prefiere clases individuales por su rodilla.'
    },
    historialFeedback: [
      {
        id: 'fb-v1',
        alumnoId: 'alm-3',
        entrenamientoNumero: 1,
        fecha: '2026-09-18',
        modalidad: 'presencial',
        energia: 6,
        esfuerzoRpe: 'Moderado (4-6)',
        molestias: true,
        detalleMolestias: 'Pinchacito en rodilla izquierda al final del segundo bloque de trote',
        parteFacil: 'Caminata rápida en el pasto',
        parteDificil: 'Trote en vereda de la costa',
        terminoConEnergia: false
      }
    ],
    planActual: {
      id: 'plan-valen-1',
      alumnoId: 'alm-3',
      semanaNumero: 4,
      fechaInicio: '2026-09-22',
      fechaFin: '2026-09-28',
      estado: 'aprobado',
      objetivoSemanal: 'Descarga activa y fortalecimiento de rodilla en pasto sin impacto duro',
      notasEntrenadora: 'Adaptamos la semana para cuidar la rodilla izquierda: todo en césped y ejercicios isométricos.',
      entrenamientos: [
        {
          id: 'ent-v-1',
          numero: 1,
          titulo: 'Caminata Progresiva y Trote Corto en Pasto',
          funcion: 'Aeróbico / Adaptación / Recuperación activa',
          completado: true,
          modalidadRealizada: 'presencial',
          presencial: {
            bloques: [
              '8 min movilidad de tobillos y cadera en césped de Plaza España.',
              '4 series de: 4 min caminata rápida + 2 min trote suave con cadencia corta (sin pisar talón).',
              'Elongación suave de gemelos y cuádriceps.'
            ],
            descanso: '1 min caminando lento si hay fatiga.',
            nivelEsfuerzo: 'RPE 4 (Cómodo).',
            seguridad: 'Cero cemento. Al primer síntoma de pinchazo en la rodilla, pasar a caminata continua.'
          },
          zoom: {
            bloques: [
              'Activación sin impacto: 6 min movilidad articular.',
              'Circuito bajo impacto: Marcha en el lugar + paso lateral con banda + aperturas escapulares.',
              'Movilidad en colchoneta.'
            ],
            descanso: '1 min entre series.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Sin saltos.'
          },
          distancia: {
            bloques: [
              '20 min caminata rápida alternada con 1 min de trote muy suave.',
              'Elongación en colchoneta.'
            ],
            descanso: 'A demanda.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Elegir terreno parejo.'
          }
        },
        {
          id: 'ent-v-2',
          numero: 2,
          titulo: 'Fortalecimiento de Glúteo Medio y Vasto Interno',
          funcion: 'Fuerza, estabilidad, técnica o control corporal',
          completado: false,
          presencial: {
            bloques: [
              'Activación con miniband: Clamshell 3 x 15 por lado + Monster walk en pasto.',
              'Isometría de rodilla: Sentadilla apoyada en pared (Wall-Sit) con pelota entre rodillas (3 x 30s).',
              'Puentes de glúteos con énfasis en empuje con talones (3 x 12).'
            ],
            descanso: '1 minuto entre series.',
            nivelEsfuerzo: 'RPE 5-6 (Quemazón muscular controlada, cero dolor articular).',
            seguridad: 'No flexionar la rodilla a más de 90 grados en la pared.'
          },
          zoom: {
            bloques: [
              'Clamshells con banda en colchoneta (3 x 15).',
              'Wall-sit isométrico 3 x 30 seg.',
              'Elevaciones de pierna recta (vasto interno).'
            ],
            descanso: '45 seg.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Monitorear ángulo en cámara.'
          },
          distancia: {
            bloques: [
              'Ejercicios en colchoneta: 3 series de puentes + abducciones de cadera con banda.',
              'Wall-sit 3 x 25 seg.',
              'Estiramiento suave de flexores de cadera.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Frenar si hay molestia en la rótula.'
          }
        },
        {
          id: 'ent-v-3',
          numero: 3,
          titulo: 'Resistencia Aeróbica Suave y Estabilidad Unipodal',
          funcion: 'Resistencia, progresión o combinación de estímulos',
          completado: false,
          presencial: {
            bloques: [
              '10 min caminata de entrada en calor.',
              '20 min de trote muy suave regenerativo en terreno plano de césped.',
              'Equilibrio sobre una pierna (propiocepción) 3 x 20 seg por pierna.'
            ],
            descanso: 'Continuo y relajado.',
            nivelEsfuerzo: 'RPE 4-5.',
            seguridad: 'Zancada corta, evitar zancadas largas que aumentan el impacto.'
          },
          zoom: {
            bloques: [
              'Marcha aeróbica guiada y equilibrio unipodal en colchoneta.',
              'Elongación suave guiada.'
            ],
            descanso: 'Libre.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Pisar firme.'
          },
          distancia: {
            bloques: [
              '25 min caminata rápida en circuito agradable con 5 minutos de trote suave al medio.',
              'Estiramientos completos.'
            ],
            descanso: 'Libre.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Cuidar calzado.'
          }
        }
      ]
    }
  },
  {
    id: 'alm-4',
    tokenAcceso: 'marcos-ruiz-7711',
    nombre: 'Marcos Ruiz',
    telefono: '5492234556677',
    email: 'marcos.ruiz@gmail.com',
    edad: 38,
    pesoKg: 85,
    alturaCm: 175,
    camino: 'entrenamiento_nutricion',
    objetivo: 'bajar_peso',
    nivel: 'inicial',
    fechaInicio: '2026-07-15',
    entrenamientosEsperadosPorSemana: 2,
    diasHorariosDisponibles: 'Martes y Jueves 7:30 hs',
    horariosRotativos: false,
    zonaMdp: 'Costa Norte',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'indiferente',
    materialesCasa: ['Colchoneta', 'Tobilleras 2kg'],
    preferenciaClase: 'grupal',
    condicionFisica: {
      doloresLesiones: 'Tendinopatía aquiliana previa ya rehabilitada.',
      ejerciciosEvitar: 'Trote en puntas de pie prolongado.',
      toleranciaTrote: 'media',
      toleranciaImpacto: 'media',
      indicacionesMedicas: 'Control cardiológico anual aprobado.',
      evaluacionesPendientes: 'Ninguna'
    },
    nutricion: {
      objetivoPrincipal: 'Descenso de 8 kg de grasa y mejorar saciedad durante la jornada laboral.',
      habitosAlimentarios: 'Cenas muy cargadas tarde en la noche por horario laboral.',
      consumoAguaLitros: 1.8,
      nivelEnergiaDiaria: 6,
      desayunoHabitual: 'Facturas o bizcochitos en la oficina',
      almuerzoCenaHabitual: 'Minutas y pastas',
      picoteoSnacks: 'Galletitas dulces',
      productosHerbalifeRecomendados: [
        'Batido Nutricional Fórmula 1 (Frutilla)',
        'Proteína PPP',
        'Té Termogénico de Hierbas'
      ],
      historialSeguimiento: [
        { fecha: '2026-07-20', pesoKg: 88.5, sensaciones: 'Cansancio vespertino', notas: 'Sustitución de desayuno por Batido + Proteína' },
        { fecha: '2026-08-25', pesoKg: 86.0, sensaciones: 'Mejor digestión y menos ansiedad', notas: 'Se suma Té a media tarde' },
        { fecha: '2026-09-15', pesoKg: 85.0, sensaciones: 'Mayor agilidad en el trote', notas: 'Se mantiene excelente adherencia' }
      ],
      notasGenerales: 'Le cuesta hidratarse en invierno, le funciona bien el té caliente.'
    },
    pagos: {
      estado: 'proximo_vencer',
      ultimoPagoFecha: '2026-08-23',
      periodoAbonado: 'Agosto - Septiembre',
      proximaRenovacionFecha: '2026-09-23',
      monto: 28000,
      servicioContratado: 'Entrenamiento + Nutrición',
      notas: 'Vencimiento el día 23. Mandar recordatorio cordial.'
    },
    historialFeedback: [],
    planActual: {
      id: 'plan-marcos-1',
      alumnoId: 'alm-4',
      semanaNumero: 6,
      fechaInicio: '2026-09-22',
      fechaFin: '2026-09-28',
      estado: 'aprobado',
      objetivoSemanal: 'Gasto aeróbico continuo y activación de core con tobilleras',
      notasEntrenadora: 'Venís excelente con el descenso de peso. Mantenemos ritmo parejo sin forzar el talón de Aquiles.',
      entrenamientos: [
        {
          id: 'ent-m-1',
          numero: 1,
          titulo: 'Rodaje Aeróbico Continuo en Costa Norte',
          funcion: 'Aeróbico / Adaptación / Recuperación activa',
          completado: false,
          presencial: {
            bloques: [
              '8 min movilidad de tobillos y calentamiento activo.',
              '25 min trote continuo aeróbico a ritmo conversacional.',
              '5 min caminata y estiramiento del tendón de Aquiles y gemelos.'
            ],
            descanso: 'Continuo.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Cuidar apoyo plano del pie.'
          },
          zoom: {
            bloques: [
              'Calentamiento articular guiado.',
              'Circuito aeróbico indoor: 4 series de desplazamientos laterales + skipping bajo + sombra de boxeo.',
              'Elongación suave.'
            ],
            descanso: '45 seg entre series.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Piso firme.'
          },
          distancia: {
            bloques: [
              '10 min caminata rápida.',
              '25 min trote continuo suave.',
              'Elongación de tren inferior.'
            ],
            descanso: 'Continuo.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Hidratación antes y después.'
          }
        },
        {
          id: 'ent-m-2',
          numero: 2,
          titulo: 'Circuito Metabólico de Fuerza & Tobilleras',
          funcion: 'Fuerza, estabilidad, técnica o control corporal',
          completado: false,
          presencial: {
            bloques: [
              'Activación neuromuscular: Planchas frontales y puentes de glúteo.',
              '3 series con tobilleras: elevación de piernas + patadas de glúteo + sentadillas con peso corporal.',
              'Braceo y técnica de carrera (4 x 30m).'
            ],
            descanso: '1 minuto entre ejercicios.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Espalda neutra.'
          },
          zoom: {
            bloques: [
              'Fuerza con tobilleras en colchoneta: 3 series de 12 repeticiones.',
              'Planchas isométricas 3 x 30 seg.',
              'Elongación de psoas y cuádriceps.'
            ],
            descanso: '45 seg.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Monitorear técnica en cámara.'
          },
          distancia: {
            bloques: [
              'Circuito en casa: 3 vueltas de 12 sentadillas + 15 puentes de glúteo con tobilleras + 30s plancha.',
              'Estiramientos.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'No apurar los ejercicios.'
          }
        },
        {
          id: 'ent-m-3',
          numero: 3,
          titulo: 'Fartlek Aeróbico y Quema de Grasas',
          funcion: 'Resistencia, progresión o combinación de estímulos',
          completado: false,
          presencial: {
            bloques: [
              '10 min trote suave.',
              '20 min combinando 3 min trote ágil + 2 min trote de recuperación.',
              'Vuelta a la calma con caminata y respiración profunda.'
            ],
            descanso: 'En trote suave.',
            nivelEsfuerzo: 'RPE 6-7.',
            seguridad: 'No llegar a la falta de aire.'
          },
          zoom: {
            bloques: [
              'Intervalos metabólicos guiados con descansos controlados.',
              'Enfriamiento suave.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Tomar sorbos de agua.'
          },
          distancia: {
            bloques: [
              '25 min fondo aeróbico constante en circuito cómodo.',
              'Elongación final.'
            ],
            descanso: 'Ritmo estable.',
            nivelEsfuerzo: 'RPE 6.',
            seguridad: 'Llevar reloj para controlar tiempo.'
          }
        }
      ]
    }
  },
  {
    id: 'alm-5',
    tokenAcceso: 'carolina-lopez-3312',
    nombre: 'Carolina López',
    telefono: '5492235223344',
    email: 'caro.lopez@gmail.com',
    edad: 35,
    pesoKg: 61,
    alturaCm: 165,
    camino: 'entrenamiento',
    objetivo: 'generar_habito',
    nivel: 'inicial',
    fechaInicio: '2026-06-01',
    entrenamientosEsperadosPorSemana: 2,
    diasHorariosDisponibles: 'Sábados 9:30 hs y Miércoles 19:00 hs',
    horariosRotativos: true,
    zonaMdp: 'Varese',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'acompanado',
    materialesCasa: ['Colchoneta'],
    preferenciaClase: 'grupal',
    condicionFisica: {
      doloresLesiones: 'Ninguna molestia reportada.',
      ejerciciosEvitar: 'Ninguno.',
      toleranciaTrote: 'media',
      toleranciaImpacto: 'media',
      indicacionesMedicas: 'Apto médico al día.',
      evaluacionesPendientes: 'Ninguna'
    },
    pagos: {
      estado: 'vencido',
      ultimoPagoFecha: '2026-08-15',
      periodoAbonado: 'Agosto 2026',
      proximaRenovacionFecha: '2026-09-15',
      monto: 20000,
      servicioContratado: 'Solo Entrenamiento Grupal',
      notas: 'Adeuda renovación del mes en curso.'
    },
    historialFeedback: [],
    planActual: {
      id: 'plan-caro-1',
      alumnoId: 'alm-5',
      semanaNumero: 3,
      fechaInicio: '2026-09-22',
      fechaFin: '2026-09-28',
      estado: 'aprobado',
      objetivoSemanal: 'Construir el hábito semanal y disfrutar del trote costero en Varese',
      notasEntrenadora: 'El foco es la constancia: completar las 2 sesiones semanales sin saltearlas.',
      entrenamientos: [
        {
          id: 'ent-c-1',
          numero: 1,
          titulo: 'Caminata y Trote en Bahía Varese',
          funcion: 'Aeróbico / Adaptación / Recuperación activa',
          completado: false,
          presencial: {
            bloques: [
              '8 min movilidad articular con vista al mar en Varese.',
              '20 min alternando 3 min trote suave + 2 min caminata rápida.',
              '5 min caminata relajante y elongación de piernas.'
            ],
            descanso: 'Caminando.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Disfrutar del paisaje y respirar por nariz y boca.'
          },
          zoom: {
            bloques: [
              'Activación aeróbica en el lugar.',
              'Circuito de movilidad y pasos coordinados.',
              'Estiramientos en colchoneta.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Buena ventilación.'
          },
          distancia: {
            bloques: [
              '25 min caminata ágil con tramos de trote suave.',
              'Elongación suave.'
            ],
            descanso: 'Libre.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Ropa cómoda.'
          }
        },
        {
          id: 'ent-c-2',
          numero: 2,
          titulo: 'Fuerza Funcional Básica y Core',
          funcion: 'Fuerza, estabilidad, técnica o control corporal',
          completado: false,
          presencial: {
            bloques: [
              'Movilidad de cadera y hombros.',
              '3 vueltas de: 10 sentadillas libres + 12 puentes de glúteo + 25 seg plancha.',
              'Ejercicios de braceo fluido.'
            ],
            descanso: '1 min entre ejercicios.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Cuidar postura de espalda.'
          },
          zoom: {
            bloques: [
              'Rutina guiada en colchoneta.',
              'Fuerza suave con peso corporal.',
              'Elongación relajante.'
            ],
            descanso: '45 seg.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Respetar los tiempos.'
          },
          distancia: {
            bloques: [
              'Fuerza en casa con colchoneta: 3 series suaves.',
              'Estiramientos generales.'
            ],
            descanso: '1 min.',
            nivelEsfuerzo: 'RPE 5.',
            seguridad: 'Hidratarse.'
          }
        },
        {
          id: 'ent-c-3',
          numero: 3,
          titulo: 'Rodaje Suave Costero de Fin de Semana',
          funcion: 'Resistencia, progresión o combinación de estímulos',
          completado: false,
          presencial: {
            bloques: [
              '10 min caminata de calentamiento.',
              '20 min trote suave continuo sin apuro.',
              'Elongación completa.'
            ],
            descanso: 'Continuo.',
            nivelEsfuerzo: 'RPE 4-5.',
            seguridad: 'Terminar sintiéndose con ganas de más.'
          },
          zoom: {
            bloques: [
              'Sesión aeróbica suave en casa.',
              'Respiración y vuelta a la calma.'
            ],
            descanso: 'Libre.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Calzado adecuado.'
          },
          distancia: {
            bloques: [
              '25 min trote y caminata al aire libre.',
              'Estiramiento general.'
            ],
            descanso: 'Libre.',
            nivelEsfuerzo: 'RPE 4.',
            seguridad: 'Buscar hora de sol agradable.'
          }
        }
      ]
    }
  },
  {
    id: 'alm-6',
    tokenAcceso: 'martin-gomez-9921',
    nombre: 'Martín Gómez',
    telefono: '5492236884455',
    email: 'martin.gomez@gmail.com',
    edad: 45,
    pesoKg: 89,
    alturaCm: 176,
    camino: 'solo_nutricion',
    objetivo: 'bajar_peso',
    nivel: 'inicial',
    fechaInicio: '2026-09-01',
    entrenamientosEsperadosPorSemana: 0,
    diasHorariosDisponibles: 'Asesoramiento online y seguimiento por WhatsApp',
    horariosRotativos: false,
    zonaMdp: 'A distancia / Otra',
    aceptaZoom: true,
    entrenaSoloOAcompanado: 'solo',
    materialesCasa: [],
    preferenciaClase: 'a_distancia',
    condicionFisica: {
      doloresLesiones: 'Dolores lumbares por sedentarismo prolongado.',
      ejerciciosEvitar: 'Impacto.',
      toleranciaTrote: 'baja',
      toleranciaImpacto: 'baja',
      indicacionesMedicas: 'Hipertensión controlada con medicación.',
      evaluacionesPendientes: 'Control médico trimestral'
    },
    nutricion: {
      objetivoPrincipal: 'Descenso de 10 kg, mejora en niveles de energía y hábitos alimenticios sostenibles.',
      habitosAlimentarios: 'Se salta el desayuno, almuerza pesado y cena muy tarde. Poca ingesta de agua.',
      consumoAguaLitros: 1.2,
      nivelEnergiaDiaria: 5,
      desayunoHabitual: 'Mate solo hasta el mediodía',
      almuerzoCenaHabitual: 'Comida rápida de delivery',
      picoteoSnacks: 'Papas fritas y maní',
      productosHerbalifeRecomendados: [
        'Batido Nutricional Fórmula 1 (Dulce de Leche)',
        'Proteína PPP',
        'Herbal Aloe Concentrado (Mango)',
        'Fibra Activa de Manzana'
      ],
      historialSeguimiento: [
        { fecha: '2026-09-05', pesoKg: 90.5, sensaciones: 'Muy entusiasmado pero con poca rutina', notas: 'Comienza con desayuno nutritivo (Batido + Aloe)' },
        { fecha: '2026-09-18', pesoKg: 89.0, sensaciones: 'Mucho más deshinchado y regularidad digestiva', notas: 'Incorporó Fibra activa antes del almuerzo' }
      ],
      notasGenerales: 'Muy contento con el sabor Dulce de Leche. Le cuesta tomar agua fría en invierno, se le recomendó infusiones tibias con Aloe.'
    },
    pagos: {
      estado: 'al_dia',
      ultimoPagoFecha: '2026-09-01',
      periodoAbonado: 'Plan Asesoramiento Nutricional Septiembre',
      proximaRenovacionFecha: '2026-10-01',
      monto: 15000,
      servicioContratado: 'Solo Asesoramiento Nutricional',
      notas: 'Asesoría y acompañamiento quincenal.'
    },
    historialFeedback: []
  }
];
