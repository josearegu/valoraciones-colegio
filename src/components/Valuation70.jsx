import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Valuation70({ units, dispatch }) {
  const [unitCount, setUnitCount] = useState(Object.keys(units).length);

  const addUnit = () => {
    const newUnitName = `Unidad ${unitCount + 1}`;
    const newUnits = {
      ...units,
      [newUnitName]: {
        hacer: [
          { code: `U${unitCount + 1}HA1`, note: '', date: '', activity: '' },
        ],
        saber: [
          { code: `U${unitCount + 1}SA1`, note: '', date: '', activity: '' },
        ],
        ser: [
          { code: `U${unitCount + 1}SE1`, note: '', date: '', activity: '' },
        ],
      },
    };
    setUnitCount(unitCount + 1);
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const removeUnit = (unitName) => {
    const newUnits = { ...units };
    delete newUnits[unitName];
    setUnitCount(unitCount - 1);
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const addValuation = (unitName, type) => {
    const newUnits = { ...units };
    const count = newUnits[unitName][type].length + 1;
    const unitNumber = unitName.match(/\d+/)?.[0] || unitCount;
    const codePrefix = `U${unitNumber}${type.toUpperCase().slice(0, 2)}`;
    newUnits[unitName][type].push({
      code: `${codePrefix}${count}`,
      note: '',
      date: '',
      activity: '',
    });
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const removeValuation = (unitName, type, index) => {
    const newUnits = { ...units };
    newUnits[unitName][type].splice(index, 1);
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const handleUnitNameChange = (oldUnitName, newUnitName) => {
    if (newUnitName.length > 200 || !/^[A-Za-zÀ-ÿ\s\d]*$/.test(newUnitName))
      return;
    const newUnits = { ...units };
    const unitData = newUnits[oldUnitName];
    delete newUnits[oldUnitName];
    const finalUnitName = newUnitName || `Unidad ${unitCount}`;
    newUnits[finalUnitName] = unitData;
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const handleChange = (unitName, type, index, field, value) => {
    const newUnits = { ...units };
    if (field === 'note') {
      if (
        value === '' ||
        (/^\d*\.?\d*$/.test(value) &&
          parseFloat(value) >= 1 &&
          parseFloat(value) <= 5)
      ) {
        newUnits[unitName][type][index][field] = value;
      }
    } else {
      newUnits[unitName][type][index][field] = value;
    }
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const handleDateChange = (unitName, type, index, date) => {
    const newUnits = { ...units };
    const formattedDate = date ? date.toLocaleDateString('es-ES') : '';
    newUnits[unitName][type][index].date = formattedDate;
    dispatch({ type: 'UPDATE_UNITS', payload: newUnits });
  };

  const parseDateSafely = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? null : date;
  };

  const saberStyles = {
    hacer: {
      labelColor: 'green.600',
      bg: 'green.50',
      borderColor: 'green.300',
      hoverBorderColor: 'green.500',
    },
    saber: {
      labelColor: 'purple.600',
      bg: 'purple.50',
      borderColor: 'purple.300',
      hoverBorderColor: 'purple.500',
    },
    ser: {
      labelColor: 'orange.600',
      bg: 'orange.50',
      borderColor: 'orange.300',
      hoverBorderColor: 'orange.500',
    },
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Text fontWeight="bold" mb={4}>
        70%_Valoraciones
      </Text>
      {Object.entries(units).map(([unitName, data], unitIndex) => (
        <Box key={`unit-${unitIndex}`} mb={6}>
          <HStack mb={4} align="center">
            <FormControl>
              <FormLabel color="teal.600" fontWeight="bold">
                Unidad {unitIndex + 1}
              </FormLabel>
              <Input
                value={unitName}
                onChange={(e) => handleUnitNameChange(unitName, e.target.value)}
                maxLength={200}
                bg="teal.50"
                borderColor="teal.300"
                _hover={{ borderColor: 'teal.500' }}
                placeholder={`Unidad ${unitIndex + 1}`}
              />
            </FormControl>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => removeUnit(unitName)}
              isDisabled={unitCount === 1}
            />
          </HStack>
          <HStack spacing={4} align="start">
            {['hacer', 'saber', 'ser'].map((type) => (
              <Box key={type} flex={1}>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th
                        colSpan={2}
                        textAlign="center"
                        color={saberStyles[type].labelColor}
                      >
                        {type.toUpperCase()}
                      </Th>
                    </Tr>
                    <Tr>
                      <Th>NOTA</Th>
                      <Th>FECHA</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data[type].map((val, index) => (
                      <React.Fragment key={val.code}>
                        <Tr>
                          <Td>
                            <Text fontSize="sm">{val.code}</Text>
                            <Input
                              type="number"
                              min={1}
                              max={5}
                              step={0.1}
                              value={val.note}
                              onChange={(e) =>
                                handleChange(
                                  unitName,
                                  type,
                                  index,
                                  'note',
                                  e.target.value
                                )
                              }
                              placeholder="1-5"
                              size="sm"
                              w="60px"
                              bg={saberStyles[type].bg}
                              borderColor={saberStyles[type].borderColor}
                              _hover={{
                                borderColor: saberStyles[type].hoverBorderColor,
                              }}
                            />
                          </Td>
                          <Td>
                            <DatePicker
                              selected={parseDateSafely(val.date)}
                              onChange={(date) =>
                                handleDateChange(unitName, type, index, date)
                              }
                              dateFormat="dd/MM/yyyy"
                              placeholderText="dd/mm/aaaa"
                              customInput={
                                <Input
                                  size="sm"
                                  bg={saberStyles[type].bg}
                                  borderColor={saberStyles[type].borderColor}
                                  _hover={{
                                    borderColor:
                                      saberStyles[type].hoverBorderColor,
                                  }}
                                />
                              }
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td colSpan={2}>
                            <Textarea
                              value={val.activity}
                              onChange={(e) =>
                                handleChange(
                                  unitName,
                                  type,
                                  index,
                                  'activity',
                                  e.target.value
                                )
                              }
                              placeholder="Descripción de la actividad"
                              rows={2}
                              resize="none"
                              bg={saberStyles[type].bg}
                              borderColor={saberStyles[type].borderColor}
                              _hover={{
                                borderColor: saberStyles[type].hoverBorderColor,
                              }}
                            />
                          </Td>
                        </Tr>
                      </React.Fragment>
                    ))}
                  </Tbody>
                </Table>
                <HStack mt={2} justify="flex-end">
                  <IconButton
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => addValuation(unitName, type)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() =>
                      removeValuation(unitName, type, data[type].length - 1)
                    }
                    isDisabled={data[type].length === 1}
                  />
                </HStack>
              </Box>
            ))}
          </HStack>
        </Box>
      ))}
      <Button mt={4} leftIcon={<AddIcon />} onClick={addUnit}>
        Agregar Unidad
      </Button>
    </Box>
  );
}

export default Valuation70;
