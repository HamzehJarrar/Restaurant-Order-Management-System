import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      const token = res.data.accessToken;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }

  };

  return (
    <Box width={400} mx="auto" mt={10}>
      <Typography variant="h4" mb={2}>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
