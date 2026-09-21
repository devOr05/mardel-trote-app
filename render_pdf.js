import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const htmlPath = path.join(__dirname, 'informe_diseno.html');
  const projectPdfPath = path.join(__dirname, 'Informe_Tecnico_Mar_del_Trote.pdf');
  const desktopPdfPath = 'C:\\Users\\kavay\\Desktop\\Informe_Tecnico_Mar_del_Trote.pdf';

  console.log('Lanzando Chrome para generar PDF editorial...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Generar PDF con renderizado vectorial nativo de Chrome
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '16mm',
      bottom: '16mm',
      left: '15mm',
      right: '15mm'
    }
  });

  await browser.close();

  // Guardar en el proyecto y en el Escritorio
  fs.writeFileSync(projectPdfPath, pdfBuffer);
  fs.writeFileSync(desktopPdfPath, pdfBuffer);

  console.log('PDF generado con éxito en:');
  console.log('1. ', projectPdfPath);
  console.log('2. ', desktopPdfPath);
}

generatePDF().catch(err => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
