// src/utils/calculations.js

// Mapa de porcentajes por asignatura (basado en la tabla proporcionada)
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

// Función para obtener los porcentajes según la asignatura
const getPercentages = (asignatura) => {
  return (
    percentagesBySubject[asignatura] || { saber: 0.4, hacer: 0.4, ser: 0.2 }
  ); // Valores por defecto si la asignatura no está en el mapa
};

export function calculateValues(units, additional, asignatura) {
  const calculations = {
    units: {},
    general: {
      hacer: [],
      saber: [],
      ser: [],
      suma: { hacer: 0, saber: 0, ser: 0 },
      promedio: { hacer: 0, saber: 0, ser: 0 },
      total: { hacer: 0, saber: 0, ser: 0 },
      sumaTotales: 0,
      sumaTotales70: 0,
    },
  };

  // Obtener los porcentajes para la asignatura seleccionada
  const {
    saber: saberPercentage,
    hacer: hacerPercentage,
    ser: serPercentage,
  } = getPercentages(asignatura);

  // Calcular por unidad
  Object.entries(units).forEach(([unitName, unit]) => {
    const hacer = unit.hacer.map((item) => ({
      code: item.code,
      note: item.note ? parseFloat(item.note) : 0,
    }));
    const saber = unit.saber.map((item) => ({
      code: item.code,
      note: item.note ? parseFloat(item.note) : 0,
    }));
    const ser = unit.ser.map((item) => ({
      code: item.code,
      note: item.note ? parseFloat(item.note) : 0,
    }));

    const sumaHacer = hacer.reduce((sum, item) => sum + item.note, 0);
    const sumaSaber = saber.reduce((sum, item) => sum + item.note, 0);
    const sumaSer = ser.reduce((sum, item) => sum + item.note, 0);

    const promedioHacer =
      hacer.length > 0 ? (sumaHacer / hacer.length).toFixed(2) : '0.00';
    const promedioSaber =
      saber.length > 0 ? (sumaSaber / saber.length).toFixed(2) : '0.00';
    const promedioSer =
      ser.length > 0 ? (sumaSer / ser.length).toFixed(2) : '0.00';

    // Usar los porcentajes dinámicos
    const totalHacer = (promedioHacer * hacerPercentage).toFixed(2);
    const totalSaber = (promedioSaber * saberPercentage).toFixed(2);
    const totalSer = (promedioSer * serPercentage).toFixed(2);

    const sumaTotales = (
      parseFloat(totalHacer) +
      parseFloat(totalSaber) +
      parseFloat(totalSer)
    ).toFixed(2);
    const sumaTotales70 = (sumaTotales * 0.7).toFixed(2);

    calculations.units[unitName] = {
      hacer,
      saber,
      ser,
      suma: {
        hacer: sumaHacer.toFixed(2),
        saber: sumaSaber.toFixed(2),
        ser: sumaSer.toFixed(2),
      },
      promedio: {
        hacer: promedioHacer,
        saber: promedioSaber,
        ser: promedioSer,
      },
      total: {
        hacer: totalHacer,
        saber: totalSaber,
        ser: totalSer,
      },
      sumaTotales,
      sumaTotales70,
    };

    calculations.general.hacer.push(...hacer);
    calculations.general.saber.push(...saber);
    calculations.general.ser.push(...ser);
  });

  // Calcular generales
  const generalHacerSum = calculations.general.hacer.reduce(
    (sum, item) => sum + item.note,
    0
  );
  const generalSaberSum = calculations.general.saber.reduce(
    (sum, item) => sum + item.note,
    0
  );
  const generalSerSum = calculations.general.ser.reduce(
    (sum, item) => sum + item.note,
    0
  );

  const generalHacerAvg =
    calculations.general.hacer.length > 0
      ? (generalHacerSum / calculations.general.hacer.length).toFixed(2)
      : '0.00';
  const generalSaberAvg =
    calculations.general.saber.length > 0
      ? (generalSaberSum / calculations.general.saber.length).toFixed(2)
      : '0.00';
  const generalSerAvg =
    calculations.general.ser.length > 0
      ? (generalSerSum / calculations.general.ser.length).toFixed(2)
      : '0.00';

  // Usar los porcentajes dinámicos para los cálculos generales
  const generalHacerTotal = (generalHacerAvg * hacerPercentage).toFixed(2);
  const generalSaberTotal = (generalSaberAvg * saberPercentage).toFixed(2);
  const generalSerTotal = (generalSerAvg * serPercentage).toFixed(2);

  const generalSumaTotales = (
    parseFloat(generalHacerTotal) +
    parseFloat(generalSaberTotal) +
    parseFloat(generalSerTotal)
  ).toFixed(2);
  const generalSumaTotales70 = (generalSumaTotales * 0.7).toFixed(2);

  calculations.general.suma = {
    hacer: generalHacerSum.toFixed(2),
    saber: generalSaberSum.toFixed(2),
    ser: generalSerSum.toFixed(2),
  };
  calculations.general.promedio = {
    hacer: generalHacerAvg,
    saber: generalSaberAvg,
    ser: generalSerAvg,
  };
  calculations.general.total = {
    hacer: generalHacerTotal,
    saber: generalSaberTotal,
    ser: generalSerTotal,
  };
  calculations.general.sumaTotales = generalSumaTotales;
  calculations.general.sumaTotales70 = generalSumaTotales70;

  // Calcular valoraciones adicionales (30%)
  const evaluationPeriodo15 = additional.evaluationPeriodo15
    ? (parseFloat(additional.evaluationPeriodo15) * 0.15).toFixed(2)
    : '0.00';
  const evaluationExterna10 = additional.evaluationExterna10
    ? (parseFloat(additional.evaluationExterna10) * 0.1).toFixed(2)
    : '0.00';
  const autoevaluacion5 = additional.autoevaluacion5
    ? (parseFloat(additional.autoevaluacion5) * 0.05).toFixed(2)
    : '0.00';

  const notaFinal30 = (
    parseFloat(evaluationPeriodo15) +
    parseFloat(evaluationExterna10) +
    parseFloat(autoevaluacion5)
  ).toFixed(2);
  const notaFinal70 = parseFloat(generalSumaTotales70).toFixed(2);
  const total = (parseFloat(notaFinal70) + parseFloat(notaFinal30)).toFixed(2);

  return {
    calculations,
    results: {
      notaFinal70,
      notaFinal30,
      total,
    },
  };
}
