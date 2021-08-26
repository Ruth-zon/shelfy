import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { actions } from "../redux/actions";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

function EmployeeDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentIndex, employees, length } = useSelector(
    (state) => state.employeesReducer
  );
  const employee = employees[currentIndex]?.find(
    (emp) => emp.id === parseInt(id)
  );

  useEffect(() => {
    let index = Math.floor(id / 100);
    if (!employees[index]) dispatch(actions.getEmployeesList(index));
    dispatch(actions.setEmployeesProp({ key: "currentIndex", value: index }));
  }, [dispatch, employees, currentIndex, id, employee]);

  if (!employees[currentIndex])
    return <Spinner animation="border" variant="primary" className="m-auto" />;
  else if (!employee) return <h1 className="text-center m-5">Employee Not Found</h1>
  else
    return (
      <Container className="p-5 text-center">
        <div onClick={() => history.push("/")} className="text-start pointer">
          <AiOutlineArrowLeft />
          Back to list
        </div>
        <div className="border border-info m-auto shadow-lg w-50">
          <h1>{`${employee.first_name} ${employee.last_name}`}</h1>
          <h3>{employee.email}</h3>
          <h6> ({employee.gender})</h6>
          <h6>{employee.birthdate}</h6>
          <h1 className="text-info m-3">{employee.salary}</h1>
          <h5>
            payment status:{" "}
            {employee.payment_status ? "sucssess  " : "not complete"}
            {employee.payment_status && (
              <span
                className="text-decoration-underline pointer text-primary"
                onClick={() =>
                  dispatch(
                    actions.setPayment({
                      list: employee.id % 100,
                      status: "one",
                    })
                  )
                }
              >
                cancel pay
              </span>
            )}
          </h5>
        </div>
        <div className="bottom-0 position-absolute w-75 d-flex justify-content-between mb-5 fw-bold p-4">
          {id !== "1" && (
            <span
              onClick={() => history.push(`/employee/${id - 1}`)}
              className="pointer text-info"
            >
              <AiOutlineArrowLeft />
              Previos Employee
            </span>
          )}
          {parseInt(id) !== length && (
            <span
              onClick={() => history.push(`/employee/${parseInt(id) + 1}`)}
              className="pointer text-info"
            >
              Next Employee
              <AiOutlineArrowRight />
            </span>
          )}
        </div>
      </Container>
    );
}

export default EmployeeDetails;
