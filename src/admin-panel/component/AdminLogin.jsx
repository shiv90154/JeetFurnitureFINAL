import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles'; // to access the theme object
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const AdminLogin = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const [adminName, setAdminName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminName === "Chauhan admin" && password === "chauhan@321") {
            localStorage.setItem("isAdminLoggedIn", "true");
            const redirectTo = location.state?.from?.pathname || "/AdminPanel";
            navigate(redirectTo, { replace: true });
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Box
            sx={{
                // minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: 420,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }}
            >
                <form onSubmit={handleLogin}>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{ textAlign: "center" }}
                    >
                        Admin Login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        required
                        margin="normal"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{
                            style: { color: '#fff' },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#fff",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#fff",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#fff",
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{
                            style: { color: '#fff' },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#fff",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#fff",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#fff",
                                },
                            },
                        }}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.primary.main,
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AdminLogin;
