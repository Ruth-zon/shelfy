import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Pagination,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { actions } from "../redux/actions";
import { useHistory } from "react-router-dom";

function EmployeesTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { employees, currentIndex, length, sumView } = useSelector(
    (state) => state.employeesReducer
  );
  const [sortBy, setSortBy] = useState();
  const [dist, setDist] = useState(false);
  const sortedEmployees = Object.assign([], employees[currentIndex]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeesToCancel, setEmployeesToCancel] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const selectAllCheckboxRef = useRef();

  useEffect(() => {
    dispatch(actions.getEmployeesList(0));
  }, [dispatch]);

  const handleSortBy = (header) => {
    if (header === " ") return;
    if (sortBy === header) {
      if (dist) {
        setSortBy();
        setDist(false);
      } else setDist(true);
    } else {
      setDist(false);
      setSortBy(header);
    }
  };
  const selectAll = (e) => {
    let tempArray = [];
    let tempSum = sumView;
    while (tempSum--) tempArray.push(e.target.checked);
    setSelectedEmployees(tempArray);
  };
  const selectOne = (id) => {
    if (selectAllCheckboxRef.current.checked)
      selectAllCheckboxRef.current.checked = false;
    let tempArray = [...selectedEmployees];
    tempArray[id] = !tempArray[id];
    setSelectedEmployees(tempArray);
  };
  const handlePayment = (status) => {
    selectAllCheckboxRef.current.checked = false;
    dispatch(
      actions.setPayment({
        status,
        list: status ? selectedEmployees : employeesToCancel,
      })
    );
    if (status) {
      setEmployeesToCancel(selectedEmployees);
      setSelectedEmployees([]);
      setShowAlert(true);
    } else {
      setEmployeesToCancel([]);
      setShowAlert(false);
    }
  };
  const titles = [
    " ",
    "id",
    "first_name",
    "last_name",
    "birthdate",
    "gender",
    "salary",
    "payment_status",
  ];
  return (
    <Container>
      <div className="text-end position-sticky top-0 mt-5">
        {selectedEmployees.filter((selected) => selected === true).length >
          0 && (
          <Button className="w-25" onClick={() => handlePayment(true)}>
            Pay for{" "}
            {selectedEmployees.filter((selected) => selected === true).length}
          </Button>
        )}
      </div>
      <h1>Employees List</h1>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            {titles.map((header, key) => {
              if (header === " ")
                return (
                  <th key={key}>
                    <Form.Check
                      key={key}
                      type="checkbox"
                      onClick={selectAll}
                      ref={selectAllCheckboxRef}
                    />
                  </th>
                );
              else
                return (
                  <th key={key} onClick={() => handleSortBy(header)}>
                    {header[0].toUpperCase() +
                      header.slice(1).replace("_", " ")}
                    {header === sortBy &&
                      (dist ? <RiArrowUpSLine /> : <RiArrowDownSLine />)}
                  </th>
                );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedEmployees
            ?.sort((x, y) =>
              !dist
                ? x[sortBy] < y[sortBy]
                  ? -1
                  : 1
                : x[sortBy] > y[sortBy]
                ? -1
                : 1
            )
            .map((employee, id) => (
              <tr key={id}>
                {titles.map((title, key) => {
                  if (title === " ")
                    return (
                      <td key={key}>
                        <Form.Check
                          //   disabled={employee.payment_status}
                          checked={selectedEmployees[id]}
                          key={key}
                          type="checkbox"
                          onChange={() => selectOne(id)}
                        />
                      </td>
                    );
                  else
                    return (
                      <td
                        key={key}
                        onClick={() => history.push(`/employee/${employee.id}`)}
                      >
                        {title !== "payment_status"
                          ? employee[title]
                          : employee[title] === true
                          ? "complete"
                          : "not complete"}
                      </td>
                    );
                })}
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {[...Array(length / sumView)].map((item, key) => (
          <Pagination.Item
            key={key}
            active={key === currentIndex}
            onClick={() => dispatch(actions.getEmployeesList(key))}
          >
            {key + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {showAlert && (
        <Alert
          className="position-fixed bottom-0"
          variant="primary"
          dismissible
          onClose={() => setShowAlert(false)}
        >
          Payment was successful.{" "}
          <span
            className="text-decoration-underline pointer"
            onClick={() => handlePayment()}
          >
            cancel
          </span>
        </Alert>
      )}
    </Container>
  );
}

export default EmployeesTable;
