import React, { useState, useEffect, useReducer } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import GeneralInfo from './components/GeneralInfo.jsx';
import Valuation70 from './components/Valuation70.jsx';
import Valuation30 from './components/Valuation30.jsx';
import Results from './components/Results.jsx';
import Actions from './components/Actions.jsx';
import { calculateValues } from './utils/calculations';

const initialState = {
  generalInfo: {
    periodo: 'PRIMERO',
    grado: '',
    asignatura: 'MATEMÁTICAS',
    docente: 'JOSÉ LUÍS ARÉVALO GUANCHA',
    estudiante: '',
    estandarRelacionado: '', // Nuevo campo para "ESTÁNDAR RELACIONADO"
  },
  units: {
    '': {
      hacer: [{ code: 'U1HA1', note: '', date: '', activity: '' }],
      saber: [{ code: 'U1SA1', note: '', date: '', activity: '' }],
      ser: [{ code: 'U1SE1', note: '', date: '', activity: '' }],
    },
  },
  additional: {
    evaluationPeriodo15: '',
    evaluationExterna10: '',
    autoevaluacion5: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_GENERAL':
      return {
        ...state,
        generalInfo: { ...state.generalInfo, ...action.payload },
      };
    case 'UPDATE_UNITS':
      return { ...state, units: { ...action.payload } };
    case 'UPDATE_ADDITIONAL':
      return {
        ...state,
        additional: { ...state.additional, ...action.payload },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [results, setResults] = useState({
    notaFinal70: '',
    notaFinal30: '',
    total: '',
  });

  console.log('Estado actual de units:', JSON.stringify(state.units, null, 2));

  useEffect(() => {
    const calculated = calculateValues(
      state.units,
      state.additional,
      state.generalInfo.asignatura // Aseguramos que se pase la asignatura
    );
    setResults(calculated.results); // Ajustamos para tomar solo los resultados
  }, [state]);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ChakraProvider>
      <Box minH="100vh" w="100vw" p={6} bg="gray.50">
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg">
            COLEGIO NUESTRA SEÑORA DE LAS LAJAS
          </Heading>
          <HStack justify="center" spacing={4}>
            <Text fontSize="md" fontWeight="bold">
              VALORACIONES 2025
            </Text>
            <Text fontSize="md" color="gray.500">
              {currentDate}
            </Text>
          </HStack>
          <GeneralInfo data={state.generalInfo} dispatch={dispatch} />
          <Valuation70 units={state.units} dispatch={dispatch} />
          <Valuation30 data={state.additional} dispatch={dispatch} />
          <Results results={results} />
          <Actions state={state} results={results} dispatch={dispatch} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
