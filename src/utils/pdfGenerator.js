// src/utils/pdfGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(data) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  console.log('Datos recibidos:', data); // Depuración

  // Configuración de fuente
  doc.setFont('Helvetica');

  // Encabezado mejorado
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102); // Azul oscuro institucional
  doc.text('COLEGIO NUESTRA SEÑORA DE LAS LAJAS', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 8;
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50); // Gris oscuro
  doc.text('VALORACIONES ACADÉMICAS 2025', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 10;
  doc.setDrawColor(0, 51, 102);
  doc.line(10, yPosition, pageWidth - 10, yPosition); // Línea divisoria
  yPosition += 10;

  // Información general en formato "tarjeta" (sin Estándar Relacionado)
  doc.setFillColor(245, 245, 245); // Fondo gris claro
  doc.rect(10, yPosition - 5, pageWidth - 20, 34, 'F'); // Ajustado altura
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Período: ${data.generalInfo.periodo || 'N/A'}`, 14, yPosition);
  doc.text(`Grado: ${data.generalInfo.grado || 'N/A'}`, 100, yPosition);
  yPosition += 6;
  doc.text(
    `Asignatura: ${data.generalInfo.asignatura || 'N/A'}`,
    14,
    yPosition
  );
  doc.text(`Docente: ${data.generalInfo.docente || 'N/A'}`, 100, yPosition);
  yPosition += 6;
  doc.text(
    `FECHA DE INFORME: ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    14,
    yPosition
  );
  yPosition += 6;
  doc.text(
    `Estudiante: ${data.generalInfo.estudiante || 'N/A'}`,
    14,
    yPosition
  );
  yPosition += 15;

  /// Tabla para "Estándar Relacionado" con salto de línea
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }
  doc.autoTable({
    startY: yPosition,
    head: [['ESTÁNDAR RELACIONADO']],
    body: [[data.generalInfo.estandarRelacionado || 'N/A']],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 2,
      overflow: 'linebreak', // Permite salto de línea automático
      minCellHeight: 0, // Asegura que la celda crezca según el contenido
    },
    headStyles: {
      fillColor: [0, 51, 102],
      textColor: [255, 255, 255],
    },
    columnStyles: {
      0: { cellWidth: pageWidth - 20 }, // Ancho completo menos márgenes
    },
    margin: { left: 10, right: 10 },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Unidades
  if (data.units && Object.keys(data.units).length > 0) {
    Object.entries(data.units).forEach(([unitName, unitData], index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(0, 51, 102);
      doc.text(
        `Unidad ${index + 1}: ${unitName || 'Sin nombre'}`,
        14,
        yPosition
      );
      yPosition += 6;

      const activities = [
        ...(unitData.hacer || []).map((item) => [
          item.code || 'N/A',
          'Hacer',
          item.note || 'N/A',
          item.date || 'N/A',
          item.activity || 'N/A',
        ]),
        ...(unitData.saber || []).map((item) => [
          item.code || 'N/A',
          'Saber',
          item.note || 'N/A',
          item.date || 'N/A',
          item.activity || 'N/A',
        ]),
        ...(unitData.ser || []).map((item) => [
          item.code || 'N/A',
          'Ser',
          item.note || 'N/A',
          item.date || 'N/A',
          item.activity || 'N/A',
        ]),
      ];

      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      doc.autoTable({
        startY: yPosition,
        head: [['CÓDIGO', 'SABERES', 'NOTA', 'FECHA', 'DESCRIPCIÓN']],
        body:
          activities.length > 0
            ? activities
            : [['N/A', 'N/A', 'N/A', 'N/A', 'N/A']],
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
        margin: { left: 10, right: 10 },
      });
      yPosition = doc.lastAutoTable.finalY + 10;

      // Tabla de cálculos por unidad
      const unitCalculations = data.calculations?.units?.[unitName] || {};
      const percentages = getPercentages(data.generalInfo?.asignatura);
      const calcBody = buildCalculationTable(unitCalculations, percentages);

      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(12);
      doc.text(`Cálculos de Unidad ${index + 1}`, 14, yPosition);
      yPosition += 6;

      doc.autoTable({
        startY: yPosition,
        head: [
          [
            'CÓDIGO HACER',
            'HACER',
            'CÓDIGO SABER',
            'SABER',
            'CÓDIGO SER',
            'SER',
          ],
        ],
        body: calcBody,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
        margin: { left: 10, right: 10 },
        didParseCell: applyRowColors,
      });
      yPosition = doc.lastAutoTable.finalY + 10;
    });
  }

  // Cálculos Generales
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFontSize(12);
  doc.setTextColor(0, 51, 102);
  doc.text('Cálculos Generales', 14, yPosition);
  yPosition += 6;

  const generalCalcBody = buildCalculationTable(
    data.calculations?.general || {},
    getPercentages(data.generalInfo?.asignatura)
  );
  doc.autoTable({
    startY: yPosition,
    head: [
      ['CÓDIGO HACER', 'HACER', 'CÓDIGO SABER', 'SABER', 'CÓDIGO SER', 'SER'],
    ],
    body: generalCalcBody,
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
    margin: { left: 10, right: 10 },
    didParseCell: applyRowColors,
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Valoraciones Adicionales
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFontSize(12);
  doc.text('Valoraciones Adicionales (30%)', 14, yPosition);
  yPosition += 6;

  doc.autoTable({
    startY: yPosition,
    head: [['Evaluación', 'Nota', 'Porcentaje', 'Valor']],
    body: (data.additional || []).map((item) => [
      item.evaluation || 'N/A',
      item.note || 'N/A',
      item.percentage || 'N/A',
      item.value || 'N/A',
    ]),
    theme: 'striped',
    styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
    margin: { left: 10, right: 10 },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Resultados Finales
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFontSize(12);
  doc.text('Resultados Finales', 14, yPosition);
  yPosition += 6;

  doc.autoTable({
    startY: yPosition,
    head: [['Concepto', 'Valor']],
    body: [
      ['Nota Final 70%', data.results?.notaFinal70 || 'N/A'],
      [
        'Valoraciones Finales 30%',
        data.results?.valoracionesFinales30 || 'N/A',
      ],
      ['Nota Final Total', data.results?.notaFinal || 'N/A'],
    ],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
    margin: { left: 10, right: 10 },
    didParseCell: (hookData) => {
      if (hookData.row.raw[0] === 'Nota Final Total') {
        hookData.cell.styles.fillColor = [255, 215, 0];
        hookData.cell.styles.textColor = [0, 51, 102];
        hookData.cell.styles.fontStyle = 'bold';
      }
    },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Pie de página en todas las páginas
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Página ${i} de ${pageCount}`, pageWidth - 30, pageHeight - 10, {
      align: 'right',
    });
    doc.text('autor: josearegu@gmail.com', 14, pageHeight - 10);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15); // Línea divisoria sutil
  }

  // Guardar el PDF
  try {
    doc.save(
      `Valoraciones_${data.generalInfo?.estudiante || 'Estudiante'}_${data.generalInfo?.asignatura || 'Asignatura'}.pdf`
    );
    console.log('PDF generado exitosamente');
  } catch (error) {
    console.error('Error al guardar el PDF:', error);
  }
}

// Función auxiliar para construir tablas de cálculos
function buildCalculationTable(calculations, percentages) {
  const maxRows = Math.max(
    (calculations.hacer || []).length,
    (calculations.saber || []).length,
    (calculations.ser || []).length
  );
  const calcBody = [];

  for (let i = 0; i < maxRows; i++) {
    calcBody.push([
      calculations.hacer?.[i]?.code || '',
      calculations.hacer?.[i]?.note &&
      !isNaN(parseFloat(calculations.hacer[i].note))
        ? parseFloat(calculations.hacer[i].note).toFixed(2)
        : '',
      calculations.saber?.[i]?.code || '',
      calculations.saber?.[i]?.note &&
      !isNaN(parseFloat(calculations.saber[i].note))
        ? parseFloat(calculations.saber[i].note).toFixed(2)
        : '',
      calculations.ser?.[i]?.code || '',
      calculations.ser?.[i]?.note &&
      !isNaN(parseFloat(calculations.ser[i].note))
        ? parseFloat(calculations.ser[i].note).toFixed(2)
        : '',
    ]);
  }

  calcBody.push([
    'PROMEDIOS',
    calculations.promedio?.hacer || 'N/A',
    '',
    calculations.promedio?.saber || 'N/A',
    '',
    calculations.promedio?.ser || 'N/A',
  ]);
  calcBody.push([
    'PORCENTAJES',
    `${(percentages.hacer * 100).toFixed(0)}%`,
    '',
    `${(percentages.saber * 100).toFixed(0)}%`,
    '',
    `${(percentages.ser * 100).toFixed(0)}%`,
  ]);
  calcBody.push([
    'CÁLCULOS',
    calculations.total?.hacer ||
      (calculations.promedio?.hacer * percentages.hacer).toFixed(2) ||
      'N/A',
    '',
    calculations.total?.saber ||
      (calculations.promedio?.saber * percentages.saber).toFixed(2) ||
      'N/A',
    '',
    calculations.total?.ser ||
      (calculations.promedio?.ser * percentages.ser).toFixed(2) ||
      'N/A',
  ]);
  calcBody.push([
    'SUMA TOTALES',
    calculations.sumaTotales || 'N/A',
    '',
    '',
    '',
    '',
  ]);
  calcBody.push([
    '70% SUMA TOTALES',
    calculations.sumaTotales70 || 'N/A',
    '',
    '',
    '',
    '',
  ]);

  return calcBody;
}

// Aplicar colores a filas específicas
function applyRowColors(hookData) {
  const rowColors = {
    PROMEDIOS: [230, 230, 250],
    PORCENTAJES: [245, 222, 179],
    CÁLCULOS: [144, 238, 144],
    'SUMA TOTALES': [173, 216, 230],
    '70% SUMA TOTALES': [221, 160, 221],
  };
  const rowLabel = hookData.row.raw[0];
  if (rowColors[rowLabel]) {
    hookData.cell.styles.fillColor = rowColors[rowLabel];
  }
}

// Función de porcentajes
const percentagesBySubject = {
  TECNOLOGIA_E_INFORMATICA: { saber: 0.3, hacer: 0.4, ser: 0.3 },
  CIENCIAS_NATURALES: { saber: 0.4, hacer: 0.3, ser: 0.3 },
  EDUCACION_ETICA_Y_EN_VALORES_HUMANOS: { saber: 0.2, hacer: 0.4, ser: 0.4 },
  CIENCIAS_SOCIALES: { saber: 0.35, hacer: 0.35, ser: 0.3 },
  HUMANIDADES_LENGUA_CASTELLANA_E_IDIOMAS_EXTRANJEROS: {
    saber: 0.4,
    hacer: 0.3,
    ser: 0.3,
  },
  MATEMATICAS: { saber: 0.4, hacer: 0.4, ser: 0.2 },
  EDUCACION_ARTISTICA: { saber: 0.3, hacer: 0.4, ser: 0.3 },
  EDUCACION_RELIGIOSA: { saber: 0.3, hacer: 0.3, ser: 0.4 },
  EDUCACION_FISICA_RECREACION_Y_DEPORTES: { saber: 0.3, hacer: 0.4, ser: 0.3 },
};

const getPercentages = (asignatura) => {
  return (
    percentagesBySubject[asignatura] || { saber: 0.4, hacer: 0.4, ser: 0.2 }
  );
};
