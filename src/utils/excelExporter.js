// src/utils/excelExporter.js

import * as XLSX from 'xlsx';

// Función para exportar los datos a Excel
export function exportToExcel(data) {
  // Crear un nuevo libro de Excel
  const wb = XLSX.utils.book_new();

  // **Hoja 1: Información General**
  const generalInfoData = [
    ['Campo', 'Valor'],
    ['Período', data.generalInfo.periodo || 'N/A'],
    ['Grado', data.generalInfo.grado || 'N/A'],
    ['Asignatura', data.generalInfo.asignatura || 'N/A'],
    ['Docente', data.generalInfo.docente || 'N/A'],
    ['Estudiante', data.generalInfo.estudiante || 'N/A'],
    ['Estándar Relacionado', data.generalInfo.estandarRelacionado || 'N/A'],
  ];
  const generalInfoSheet = XLSX.utils.aoa_to_sheet(generalInfoData);
  XLSX.utils.book_append_sheet(wb, generalInfoSheet, 'Información General');

  // **Hoja 2: Actividades y Cálculos por Unidad**
  Object.entries(data.units).forEach(([unitName, unitData], index) => {
    // Tabla 1: Actividades de la Unidad
    const activitiesData = [
      ['CÓDIGO', 'SABERES', 'NOTA', 'FECHA', 'DESCRIPCIÓN'],
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
    const activitiesSheet = XLSX.utils.aoa_to_sheet(activitiesData);
    XLSX.utils.book_append_sheet(
      wb,
      activitiesSheet,
      `Unidad ${index + 1} - Actividades`
    );

    // Tabla 2: Cálculos de la Unidad
    const unitCalculations = data.calculations.units[unitName];
    const percentages = getPercentages(data.generalInfo.asignatura);

    const calcData = [
      ['CÓDIGO HACER', 'HACER', 'CÓDIGO SABER', 'SABER', 'CÓDIGO SER', 'SER'],
    ];

    // Añadir todas las valoraciones
    const maxRows = Math.max(
      unitCalculations.hacer.length,
      unitCalculations.saber.length,
      unitCalculations.ser.length
    );
    for (let i = 0; i < maxRows; i++) {
      const row = [
        unitCalculations.hacer[i]?.code || '',
        unitCalculations.hacer[i]?.note.toFixed(2) || '',
        unitCalculations.saber[i]?.code || '',
        unitCalculations.saber[i]?.note.toFixed(2) || '',
        unitCalculations.ser[i]?.code || '',
        unitCalculations.ser[i]?.note.toFixed(2) || '',
      ];
      calcData.push(row);
    }

    // Añadir filas de cálculos
    calcData.push([
      'PROMEDIOS',
      unitCalculations.promedio.hacer,
      '',
      unitCalculations.promedio.saber,
      '',
      unitCalculations.promedio.ser,
    ]);
    calcData.push([
      'PORCENTAJES',
      `${(percentages.hacer * 100).toFixed(0)}%`,
      '',
      `${(percentages.saber * 100).toFixed(0)}%`,
      '',
      `${(percentages.ser * 100).toFixed(0)}%`,
    ]);
    calcData.push([
      'CÁLCULOS',
      (unitCalculations.promedio.hacer * percentages.hacer).toFixed(2),
      '',
      (unitCalculations.promedio.saber * percentages.saber).toFixed(2),
      '',
      (unitCalculations.promedio.ser * percentages.ser).toFixed(2),
    ]);
    calcData.push([
      'SUMA TOTALES',
      unitCalculations.sumaTotales,
      '',
      '',
      '',
      '',
    ]);
    calcData.push([
      '70% SUMA TOTALES',
      unitCalculations.sumaTotales70,
      '',
      '',
      '',
      '',
    ]);

    const calcSheet = XLSX.utils.aoa_to_sheet(calcData);
    XLSX.utils.book_append_sheet(
      wb,
      calcSheet,
      `Unidad ${index + 1} - Cálculos`
    );
  });

  // **Hoja 3: Cálculos Generales**
  const generalCalculationsData = [
    ['Concepto', 'Valor'],
    ['Suma General Hacer', data.calculations.general.suma.hacer],
    ['Promedio General Hacer', data.calculations.general.promedio.hacer],
    ['Total General Hacer', data.calculations.general.total.hacer],
    ['Suma General Saber', data.calculations.general.suma.saber],
    ['Promedio General Saber', data.calculations.general.promedio.saber],
    ['Total General Saber', data.calculations.general.total.saber],
    ['Suma General Ser', data.calculations.general.suma.ser],
    ['Promedio General Ser', data.calculations.general.promedio.ser],
    ['Total General Ser', data.calculations.general.total.ser],
    ['Suma Totales Generales', data.calculations.general.sumaTotales],
    ['Suma Totales 70% Generales', data.calculations.general.sumaTotales70],
  ];
  const generalCalcSheet = XLSX.utils.aoa_to_sheet(generalCalculationsData);
  XLSX.utils.book_append_sheet(wb, generalCalcSheet, 'Cálculos Generales');

  // **Hoja 4: Valoraciones Adicionales (30%)**
  const additionalData = [
    ['Evaluación', 'Nota', 'Porcentaje', 'Valor'],
    ...data.additional.map((item) => [
      item.evaluation,
      item.note || 'N/A',
      item.percentage,
      item.value || 'N/A',
    ]),
  ];
  const additionalSheet = XLSX.utils.aoa_to_sheet(additionalData);
  XLSX.utils.book_append_sheet(wb, additionalSheet, 'Valoraciones Adicionales');

  // **Hoja 5: Resultados Finales**
  const resultsData = [
    ['Concepto', 'Valor'],
    ['Nota Final 70%', data.results.notaFinal70 || 'N/A'],
    ['Valoraciones Finales 30%', data.results.valoracionesFinales30 || 'N/A'],
    ['Nota Final Total', data.results.notaFinal || 'N/A'],
  ];
  const resultsSheet = XLSX.utils.aoa_to_sheet(resultsData);
  XLSX.utils.book_append_sheet(wb, resultsSheet, 'Resultados Finales');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(
    wb,
    `Valoraciones_${data.generalInfo.estudiante || 'Estudiante'}_${data.generalInfo.asignatura}.xlsx`
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
