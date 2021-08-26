import { actions } from "../actions";
import file from "../../data/MOCK_DATA.json";

export const getEmployeesList =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_EMPLOYEES_LIST") {
      let index = action.payload || getState().employeesReducer.currentIndex;
      dispatch(actions.setEmployeesProp({ key: "currentIndex", value: index }));
      if (!getState().employeesReducer.employees[index]) {
        if (!getState().employeesReducer.employees.length)
          dispatch(
            actions.setEmployeesProp({ key: "length", value: file.length })
          );
        dispatch(
          actions.setEmployees({
            key: index,
            value: file.slice(index * 100, (index + 1) * 100),
          })
        );
      }
    }
    return next(action);
  };
