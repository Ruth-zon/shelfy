import { produce } from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  employees: [],
  currentIndex: 0,
  length: 0,
  sumView: 100,
};

const peoplesFunctions = {
  setEmployees(state, action) {
    state.employees[action.payload.key] = action.payload.value;
  },
  setEmployeesProp(state, action) {
    state[action.payload.key] = action.payload.value;
  },
  setPayment(state, action) {
    if (action.payload.status === "one")
      state.employees[state.currentIndex][action.payload.list].payment_status =
        undefined;
    for (let i = 0; i < action.payload.list.length; i++) {
      if (action.payload.list[i])
        state.employees[state.currentIndex][i].payment_status =
          action.payload.status;
    }
  },
};

export default produce(
  (state, action) => createReducer(state, action, peoplesFunctions),
  initalStaste
);
