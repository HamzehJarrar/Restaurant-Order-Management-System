import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Card, Typography, TextField, Button, Alert,
  IconButton, InputAdornment, Divider,
} from "@mui/material";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { api } from "../api/axios";

const KitchenMark = ({ size = 44 }) => (
  <Box sx={{
    width: size, height: size, borderRadius: `${size * 0.3}px`, flexShrink: 0,
    background: "linear-gradient(140deg, #1e293b 0%, #0f172a 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 22 22" fill="none">
      <rect x="4"   y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      <rect x="6.2" y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      <rect x="8.4" y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      <rect x="5.5" y="9"  width="2.6" height="1.2" rx="0.6" fill="#f97316"/>
      <rect x="5.9" y="10" width="1.8" height="9"   rx="0.9" fill="#f97316"/>
      <path d="M13 2 C13 2 16 5 16 10 L16 11 L13 11 Z" fill="#fbbf24"/>
      <rect x="13" y="11" width="3" height="9" rx="1.5" fill="#f97316"/>
    </svg>
  </Box>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.data.accessToken);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
    }}>
      <Card sx={{
        width: "100%",
        maxWidth: 400,
        p: { xs: 3, sm: 4 },
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
      }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3.5 }}>
          <KitchenMark size={44} />
          <Typography sx={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#0d1117",
            lineHeight: 1,
          }}>
            easy
            <Box component="span" sx={{ color: "secondary.main" }}>pos</Box>
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
          Staff sign in
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your credentials to access the system
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoComplete="email"
            size="small"
          />
          <TextField
            label="Password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPw(v => !v)} edge="end">
                      {showPw
                        ? <VisibilityOffIcon fontSize="small" />
                        : <VisibilityIcon    fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}
            sx={{ mt: 1, py: 1.25, fontWeight: 700, fontSize: 15, borderRadius: "10px" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          First time setup?{" "}
          <Typography
            component={Link}
            to="/register"
            variant="body2"
            sx={{ color: "secondary.main", fontWeight: 600, textDecoration: "none",
              "&:hover": { textDecoration: "underline" } }}
          >
            Create admin account
          </Typography>
        </Typography>
      </Card>
    </Box>
  );
}
