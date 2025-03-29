// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(data) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Encabezado
  doc.setFontSize(16);
  doc.text('COLEGIO NUESTRA SEÑORA DE LAS LAJAS', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 10;

  doc.setFontSize(12);
  doc.text('VALORACIONES 2025', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Información general
  doc.setFontSize(10);
  doc.text(`Período: ${data.generalInfo.periodo || 'N/A'}`, 14, yPosition);
  yPosition += 6;
  doc.text(`Grado: ${data.generalInfo.grado || 'N/A'}`, 14, yPosition);
  yPosition += 6;
  doc.text(
    `Asignatura: ${data.generalInfo.asignatura || 'N/A'}`,
    14,
    yPosition
  );
  yPosition += 6;
  doc.text(`Docente: ${data.generalInfo.docente || 'N/A'}`, 14, yPosition);
  yPosition += 6;
  doc.text(
    `Estudiante: ${data.generalInfo.estudiante || 'N/A'}`,
    14,
    yPosition
  );
  yPosition += 6;
  doc.text(
    `Estándar Relacionado: ${data.generalInfo.estandarRelacionado || 'N/A'}`,
    14,
    yPosition,
    { maxWidth: 180 }
  );
  yPosition += 10;

  // Cálculos por unidad
  Object.entries(data.units).forEach(([unitName, unitData], index) => {
    doc.setFontSize(12);
    doc.text(`Unidad ${index + 1}: ${unitName || 'Sin nombre'}`, 14, yPosition);
    yPosition += 6;

    // Tabla de actividades (CÓDIGO, SABERES, NOTA, FECHA, DESCRIPCIÓN)
    const activities = [
      ...unitData.hacer.map((item) => [
        item.code,
        'Hacer',
        item.note || 'N/A',
        item.date || 'N/A',
        item.activity || 'N/A',
      ]),
      ...unitData.saber.map((item) => [
        item.code,
        'Saber',
        item.note || 'N/A',
        item.date || 'N/A',
        item.activity || 'N/A',
      ]),
      ...unitData.ser.map((item) => [
        item.code,
        'Ser',
        item.note || 'N/A',
        item.date || 'N/A',
        item.activity || 'N/A',
      ]),
    ];

    doc.autoTable({
      startY: yPosition,
      head: [['CÓDIGO', 'SABERES', 'NOTA', 'FECHA', 'DESCRIPCIÓN']],
      body: activities,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 15 },
        3: { cellWidth: 20 },
        4: { cellWidth: 85 },
      },
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
    });
    yPosition = doc.lastAutoTable.finalY + 10;

    // Tabla de cálculos (CÓDIGO HACER, HACER, CÓDIGO SABER, SABER, CÓDIGO SER, SER)
    const unitCalculations = data.calculations.units[unitName];
    const percentages = getPercentages(data.generalInfo.asignatura);

    const maxRows = Math.max(
      unitCalculations.hacer.length,
      unitCalculations.saber.length,
      unitCalculations.ser.length
    );
    const calcBody = [];

    for (let i = 0; i < maxRows; i++) {
      const row = [
        unitCalculations.hacer[i]?.code || '',
        unitCalculations.hacer[i]?.note &&
        !isNaN(parseFloat(unitCalculations.hacer[i].note))
          ? parseFloat(unitCalculations.hacer[i].note).toFixed(2)
          : '',
        unitCalculations.saber[i]?.code || '',
        unitCalculations.saber[i]?.note &&
        !isNaN(parseFloat(unitCalculations.saber[i].note))
          ? parseFloat(unitCalculations.saber[i].note).toFixed(2)
          : '',
        unitCalculations.ser[i]?.code || '',
        unitCalculations.ser[i]?.note &&
        !isNaN(parseFloat(unitCalculations.ser[i].note))
          ? parseFloat(unitCalculations.ser[i].note).toFixed(2)
          : '',
      ];
      calcBody.push(row);
    }

    calcBody.push([
      'PROMEDIOS',
      unitCalculations.promedio.hacer,
      '',
      unitCalculations.promedio.saber,
      '',
      unitCalculations.promedio.ser,
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
      (unitCalculations.promedio.hacer * percentages.hacer).toFixed(2),
      '',
      (unitCalculations.promedio.saber * percentages.saber).toFixed(2),
      '',
      (unitCalculations.promedio.ser * percentages.ser).toFixed(2),
    ]);
    calcBody.push([
      'SUMA TOTALES',
      unitCalculations.sumaTotales,
      '',
      '',
      '',
      '',
    ]);
    calcBody.push([
      '70% SUMA TOTALES',
      unitCalculations.sumaTotales70,
      '',
      '',
      '',
      '',
    ]);

    const rowColors = {
      PROMEDIOS: [255, 182, 193],
      PORCENTAJES: [255, 160, 122],
      CÁLCULOS: [144, 238, 144],
      'SUMA TOTALES': [135, 206, 250],
      '70% SUMA TOTALES': [147, 112, 219],
    };

    const titleColors = [
      [255, 69, 0],
      [34, 139, 34],
      [138, 43, 226],
      [255, 215, 0],
      [0, 191, 255],
    ];
    const titleColor = titleColors[index % titleColors.length];

    doc.setFontSize(12);
    doc.setTextColor(...titleColor);
    doc.text(`Cálculos de Unidad ${index + 1}`, 14, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 6;

    doc.autoTable({
      startY: yPosition,
      head: [
        ['CÓDIGO HACER', 'HACER', 'CÓDIGO SABER', 'SABER', 'CÓDIGO SER', 'SER'],
      ],
      body: calcBody,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
      },
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
      didParseCell: (hookData) => {
        const rowLabel = hookData.row.raw[0];
        if (rowColors[rowLabel]) {
          hookData.cell.styles.fillColor = rowColors[rowLabel];
        }
      },
    });
    yPosition = doc.lastAutoTable.finalY + 10;

    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Nueva página para las secciones finales
  doc.addPage();
  yPosition = 20;

  // Sección: Cálculos Generales
  doc.setFontSize(12);
  doc.text('Cálculos Generales', 14, yPosition);
  yPosition += 6;

  const allHacer = [];
  const allSaber = [];
  const allSer = [];

  for (const [, unitData] of Object.entries(data.units)) {
    allHacer.push(...unitData.hacer);
    allSaber.push(...unitData.saber);
    allSer.push(...unitData.ser);
  }

  const maxRows = Math.max(allHacer.length, allSaber.length, allSer.length);
  const generalCalcBody = [];

  for (let i = 0; i < maxRows; i++) {
    const row = [
      allHacer[i]?.code || '',
      allHacer[i]?.note && !isNaN(parseFloat(allHacer[i].note))
        ? parseFloat(allHacer[i].note).toFixed(2)
        : '',
      allSaber[i]?.code || '',
      allSaber[i]?.note && !isNaN(parseFloat(allSaber[i].note))
        ? parseFloat(allSaber[i].note).toFixed(2)
        : '',
      allSer[i]?.code || '',
      allSer[i]?.note && !isNaN(parseFloat(allSer[i].note))
        ? parseFloat(allSer[i].note).toFixed(2)
        : '',
    ];
    generalCalcBody.push(row);
  }

  const percentages = getPercentages(data.generalInfo.asignatura);
  generalCalcBody.push([
    'PROMEDIOS',
    data.calculations.general.promedio.hacer,
    '',
    data.calculations.general.promedio.saber,
    '',
    data.calculations.general.promedio.ser,
  ]);
  generalCalcBody.push([
    'PORCENTAJES',
    `${(percentages.hacer * 100).toFixed(0)}%`,
    '',
    `${(percentages.saber * 100).toFixed(0)}%`,
    '',
    `${(percentages.ser * 100).toFixed(0)}%`,
  ]);
  generalCalcBody.push([
    'CÁLCULOS',
    data.calculations.general.total.hacer,
    '',
    data.calculations.general.total.saber,
    '',
    data.calculations.general.total.ser,
  ]);
  generalCalcBody.push([
    'SUMA TOTALES',
    data.calculations.general.sumaTotales,
    '',
    '',
    '',
    '',
  ]);
  generalCalcBody.push([
    '70% SUMA TOTALES',
    data.calculations.general.sumaTotales70,
    '',
    '',
    '',
    '',
  ]);

  const generalRowColors = {
    PROMEDIOS: [255, 255, 153],
    PORCENTAJES: [255, 204, 153],
    CÁLCULOS: [204, 255, 204],
    'SUMA TOTALES': [153, 204, 255],
    '70% SUMA TOTALES': [204, 153, 255],
  };

  doc.autoTable({
    startY: yPosition,
    head: [
      ['CÓDIGO HACER', 'HACER', 'CÓDIGO SABER', 'SABER', 'CÓDIGO SER', 'SER'],
    ],
    body: generalCalcBody,
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2, lineWidth: 1 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: 25 },
      5: { cellWidth: 20 },
    },
    headStyles: { fillColor: [34, 139, 34], textColor: [255, 255, 255] },
    didParseCell: (hookData) => {
      const rowLabel = hookData.row.raw[0];
      if (generalRowColors[rowLabel]) {
        hookData.cell.styles.fillColor = generalRowColors[rowLabel];
      }
    },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Sección: Valoraciones Adicionales (30%)
  doc.setFontSize(12);
  doc.text('Valoraciones Adicionales (30%)', 14, yPosition);
  yPosition += 6;

  doc.autoTable({
    startY: yPosition,
    head: [['Evaluación', 'Nota', 'Porcentaje', 'Valor']],
    body: data.additional.map((item) => [
      item.evaluation,
      item.note || 'N/A',
      item.percentage,
      item.value || 'N/A',
    ]),
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 102, 204] },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Sección: Resultados Finales
  doc.setFontSize(12);
  doc.text('Resultados Finales', 14, yPosition);
  yPosition += 6;

  doc.autoTable({
    startY: yPosition,
    head: [['Concepto', 'Valor']],
    body: [
      ['Nota Final 70%', data.results.notaFinal70 || 'N/A'],
      ['Valoraciones Finales 30%', data.results.valoracionesFinales30 || 'N/A'],
      ['Nota Final Total', data.results.notaFinal || 'N/A'],
    ],
    theme: 'grid',
    styles: { fontSize: 8, lineWidth: 0.5 },
    headStyles: { fillColor: [0, 102, 204] },
    didParseCell: (hookData) => {
      if (hookData.row.raw[0] === 'Nota Final Total') {
        hookData.cell.styles.fillColor = [255, 215, 0];
        hookData.cell.styles.textColor = [255, 0, 0];
        hookData.cell.styles.fontStyle = 'bold';
        hookData.cell.styles.fontSize = 12;
        hookData.cell.styles.lineWidth = 1.5;
      }
    },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Añadir pie de página
  const footerText = 'autor: josearegu@gmail.com';
  const footerFontSize = 8;
  doc.setFontSize(footerFontSize);
  const footerHeight = footerFontSize * 1.2; // Estimación de la altura del texto
  const pageHeight = doc.internal.pageSize.height;
  const footerY = pageHeight - footerHeight - 5; // 5 puntos de margen desde el fondo

  // Asegurarse de que el pie de página no se superponga con el contenido
  if (yPosition <= footerY) {
    doc.text(footerText, 14, footerY);
  } else {
    // Si el contenido excede el espacio disponible, se añade justo después
    doc.text(footerText, 14, yPosition + 10);
    console.warn(
      'El contenido excede el espacio de la página; el pie de página podría desbordarse.'
    );
  }

  // Guardar el PDF
  doc.save(
    `Valoraciones_${data.generalInfo.estudiante || 'Estudiante'}_${data.generalInfo.asignatura}.pdf`
  );
}

// Función para obtener los porcentajes (copiada de calculations.js para evitar errores)
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
