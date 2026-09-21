import { Alumno } from '../types';

export function formatWhatsAppUrl(phone: string, text: string): string {
  // Limpiar caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function generateRutinaWAMessage(alumno: Alumno, appBaseUrl: string): string {
  const portalUrl = `${appBaseUrl}?token=${alumno.tokenAcceso}`;
  return `¡Hola ${alumno.nombre}! 🏃‍♀️🌊 Te comparto tu planificación semanal de *Mar del Trote*.

🎯 *Objetivo de la semana:* ${alumno.planActual?.objetivoSemanal || 'Construir continuidad y base aeróbica'}

Podés ver tus 3 entrenamientos, cambiar entre Presencial, Zoom o En Casa y registrar tu feedback acá:
👉 ${portalUrl}

Cualquier molestia o duda, avisame antes de arrancar. ¡A darle con todo! 💪`;
}

export function generateAlertaClimaWAMessage(alumno: Alumno, motivo: string, zoomLink = 'https://zoom.us/j/mardeltrote'): string {
  return `¡Hola ${alumno.nombre}! 🌧️🌬️ Por las condiciones del clima en Mar del Plata (${motivo}), pasamos la clase presencial de hoy a *modalidad Zoom / En Casa*.

📲 *Link de Zoom:* ${zoomLink}
Recordá tener a mano tu colchoneta y agua.

Si preferís hacerla en otro horario a tu ritmo, tenés la versión adaptada en tu enlace de siempre. ¡Nos vemos online! 🙌`;
}

export function generateFeedbackReminderWAMessage(alumno: Alumno, appBaseUrl: string): string {
  const portalUrl = `${appBaseUrl}?token=${alumno.tokenAcceso}`;
  return `¡Hola ${alumno.nombre}! 👋 ¿Cómo te fue con el entrenamiento de hoy? 

Completá el check-in rápido (te lleva 30 segundos) para que pueda evaluar cómo respondió tu cuerpo y armar tu plan de la semana que viene:
👉 ${portalUrl}

¡Que tengas excelente descanso! ✨`;
}

export function generateRecordatorioPagoWAMessage(alumno: Alumno): string {
  const fecha = alumno.pagos.proximaRenovacionFecha;
  const monto = alumno.pagos.monto.toLocaleString('es-AR');
  return `¡Hola ${alumno.nombre}! 😊 Te escribo para recordarte que tu ciclo de *Mar del Trote* (${alumno.pagos.servicioContratado}) renueva el *${fecha}*.

💳 *Monto:* $${monto}
*Alias:* mardeltrote.mp
*CBU:* 0000003100084920492812
*Titular:* Mar del Trote Entrenamiento

Cuando hagas la transferencia, enviame el comprobante por acá para registrarlo en tu ficha. ¡Muchas gracias por seguir sumando kilómetros juntos! 🏃‍♂️💚`;
}

export function generateNutricionWAMessage(alumno: Alumno): string {
  const prods = alumno.nutricion?.productosHerbalifeRecomendados.join(', ') || 'Plan de Nutrición Básica';
  return `¡Hola ${alumno.nombre}! 🥗✨ Estuve revisando tu evaluación de hábitos y composición corporal. 

Según tu objetivo de *${alumno.nutricion?.objetivoPrincipal || 'bienestar y rendimiento'}*, la recomendación inicial para complementar tu entrenamiento y energía es:
🔹 *Productos sugeridos:* ${prods}

¿Tenés 5 minutitos para que te cuente cómo incorporarlos a tu día a día y coordinar la entrega? ¡Un abrazo!`;
}
