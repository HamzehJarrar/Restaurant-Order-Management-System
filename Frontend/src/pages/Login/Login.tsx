import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await api.post("/api/auth/login", { email, password });

      const token = res.data.data.token;
      const role = res.data.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/dashboard");
      else navigate("/pos");

      console.log(res.data);
    } catch (err) {
      alert("Wrong email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "350px" }}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
          }}
          onClick={loginUser}
        >
          Login
        </button>
      </div>
    </div>
  );
}
