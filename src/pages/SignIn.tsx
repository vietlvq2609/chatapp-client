import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { unwrapResult } from "@reduxjs/toolkit";

import { loginThunk } from "../redux/appThunks";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Spinner from "../components/Spinner";
import { hideSpinner, showSpinner } from "../redux/siteConfigSlice";
import { isAxiosError } from "../utils/ApiHandler";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.siteConfig.loading);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const credentials = { username, password };

      dispatch(showSpinner());
      const resultAction = await dispatch(loginThunk(credentials));
      unwrapResult(resultAction);
      dispatch(hideSpinner());
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      dispatch(hideSpinner());
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login">
                    <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} variant="body2">
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} variant="body2">
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
