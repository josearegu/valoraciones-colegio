import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const ASIGNATURAS = [
  'TECNOLOGIA_E_INFORMATICA',
  'CIENCIAS_NATURALES',
  'EDUCACION_ETICA_Y_EN_VALORES_HUMANOS',
  'CIENCIAS_SOCIALES',
  'HUMANIDADES_LENGUA_CASTELLANA_E_IDIOMAS_EXTRANJEROS',
  'MATEMATICAS',
  'EDUCACION_ARTISTICA',
  'EDUCACION_RELIGIOSA',
  'EDUCACION_FISICA_RECREACION_Y_DEPORTES',
];

function GeneralInfo({ data, dispatch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'grado') {
      const numValue = parseInt(value);
      if (
        value === '' ||
        (Number.isInteger(numValue) && numValue >= 1 && numValue <= 11)
      ) {
        dispatch({ type: 'UPDATE_GENERAL', payload: { [name]: value } });
      }
    } else if (name === 'estudiante' || name === 'docente') {
      if (value === '' || /^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
        dispatch({ type: 'UPDATE_GENERAL', payload: { [name]: value } });
      }
    } else {
      dispatch({ type: 'UPDATE_GENERAL', payload: { [name]: value } });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        {/* Fila: Periodo, Grado, Asignatura, Estudiante, Docente */}
        <HStack spacing={4}>
          <FormControl w="120px">
            <FormLabel>Período</FormLabel>
            <Select name="periodo" value={data.periodo} onChange={handleChange}>
              {['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO'].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl w="80px">
            <FormLabel>Grado</FormLabel>
            <Input
              name="grado"
              type="number"
              value={data.grado}
              onChange={handleChange}
              min={1}
              max={11}
              step={1}
              placeholder="1-11"
              maxLength={6}
            />
          </FormControl>
          <FormControl w="180px">
            <FormLabel>Asignatura</FormLabel>
            <Select
              name="asignatura"
              value={data.asignatura}
              onChange={handleChange}
            >
              {ASIGNATURAS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl flex={1}>
            <FormLabel>Estudiante</FormLabel>
            <Input
              name="estudiante"
              value={data.estudiante}
              onChange={handleChange}
              placeholder="Nombre del estudiante (solo letras)"
            />
          </FormControl>
          <FormControl flex={1}>
            <FormLabel>Docente</FormLabel>
            <Input
              name="docente"
              value={data.docente}
              onChange={handleChange}
              placeholder="[Nombre del Profesor/a]"
            />
          </FormControl>
        </HStack>
        {/* Nueva fila: ESTÁNDAR RELACIONADO */}
        <FormControl>
          <FormLabel color="blue.600" fontWeight="bold">
            ESTÁNDAR RELACIONADO
          </FormLabel>
          <Textarea
            name="estandarRelacionado"
            value={data.estandarRelacionado}
            onChange={handleChange}
            rows={2}
            resize="vertical"
            bg="blue.50"
            borderColor="blue.300"
            _hover={{ borderColor: 'blue.500' }}
          />
        </FormControl>
      </VStack>
    </Box>
  );
}

export default React.memo(GeneralInfo);
