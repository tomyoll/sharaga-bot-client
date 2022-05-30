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
import { accessTokenSelector, userSelector } from "../../store/RecoilState";
import api from "../../api";
import { VALIDATION_ERRORS } from "../../constants";

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
  const [password, setPassword] = useState({ password: "", repeat: "" });
  const [userName, setUserName] = useState("");
  const [isRegister, setRegister] = useState(false);
  const [, setToken] = useRecoilState(accessTokenSelector);
  const [, setUser] = useRecoilState(userSelector);
  const [hasError, setHasError] = useState({ error: false, message: "" });

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword({ password: e.target.value, repeat: password.repeat });
  };

  const onRepeatChange = (e) => {
    setPassword({ password: password.password, repeat: e.target.value });
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault;
    try {
      if (isRegister && password.password !== password.repeat) {
        throw { error: VALIDATION_ERRORS.WRONG_PASSWORDS };
      }

      const response = await api.post({
        path: !isRegister ? "/user/login" : "/user/register",
        data: {
          userName,
          password: password.password
        }
      });
      const { _id, accessToken, refreshToken, role } = response.user;
      setUser({ _id, role, userName: response.user.userName });
      setToken(accessToken);
      localStorage.setItem("refresh", refreshToken);

      return navigate("/");
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
              {!isRegister ? "Welcome! Enter in your account" : "Join us! Create your account"}
            </Typography>
            <Container className={classes.form}>
              <TextField
                variant={"outlined"}
                margin={"normal"}
                required
                fullWidth
                id={"username"}
                label={"Username"}
                name={"username"}
                autoComplete="username"
                autoFocus
                value={userName}
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
                onChange={onUserNameChange}
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
              {isRegister ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password.repeat}
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
                  onChange={onRepeatChange}
                />
              ) : null}
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
                  <Link
                    className={classes.link}
                    onClick={() => {
                      setRegister(!isRegister);
                    }}>
                    {!isRegister
                      ? "Don`t have an account? Registration"
                      : "Already have account? Log in"}
                  </Link>
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
