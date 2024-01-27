import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive integer"),
  sex: Yup.string()
    .required("Sex is required")
    .oneOf(["Male", "Female"], "Invalid sex"),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
  govtIdType: Yup.string().oneOf(["Aadhar", "PAN"], "Invalid ID type"),
  govtId: Yup.string()
    .when("govtIdType", {
      is: "Aadhar",
      then: Yup.string().matches(/^[2-9]\d{11}$/, "Invalid Aadhar number"),
    })
    .when("govtIdType", {
      is: "PAN",
      then: Yup.string().matches(/^[A-Za-z0-9]{10}$/, "Invalid PAN number"),
    }),
});

const PersonalDetailsForm = ({ onNext }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Registration - Step 1</h1>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Name"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Age"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="sex"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl variant="outlined">
                <InputLabel htmlFor="sex">Sex</InputLabel>
                <Select
                  {...field}
                  label="Sex"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ width: "25ch", marginTop: "1ch" }}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="mobile"
                type="tel"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="govtIdType"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl variant="outlined">
                <InputLabel>Govt ID Type</InputLabel>
                <Select
                  {...field}
                  label="Govt ID Type"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ width: "25ch", marginTop: "1ch" }}
                >
                  <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                  <MenuItem value={"PAN"}>PAN</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="govtId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="govtId"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </Box>
    </>
  );
};

export default PersonalDetailsForm;
