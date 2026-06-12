import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Card, Typography, TextField, Button, Alert,
  IconButton, InputAdornment, Divider,
} from "@mui/material";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon     from "@mui/icons-material/PersonAdd";
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

const isAdmin = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin";
  } catch {
    return false;
  }
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const loggedInAsAdmin = isAdmin();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });

      if (loggedInAsAdmin) {
        // Admin adding a new staff member — show success, clear form
        setSuccess(`Account created for ${name}. They can now sign in.`);
        setName(""); setEmail(""); setPassword(""); setConfirm("");
      } else {
        // First-time setup — auto sign in and go to app
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.data.accessToken);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
        maxWidth: 420,
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
            easy<Box component="span" sx={{ color: "secondary.main" }}>pos</Box>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <PersonAddIcon sx={{ fontSize: 20, color: "secondary.main" }} />
          <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: "-0.02em" }}>
            {loggedInAsAdmin ? "Add staff account" : "Create admin account"}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {loggedInAsAdmin
            ? "New staff members can sign in immediately after creation."
            : "First time setup — this account will be the system admin."}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2.5, borderRadius: "10px" }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            autoComplete="name"
            size="small"
          />
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
            helperText="Minimum 8 characters"
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
          <TextField
            label="Confirm password"
            type={showPw ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            fullWidth
            size="small"
            error={confirm.length > 0 && confirm !== password}
            helperText={confirm.length > 0 && confirm !== password ? "Passwords do not match" : ""}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}
            sx={{ mt: 1, py: 1.25, fontWeight: 700, fontSize: 15, borderRadius: "10px" }}
          >
            {loading
              ? "Creating account…"
              : loggedInAsAdmin ? "Create account" : "Set up & sign in"}
          </Button>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          {loggedInAsAdmin ? (
            <>
              Done adding staff?{" "}
              <Typography
                component={Link}
                to="/"
                variant="body2"
                sx={{ color: "secondary.main", fontWeight: 600, textDecoration: "none",
                  "&:hover": { textDecoration: "underline" } }}
              >
                Back to POS
              </Typography>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{ color: "secondary.main", fontWeight: 600, textDecoration: "none",
                  "&:hover": { textDecoration: "underline" } }}
              >
                Sign in
              </Typography>
            </>
          )}
        </Typography>
      </Card>
    </Box>
  );
}
