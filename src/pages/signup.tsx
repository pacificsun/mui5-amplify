import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";

interface IFormInput {
  Username: string;
  Email: string;
  Password: string;
}

export default function Signup() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data::", data);
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
                message: "Please enter a username between 3-16 character",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 character",
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
    </form>
  );
}
