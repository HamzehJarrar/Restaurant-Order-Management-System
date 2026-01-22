import { 
  Button, TextField, Box, Typography, Paper, 
  InputAdornment, Container, IconButton 
} from "@mui/material";
import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const COLORS = {
  primary: "#FF5C33",
  secondary: "#10B981",
  bg: "#F8F9FA",
  text: "#333"
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const token = res.data?.accessToken || res.accessToken;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) { console.error(error); }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: COLORS.bg }}>
      <Container maxWidth="xs">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            borderRadius: '24px', // نفس انحناء الكروت في الصورة
            boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}
        >
          {/* Logo Section */}
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
            Easy <span style={{ color: COLORS.primary }}>POS</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={4}>
            Welcome back! Please enter your details.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              placeholder="Email Address"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} // زوايا الحقول
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email sx={{color: COLORS.primary}} /></InputAdornment>,
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', mb: 1 } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{color: COLORS.primary}} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ 
                mt: 3, py: 1.5, borderRadius: '12px', 
                bgcolor: COLORS.primary, 
                textTransform: 'none', fontWeight: 'bold', fontSize: '1rem',
                '&:hover': { bgcolor: '#e54d2a' }
              }}
            >
              Login
            </Button>
          </form>

          <Box mt={4}>
            <Typography variant="body2" color="textSecondary">
              New here? {" "}
              <Link to="/register" style={{ textDecoration: 'none', color: COLORS.primary, fontWeight: '600' }}>
                Create an account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;