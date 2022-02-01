import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/router";
interface IFormInput {
  Username: string;

  Password: string;
}

export default function Login() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data::", data);

    try {
      loginUser(data);
    } catch (err) {
      setLoginError(err.message);
      setOpen(true);
    }
  };

  async function loginUser(data: IFormInput) {
    const { Username, Password } = data;
    try {
      await Auth.signIn(Username, Password);
      router.push("/");
    } catch (err) {
      throw err;
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        margin={10}
      >
        <Grid item>
          <TextField
            variant="outlined"
            id="username"
            label="Username"
            type="text"
            error={errors?.Username?.message ? true : false}
            helperText={errors?.Username?.message ? errors.Username.message : null}
            {...register("Username", {
              required: { value: true, message: "Please enter a username" },
              minLength: {
                value: 3,
                message: "Enter a valid Code",
              },
              maxLength: {
                value: 16,
                message: "Enter a valid Code",
              },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            error={errors?.Password?.message ? true : false}
            helperText={errors?.Password?.message ? errors.Password.message : null}
            {...register("Password", {
              required: { value: true, message: "Please enter a password" },
              minLength: {
                value: 8,
                message: "Please enter a password minimum length of 8",
              },
            })}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {loginError}
        </Alert>
      </Snackbar>
    </form>
  );
}
