import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import theme from "../theme";

const NotFound = () => {
  return (
    <Stack
      sx={{
        textAlign: "center",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          color: theme.palette.error.main,
        }}
      >
        404 - Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
        }}
      >
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 4 }}
      >
        Go to Home
      </Button>
    </Stack>
  );
};

export default NotFound;
