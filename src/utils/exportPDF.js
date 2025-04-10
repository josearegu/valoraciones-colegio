import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToPDF(state, results) {
  const doc = new jsPDF();
  const { generalInfo, units, additional } = state;

  // Header
  doc.setFontSize(16);
  doc.text('COLEGIO NUESTRA SEÑORA DE LAS LAJAS 2025', 105, 20, {
    align: 'center',
  });
  doc.setFontSize(12);
  doc.text('TABLA DE VALORACIONES 2025', 105, 30, { align: 'center' });

  // General Info
  doc.setFontSize(10);
  doc.text(`Período: ${generalInfo.periodo}`, 20, 40);
  doc.text(`Grado: ${generalInfo.grado || 'N/A'}`, 80, 40);
  doc.text(`Asignatura: ${generalInfo.asignatura}`, 140, 40);
  doc.text(`Docente: ${generalInfo.docente}`, 20, 50);
  doc.text(`Estudiante: ${generalInfo.estudiante || 'N/A'}`, 80, 50);

  // Units (70%)
  let y = 60;
  doc.text('70%_Valoraciones', 20, y);
  y += 10;
  Object.entries(units).forEach(([unitName, data], unitIndex) => {
    // Agregar el nombre de la unidad como título
    doc.setFontSize(12);
    doc.text(unitName, 20, y); // Usamos unitName aquí
    y += 10;

    const tableData = [['Código', 'Saberes', 'Nota', 'Fecha', 'Descripción']];
    data.hacer.forEach((val, i) => {
      const prefix = `U${unitIndex + 1}`;
      if (val)
        tableData.push([
          `${prefix}HA${i + 1}`,
          'Hacer',
          val,
          data.hacer_dates[i] || '',
          data.hacer_notes[i] || '',
        ]);
      if (data.saber[i])
        tableData.push([
          `${prefix}SA${i + 1}`,
          'Saber',
          data.saber[i],
          data.saber_dates[i] || '',
          data.saber_notes[i] || '',
        ]);
      if (data.ser[i])
        tableData.push([
          `${prefix}SE${i + 1}`,
          'Ser',
          data.ser[i],
          data.ser_dates[i] || '',
          data.ser_notes[i] || '',
        ]);
    });
    doc.autoTable({
      startY: y,
      head: [tableData[0]],
      body: tableData.slice(1),
      styles: { fontSize: 8 },
    });
    y = doc.lastAutoTable.finalY + 10;
  });

  // Additional (30%)
  doc.text('30%_Valoraciones', 20, y);
  doc.autoTable({
    startY: y + 10,
    head: [['Evaluación', 'Nota', 'Porcentaje', 'Valor']],
    body: [
      [
        'Evaluación Período',
        additional.evaluationPeriodo15 || '0',
        '15%',
        ((additional.evaluationPeriodo15 || 0) * 0.15).toFixed(2),
      ],
      [
        'Evaluación Externa',
        additional.evaluationExterna10 || '0',
        '10%',
        ((additional.evaluationExterna10 || 0) * 0.1).toFixed(2),
      ],
      [
        'Autoevaluación',
        additional.autoevaluacion5 || '0',
        '5%',
        ((additional.autoevaluacion5 || 0) * 0.05).toFixed(2),
      ],
    ],
    styles: { fontSize: 8 },
  });

  // Results
  y = doc.lastAutoTable.finalY + 10;
  doc.text('Resultados', 20, y);
  doc.autoTable({
    startY: y + 10,
    head: [['Descripción', 'Valor']],
    body: [
      ['70% Nota Final', results.notaFinal70],
      ['30% Valoraciones Finales', results.notaFinal30],
      ['Nota Final', results.total],
    ],
    styles: { fontSize: 8 },
  });

  doc.save(`Valoraciones_${generalInfo.asignatura}_2025.pdf`);
}
