// src/components/auth/Login.jsx
import React, { useState } from "react";
import { request } from "../common/http";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await request("login", "POST", form);

      if (data.status === 200) {
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/dashboard");
      } else {
        setMessage(data.data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
