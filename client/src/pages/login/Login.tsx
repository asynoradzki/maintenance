import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";
import { MainContainer } from "./Login.styles";
import { UserContext } from "../../context/UserContext";
import { SignInRequest } from "../../model/api/login/SignInRequest";
import { CLOSE_TIME, MIN_PASSWORD_LENGTH } from "../../constants/constants";
import { validateEmailRFC2822 } from "../../auth_helpers/authhelpers";
import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField } from "@mui/material";

const Login = () => {
    const { currentTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const [signInRequest, setSignInRequest] = useState<SignInRequest>({
        email: "",
        password: "",
    });

    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onLoginClicked = useCallback(async () => {
        try {
            const result = await AuthApi.signIn(signInRequest);
            login(result.data.access_token);
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            let message: string;

            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                message = "Incorrect email or password";
            } else {
                message = "An error occured when trying to connect to server";
            }
            toast.error(message, {
                position: "top-right",
                autoClose: CLOSE_TIME,
            });
        }
    }, [signInRequest, navigate, login]);

    useEffect(() => {
        setIsEmailValid(validateEmailRFC2822(signInRequest.email));
    }, [signInRequest.email]);

    useEffect(() => {
        setIsPasswordValid(signInRequest.password.length >= MIN_PASSWORD_LENGTH);
    }, [signInRequest.password]);

    return (
        <MainContainer>
            <Paper
                elevation={4}
                sx={{
                    width: "420px",
                    padding: "40px 0",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack
                    // marginTop={16}
                    width={360}
                    direction="column"
                    spacing={2}
                    alignItems="center"
                >
                    <TextField
                        fullWidth
                        label="email"
                        variant="outlined"
                        required
                        color="primary"
                        value={signInRequest.email}
                        error={!(isEmailValid || signInRequest.email.length === 0)}
                        onChange={(e) =>
                            setSignInRequest({
                                ...signInRequest,
                                email: e.currentTarget.value,
                            })
                        }
                    />
                    <TextField
                        fullWidth
                        label="password"
                        variant="outlined"
                        required
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        value={signInRequest.password}
                        error={!(isPasswordValid || signInRequest.password.length === 0)}
                        onChange={(e) =>
                            setSignInRequest({
                                ...signInRequest,
                                password: e.currentTarget.value,
                            })
                        }
                    />
                    <Box sx={{ width: "100%" }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            }
                            label="Show password"
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onLoginClicked}
                        disabled={!(isEmailValid && isPasswordValid)}
                        sx={{ width: "120px" }}
                    >
                        Sign In
                    </Button>
                </Stack>
            </Paper>
            {/* <div>Login {currentTheme}</div> */}
        </MainContainer>
    );
};

export default Login;
