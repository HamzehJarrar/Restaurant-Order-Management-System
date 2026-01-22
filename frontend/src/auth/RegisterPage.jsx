import {
    Button,
    TextField,
    Box,
    Typography,
    Paper,
    InputAdornment,
    Container,
    Stack
} from "@mui/material";
import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { Person, Email, Lock } from "@mui/icons-material";

const COLORS = {
    primary: "#FF5C33",
    bg: "#F8F9FA",
};

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "waiter",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                bgcolor: COLORS.bg,
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    }}
                >
                    <Typography variant="h4" fontWeight={800} textAlign="center">
                        Easy <span style={{ color: COLORS.primary }}>POS</span>
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        mb={4}
                    >
                        Create a new staff account
                    </Typography>

                    <form onSubmit={handleRegister}>
                        <Stack spacing={2.5}>
                            <TextField
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ color: COLORS.primary }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: COLORS.primary }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: COLORS.primary }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: 1,
                                    py: 1.4,
                                    borderRadius: 2,
                                    bgcolor: COLORS.primary,
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    "&:hover": {
                                        bgcolor: "#e54d2a",
                                    },
                                }}
                            >
                                Register Staff
                            </Button>
                        </Stack>
                    </form>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        mt={3}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: COLORS.primary,
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default RegisterPage;
