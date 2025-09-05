// src/components/auth/Register.jsx
import React, { useState } from "react";
import { request } from "../common/http";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await request("register", "POST", form);
    if (data.status === 201 || data.status === 200) {
      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 1500); // ✅ redirect after success
    } else {
      setMessage(JSON.stringify(data.errors || data.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
          <option value="candidate">Candidate</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
