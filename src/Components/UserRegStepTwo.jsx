import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const schema = Yup.object().shape({
  address: Yup.string().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().optional(),
  pincode: Yup.string().matches(/^\d+$/, "Invalid pincode"),
});

const AddressDetailsForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
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
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Address"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="State"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="City"
                type="tel"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Country"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="pincode"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Pincode"
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
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default AddressDetailsForm;
