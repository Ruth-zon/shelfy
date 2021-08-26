import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./redux/store";
import EmployeesTable from "./components/employeesTable";
import EmployeeDetails from "./components/employeeDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/employee/:id" component={EmployeeDetails} />
          <Route path="/" component={EmployeesTable} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
