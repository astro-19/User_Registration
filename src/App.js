import UserRegStepOne from "./Components/UserRegStepOne";
import UserRegStepTwo from "./Components/UserRegStepTwo";
import { Routes, Route } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { Button } from "@mui/material";

function App() {
  // const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserRegStepOne />}></Route>
        <Route
          path="/user-registration-step-two"
          element={<UserRegStepTwo />}
        ></Route>
      </Routes>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          margin: "1rem 1rem",
        }}
      >
        <h1>Users List</h1>
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ height: "3rem" }}
          onClick={() => navigate("/user-registration-step-one")}
        >
          Register
        </Button> */}
      </div>
      <DataTable />
    </div>
  );
}

export default App;
