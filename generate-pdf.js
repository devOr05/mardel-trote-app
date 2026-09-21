import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'Informe_Tecnico_Mar_del_Trote.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: 'Informe Técnico y Funcional - Mar del Trote PWA',
    Author: 'taller it',
    Subject: 'Auditoría Funcional, Arquitectura y Base de Datos'
  }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const PRIMARY = '#059669';   // Emerald
const DARK = '#064e3b';      // Dark Emerald
const TEXT = '#1e293b';      // Slate 800
const MUTED = '#64748b';     // Slate 500
const ACCENT = '#0284c7';    // Sky
const LIGHT_BG = '#f8fafc';

// Header
doc.rect(45, 35, 505, 55).fill(LIGHT_BG);
doc.rect(45, 35, 6, 55).fill(PRIMARY);

doc.fillColor(DARK).fontSize(20).font('Helvetica-Bold').text('MAR DEL TROTE', 60, 43);
doc.fillColor(PRIMARY).fontSize(9).font('Helvetica-Bold').text('ENTRENAMIENTO RUNNING & ASESORAMIENTO NUTRICIONAL • MAR DEL PLATA', 60, 68);

doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('Informe Técnico v1.0', 420, 46, { align: 'right' });
doc.text('Fecha: Septiembre 2026', 420, 58, { align: 'right' });
doc.fillColor(PRIMARY).font('Helvetica-Bold').text('Estado: Sistema Operativo', 420, 70, { align: 'right' });

doc.moveDown(2.5);

// Section Helper
function drawSection(title) {
  doc.moveDown(0.8);
  doc.rect(45, doc.y, 505, 20).fill('#ecfdf5');
  doc.rect(45, doc.y - 20, 4, 20).fill(PRIMARY);
  doc.fillColor(DARK).fontSize(11).font('Helvetica-Bold').text(title, 55, doc.y - 15);
  doc.moveDown(0.6);
}

// 1. Resumen
drawSection('1. RESUMEN EJECUTIVO Y PREMISA DE DISEÑO');
doc.fillColor(TEXT).fontSize(9.5).font('Helvetica').text(
  'La plataforma Mar del Trote es una Aplicación Web Progresiva (PWA) diseñada para centralizar la gestión de alumnos, planificaciones, modalidades y cobros sin desplazar el criterio humano y artesanal de la entrenadora.\n\n' +
  '• Filosofía: El sistema actúa como copiloto organizativo que prepara borradores de 3 entrenamientos semanales, calcula asistencias y detecta alertas climáticas costeras, mientras que la entrenadora aprueba cada rutina antes de ser enviada.',
  45, doc.y, { width: 505, lineGap: 3 }
);

// 2. Auditoría de Funcionalidades
drawSection('2. AUDITORÍA DE FUNCIONALIDADES SOLICITADAS');

const features = [
  { item: '1. Tres Caminos de Ingreso', estado: 'LISTO (100%)', desc: '1. Solo Entrenamiento | 2. Entreno + Nutrición | 3. Solo Nutrición. Segmentados en onboarding y perfiles.' },
  { item: '2. Ficha Única 360°', estado: 'LISTO (100%)', desc: 'Datos antropométricos, zonas MDP, disponibilidad horaria, materiales en casa, historial médico y apto físico.' },
  { item: '3. Plan Semanal Tri-Modalidad', estado: 'LISTO (100%)', desc: 'E1 (Aeróbico), E2 (Fuerza/Core) y E3 (Resistencia) generados en paralelo: Presencial, Zoom y En Casa.' },
  { item: '4. Borradores Inteligentes', estado: 'LISTO (100%)', desc: 'Analiza la semana previa: si hubo molestia baja impacto a pasto/isometría; con buena energía progresa.' },
  { item: '5. Portal Alumno sin Contraseñas', estado: 'LISTO (100%)', desc: 'Acceso directo mediante token único en URL (link de WhatsApp), switch táctil de modalidad y sin login pesado.' },
  { item: '6. Check-in y Feedback Post-Entreno', estado: 'LISTO (100%)', desc: 'Encuesta rápida: energía (1-10), RPE, reporte de dolores (con zona), fácil/difícil y confeti de festejo.' },
  { item: '7. Radar Climático en Vivo MDP', estado: 'LISTO (100%)', desc: 'API Open-Meteo en vivo (viento km/h y lluvia %). Botón "Simular Sudestada" y redacción de pase a Zoom.' },
  { item: '8. Semáforo de Pagos y Renovaciones', estado: 'LISTO (100%)', desc: 'Verde (Al día), Amarillo (Por vencer en 5 días) y Rojo (Vencido). Registro de cobro y recordatorio con CBU.' },
  { item: '9. Nutrición y Hábitos (Herbalife)', estado: 'LISTO (100%)', desc: 'Hábitos, ingesta de agua, asignación de suplementos (F1, Proteína, Té, Aloe) y evolución de pesajes.' },
  { item: '10. WhatsApp One-Click (Opción A)', estado: 'LISTO (100%)', desc: 'Botones wa.me sin costo: envío de rutina con link al portal, aviso de clima, cobros y nutrición.' },
  { item: '11. PWA con Botón en el Login', estado: 'LISTO (100%)', desc: 'Instalador PWA interactivo con soporte para Android, PC y guía paso a paso para iOS (Safari).' },
  { item: '12. Firma "Desarrollado por taller it"', estado: 'LISTO (100%)', desc: 'Ubicada con exclusividad al pie de la pantalla de Login/Inicio.' }
];

features.forEach((f, idx) => {
  doc.rect(45, doc.y, 505, 23).fill(idx % 2 === 0 ? '#ffffff' : '#f8fafc');
  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text(f.item, 50, doc.y - 19, { width: 155 });
  doc.fillColor(PRIMARY).fontSize(8).font('Helvetica-Bold').text(`[✓ ${f.estado}]`, 210, doc.y - 19);
  doc.fillColor(TEXT).fontSize(8).font('Helvetica').text(f.desc, 275, doc.y - 19, { width: 270 });
  doc.moveDown(0.2);
});

// Nueva página
doc.addPage();

// 3. Base de Datos
drawSection('3. ¿NECESITAMOS UNA BASE DE DATOS? (RESPUESTA Y ANÁLISIS)');
doc.fillColor(TEXT).fontSize(9).font('Helvetica').text(
  'La respuesta técnica es: DEPENDE DEL ENTORNO DE USO (Local vs Producción Multi-dispositivo).\n\n' +
  'A) FASE ACTUAL (Prototipo Funcional PWA - LocalStorage):\n' +
  '• La aplicación actual guarda toda la información en la memoria local del navegador.\n' +
  '• Ventajas: Es instantánea, no tiene costos de servidor, funciona 100% offline (clave para trotar en la costa sin señal) y permite validar todo el flujo operativo de inmediato.\n' +
  '• Limitación: Si un alumno completa su feedback desde su casa en su teléfono, ese dato no viaja automáticamente a tu computadora a menos que compartan un backend central.\n\n' +
  'B) FASE PRODUCCIÓN (Alumnos y Entrenadora en teléfonos separados) -> SÍ SE NECESITA:\n' +
  'Para que vos apruebes un plan en tu celular y el alumno lo vea en el suyo en tiempo real, se requiere una base de datos en la nube.\n\n' +
  'RECOMENDACIÓN TÉCNICA ÓPTIMA: SUPABASE (PostgreSQL en la Nube)\n' +
  '• Costo: $0 USD / mes (el plan gratuito incluye hasta 500 MB y 50.000 usuarios activos).\n' +
  '• Tiempo Real: En cuanto el alumno presiona "Terminé mi entrenamiento", tu panel se actualiza al instante.\n' +
  '• Copias de seguridad automáticas: Nunca se pierde una ficha médica o registro de pago si cambiás de celular.',
  45, doc.y, { width: 505, lineGap: 3 }
);

// 4. Repositorio Git
drawSection('4. CONTROL DE VERSIONES Y REPOSITORIO GIT');
doc.fillColor(TEXT).fontSize(9).font('Helvetica').text(
  'El código fuente del proyecto ya fue inicializado y confirmado localmente con Git en tu equipo:\n' +
  '• Directorio del Proyecto: C:\\Users\\kavay\\.gemini\\antigravity\\scratch\\mardel-trote-pwa\n' +
  '• Rama: master (con commit inicial registrado y probado).\n\n' +
  'Pasos para conectarlo a tu cuenta de GitHub:\n' +
  '1. Creá un repositorio vacío en github.com llamado "mardel-trote-app".\n' +
  '2. Abrí una terminal PowerShell en la carpeta del proyecto y ejecutá:\n' +
  '   git remote add origin https://github.com/TU_USUARIO/mardel-trote-app.git\n' +
  '   git branch -M main\n' +
  '   git push -u origin main',
  45, doc.y, { width: 505, lineGap: 3 }
);

// Footer
doc.rect(45, 780, 505, 1).fill('#cbd5e1');
doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('Mar del Trote • Plataforma Integral de Entrenamiento y Nutrición', 45, 790);
doc.fillColor(PRIMARY).fontSize(8).font('Helvetica-Bold').text('Desarrollado por taller it', 400, 790, { align: 'right' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF generado exitosamente en:', outputPath);
});
