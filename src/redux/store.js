import { createStore, combineReducers, applyMiddleware } from "redux";
import { getEmployeesList } from "./middlewares/crud";
import employeesReducer from "./reducers/employees";

const reducer = combineReducers({
  employeesReducer,
});

const store = createStore(reducer, applyMiddleware(getEmployeesList));

window.store = store;

export default store;
