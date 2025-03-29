// src/reducer.jsx

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_GENERAL_INFO': {
      return {
        ...state,
        generalInfo: {
          ...state.generalInfo,
          [action.field]: action.value,
        },
      };
    }
    case 'ADD_UNIT': {
      return {
        ...state,
        units: {
          ...state.units,
          [`Unidad ${Object.keys(state.units).length + 1}`]: {
            hacer: [],
            saber: [],
            ser: [],
            hacer_dates: [],
            saber_dates: [],
            ser_dates: [],
            hacer_notes: [],
            saber_notes: [],
            ser_notes: [],
          },
        },
      };
    }
    case 'REMOVE_UNIT': {
      const { [action.unitName]: _, ...remainingUnits } = state.units;
      return {
        ...state,
        units: remainingUnits,
      };
    }
    case 'ADD_ACTIVITY': {
      return {
        ...state,
        units: {
          ...state.units,
          [action.unitName]: {
            ...state.units[action.unitName],
            [action.saber]: [
              ...state.units[action.unitName][action.saber],
              {
                code: action.code,
                note: action.note,
                activity: action.activity,
              },
            ],
            [`${action.saber}_dates`]: [
              ...state.units[action.unitName][`${action.saber}_dates`],
              action.date,
            ],
            [`${action.saber}_notes`]: [
              ...state.units[action.unitName][`${action.saber}_notes`],
              action.note,
            ],
          },
        },
      };
    }
    case 'UPDATE_ADDITIONAL': {
      return {
        ...state,
        additional: {
          ...state.additional,
          [action.field]: action.value,
        },
      };
    }
    case 'RESET': {
      return {
        generalInfo: {
          periodo: '',
          grado: '',
          asignatura: '',
          docente: '',
          estudiante: '',
          estandarRelacionado: '',
        },
        units: {},
        additional: {
          evaluationPeriodo15: '',
          evaluationExterna10: '',
          autoevaluacion5: '',
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
