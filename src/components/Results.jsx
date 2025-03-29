import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';

function Results({ results }) {
  const formatNumber = (value) => {
    return value && !isNaN(parseFloat(value))
      ? parseFloat(value).toFixed(2)
      : 'N/A';
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        Resultados
      </Text>
      <HStack mt={2} spacing={6}>
        <Text color={results.notaFinal70 ? 'black' : 'red.500'}>
          70% Nota Final: {formatNumber(results.notaFinal70)}
        </Text>
        <Text color={results.notaFinal30 ? 'black' : 'red.500'}>
          30% Valoraciones Finales: {formatNumber(results.notaFinal30)}
        </Text>
        <Text fontWeight="bold" color={results.total ? 'black' : 'red.500'}>
          Nota Final: {formatNumber(results.total)}
        </Text>
      </HStack>
    </Box>
  );
}

export default React.memo(Results);
