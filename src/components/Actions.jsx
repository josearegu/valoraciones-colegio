// src/components/Actions.jsx

import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { calculateValues } from '../utils/calculations'; // Importamos calculateValues para los cálculos
import { generatePDF } from '../utils/pdfGenerator'; // Para exportar a PDF
import { exportToExcel } from '../utils/excelExporter'; // Para exportar a Excel

function Actions({ state, results, dispatch }) {
  // Función para reiniciar el estado
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  // Función para exportar a PDF
  const handleExportPDF = () => {
    // Validar que haya datos antes de exportar
    if (!state.generalInfo || !state.units || !state.additional) {
      alert('Por favor completa todos los datos antes de exportar a PDF.');
      return;
    }

    // Usar calculateValues para obtener los cálculos completos
    const { calculations } = calculateValues(
      state.units,
      state.additional,
      state.generalInfo.asignatura
    );

    // Preparar valoraciones adicionales
    const additionalData = [
      {
        evaluation: 'Evaluación Período',
        note: state.additional.evaluationPeriodo15 || '',
        percentage: '15%',
        value: state.additional.evaluationPeriodo15
          ? (parseFloat(state.additional.evaluationPeriodo15) * 0.15).toFixed(2)
          : '',
      },
      {
        evaluation: 'Evaluación Externa',
        note: state.additional.evaluationExterna10 || '',
        percentage: '10%',
        value: state.additional.evaluationExterna10
          ? (parseFloat(state.additional.evaluationExterna10) * 0.1).toFixed(2)
          : '',
      },
      {
        evaluation: 'Autoevaluación',
        note: state.additional.autoevaluacion5 || '',
        percentage: '5%',
        value: state.additional.autoevaluacion5
          ? (parseFloat(state.additional.autoevaluacion5) * 0.05).toFixed(2)
          : '',
      },
    ];

    // Preparar datos para el PDF
    const data = {
      generalInfo: state.generalInfo,
      units: state.units,
      calculations, // Incluimos los cálculos completos por unidad y generales
      additional: additionalData,
      results: {
        notaFinal70: results.notaFinal70 || '',
        valoracionesFinales30: results.notaFinal30 || '',
        notaFinal: results.total || '',
      },
    };

    generatePDF(data);
  };

  // Función para exportar a Excel
  const handleExportExcel = () => {
    // Validar que haya datos antes de exportar
    if (!state.generalInfo || !state.units || !state.additional) {
      alert('Por favor completa todos los datos antes de exportar a Excel.');
      return;
    }

    // Usar calculateValues para obtener los cálculos completos
    const { calculations } = calculateValues(
      state.units,
      state.additional,
      state.generalInfo.asignatura
    );

    // Preparar valoraciones adicionales
    const additionalData = [
      {
        evaluation: 'Evaluación Período',
        note: state.additional.evaluationPeriodo15 || '',
        percentage: '15%',
        value: state.additional.evaluationPeriodo15
          ? (parseFloat(state.additional.evaluationPeriodo15) * 0.15).toFixed(2)
          : '',
      },
      {
        evaluation: 'Evaluación Externa',
        note: state.additional.evaluationExterna10 || '',
        percentage: '10%',
        value: state.additional.evaluationExterna10
          ? (parseFloat(state.additional.evaluationExterna10) * 0.1).toFixed(2)
          : '',
      },
      {
        evaluation: 'Autoevaluación',
        note: state.additional.autoevaluacion5 || '',
        percentage: '5%',
        value: state.additional.autoevaluacion5
          ? (parseFloat(state.additional.autoevaluacion5) * 0.05).toFixed(2)
          : '',
      },
    ];

    // Preparar datos para Excel
    const data = {
      generalInfo: state.generalInfo,
      units: state.units,
      calculations, // Incluimos los cálculos completos por unidad y generales
      additional: additionalData,
      results: {
        notaFinal70: results.notaFinal70 || '',
        valoracionesFinales30: results.notaFinal30 || '',
        notaFinal: results.total || '',
      },
    };

    exportToExcel(data);
  };

  return (
    <HStack spacing={4} justify="center">
      <Button colorScheme="red" onClick={handleReset}>
        Reiniciar
      </Button>
      <Button colorScheme="blue" onClick={handleExportPDF}>
        Exportar a PDF
      </Button>
      <Button colorScheme="green" onClick={handleExportExcel}>
        Exportar a Excel
      </Button>
    </HStack>
  );
}

export default Actions;
