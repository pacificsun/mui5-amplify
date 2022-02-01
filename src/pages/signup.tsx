import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../context/AuthContext";
import { CognitoUser } from "@aws-amplify/auth";

interface IFormInput {
  Username: string;
  Email: string;
  Password: string;
  Code: string;
}

export default function Signup() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data::", data);

    try {
      if (showCode) {
        confirmSignUp(data);
      } else {
        signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      setSignUpError(err.message);
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function signUpWithEmailAndPassword(data: IFormInput): Promise<CognitoUser> {
    const { Username, Password, Email } = data;
    try {
      const { user } = await Auth.signUp({
        username: Username,
        password: Password,
        attributes: {
          email: Email,
          name: Username,
        },
      });
      console.log("amp user>", user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async function confirmSignUp(data: IFormInput) {
    const { Username, Code } = data;
    try {
      await Auth.confirmSignUp(Username, Code);
    } catch (err) {}
  }

  console.log("user>>", user);

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
            id="email"
            label="Email"
            type="email"
            error={errors?.Email?.message ? true : false}
            helperText={errors?.Email?.message ? errors.Email.message : null}
            {...register("Email", {
              required: { value: true, message: "Please enter a valid email" },
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
            Sign Up
          </Button>
        </Grid>
      </Grid>
      {showCode && (
        <Grid item>
          <TextField
            variant="outlined"
            id="code"
            label="Code"
            type="text"
            error={errors?.Code?.message ? true : false}
            helperText={errors?.Code?.message ? errors.Code.message : null}
            {...register("Code", {
              required: { value: true, message: "Please enter a Code" },
              minLength: {
                value: 6,
                message: "Enter a valid Code",
              },
              maxLength: {
                value: 6,
                message: "Enter a valid Code",
              },
            })}
          />
        </Grid>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {signUpError}
        </Alert>
      </Snackbar>
    </form>
  );
}
