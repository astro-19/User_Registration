import UserRegStepOne from "./Components/UserRegStepOne";
import UserRegStepTwo from "./Components/UserRegStepTwo";
import { Routes, Route } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./App.css";
import { useSelector } from "react-redux";
import { setPersonalDetails } from "./Store/Reducer/personalDetail";

function App() {
  const formData = useSelector(setPersonalDetails);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Sex", selector: (row) => row.sex, sortable: true },
    { name: "Mobile", selector: (row) => row.mobile, sortable: true },
    {
      name: "Govt. Id Type",
      selector: (row) => row.govtIdType,
      sortable: true,
    },
    { name: "Govt. Id", selector: (row) => row.govtId, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "Country", selector: (row) => row.country, sortable: true },
    { name: "Pincode", selector: (row) => row.pincode, sortable: true },
  ];

  let dataTable;
  dataTable = JSON.parse(window.localStorage.getItem("ReduxState_"));
  window.localStorage.setItem(
    "ReduxState_",
    JSON.stringify([formData.payload.personalDetails])
  );

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
      </div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}

export default App;
