/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  createTheme,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
  Container,
  Collapse
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import api from "../../api";
import { adminSelector } from "../../store/RecoilState";

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center"
  },
  paperContainer: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    minWidth: 400
  },
  paper: {
    margin: theme.spacing(8, 4),
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    cursor: "pointer"
  }
});

export default function Auth() {
  const classes = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();
  const [admin, setAdmin] = useRecoilState(adminSelector);
  const [password, setPassword] = useState({ password: "", repeat: "" });
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState({ error: false, message: "" });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword({ password: e.target.value, repeat: password.repeat });
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault;
    try {
      const response = await api.post({
        path: "/admin/signIn",
        data: {
          email,
          password: password.password
        }
      });

      localStorage.setItem('token', response.admin.token)

      setAdmin(response.admin)
      return navigate("/users");
    } catch (e) {
      console.log(e);
      return setHasError({ error: true, message: e.error });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component={"main"} className={classes.root}>
        <div className={classes.paperContainer}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component={"h1"} variant={"h5"}>
              Enter in your account
            </Typography>
            <Container className={classes.form}>
              <TextField
                variant={"outlined"}
                margin={"normal"}
                required
                fullWidth
                id={"email"}
                label={"Email"}
                name={"email"}
                autoComplete="email"
                autoFocus
                value={email}
                inputProps={{
                  sx: {
                    color: "rgba(207, 201, 192, 0.87)"
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "rgba(207, 201, 192, 0.87)"
                  }
                }}
                onChange={onEmailChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.password}
                inputProps={{
                  sx: {
                    color: "rgba(207, 201, 192, 0.87)"
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "rgba(207, 201, 192, 0.87)"
                  }
                }}
                onChange={onPasswordChange}
              />
              <Button
                type={"submit"}
                fullWidth
                variant={"contained"}
                color={"primary"}
                className={classes.submit}
                onClick={async (event) => {
                  await onSignInSubmit(event);
                }}>
                Enter
              </Button>
              <Grid style={{ marginTop: 20 }} container>
                <Grid item xs>
                  {hasError.error ? (
                    <Collapse in={hasError.error}>
                      <Alert
                        onClose={() => setHasError({ error: false })}
                        sx={{ mt: 4 }}
                        variant="outlined"
                        severity="error">
                        {hasError.message}
                      </Alert>
                    </Collapse>
                  ) : null}
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
