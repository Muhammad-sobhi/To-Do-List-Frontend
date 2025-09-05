// src/pages/CreateJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../components/common/http";
import Layout from "../components/common/Layout";

const CreateJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "full_time",
    department: "",
    slots: 1,
  });
  const [message, setMessage] = useState("");

  // ✅ Role check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || (user.role !== "admin" && user.role !== "recruiter")) {
      navigate("/"); // redirect if not allowed
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await request("jobs", "POST", form);

      if (data.status === 200) {
        alert("Job created successfully!");
        navigate("/jobs");
      } else {
        setMessage(data.message || "Failed to create job");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Create Job</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-control mb-2"
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="remote">Remote</option>
            <option value="contract">Contract</option>
          </select>
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="number"
            name="slots"
            placeholder="Slots"
            value={form.slots}
            onChange={handleChange}
            className="form-control mb-2"
            min="1"
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateJob;
