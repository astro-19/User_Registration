import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Box, Autocomplete } from "@mui/material";
import { setPersonalDetails } from "../Store/Reducer/personalDetail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://restcountries.com/v3.1/name/";

const schema = Yup.object().shape({
  address: Yup.string().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().optional(),
  pincode: Yup.string().matches(/^\d+$/, "Invalid pincode"),
});

const AddressDetailsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(setPersonalDetails);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    dispatch(setPersonalDetails(data));
    window.localStorage.setItem(
      "ReduxState_",
      JSON.stringify([formData.payload.personalDetails])
    );
    navigate(-1);
  };

  const [query, setQuery] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const getCountryOptions = async () => {
      try {
        const response = await fetch(apiUrl + query);
        const countries = await response.json();
        setCountryOptions(countries);
      } catch (error) {
        alert("Error fetching country data:", error);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (query.trim() !== "") {
        getCountryOptions();
      } else {
        setCountryOptions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
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
              <>
                <TextField
                  label="State"
                  variant="outlined"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </>
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

          <Autocomplete
            options={countryOptions}
            name="country"
            control={control}
            getOptionLabel={(option) => option?.name?.common || "Unknown"}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type a country"
                variant="outlined"
              />
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default AddressDetailsForm;
