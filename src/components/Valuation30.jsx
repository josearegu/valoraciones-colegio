import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormHelperText,
} from '@chakra-ui/react';

function Valuation30({ data, dispatch }) {
  const validateNumeric = (value) => {
    if (value === '') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num >= 1 && num <= 5;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_ADDITIONAL',
      payload: { [name]: validateNumeric(value) ? value : data[name] || '' },
    });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        30%_Valoraciones
      </Text>
      <HStack mt={2} spacing={6}>
        <FormControl
          isInvalid={
            data.evaluationPeriodo15 &&
            !validateNumeric(data.evaluationPeriodo15)
          }
        >
          <FormLabel fontSize="sm">Evaluación Período (15%)</FormLabel>
          <Input
            name="evaluationPeriodo15"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={data.evaluationPeriodo15}
            onChange={handleChange}
            w="100px"
            placeholder="1-5"
          />
          <FormHelperText fontSize="xs" color="gray.500">
            Ingrese un valor entre 1 y 5
          </FormHelperText>
        </FormControl>
        <FormControl
          isInvalid={
            data.evaluationExterna10 &&
            !validateNumeric(data.evaluationExterna10)
          }
        >
          <FormLabel fontSize="sm">Evaluación Externa (10%)</FormLabel>
          <Input
            name="evaluationExterna10"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={data.evaluationExterna10}
            onChange={handleChange}
            w="100px"
            placeholder="1-5"
          />
          <FormHelperText fontSize="xs" color="gray.500">
            Ingrese un valor entre 1 y 5
          </FormHelperText>
        </FormControl>
        <FormControl
          isInvalid={
            data.autoevaluacion5 && !validateNumeric(data.autoevaluacion5)
          }
        >
          <FormLabel fontSize="sm">Autoevaluación (5%)</FormLabel>
          <Input
            name="autoevaluacion5"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={data.autoevaluacion5}
            onChange={handleChange}
            w="100px"
            placeholder="1-5"
          />
          <FormHelperText fontSize="xs" color="gray.500">
            Ingrese un valor entre 1 y 5
          </FormHelperText>
        </FormControl>
      </HStack>
    </Box>
  );
}

export default React.memo(Valuation30);
