// src/components/JobDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "./common/http";
import Sidebar from "./common/Sidebar";

const JobDetail = () => {
  const { id } = useParams(); // get job id from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await request(`jobs/${id}`, "GET", null, token);

        if (data.status === 200) {
          setJob(data.data);
        } else {
          setMessage(data.message || "Failed to fetch job details");
        }
      } catch (err) {
        setMessage("Something went wrong while fetching job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await request("applications", "POST", { job_id: id }, token);

      if (data.status === 200) {
        setMessage("✅ Application submitted successfully!");
      } else {
        setMessage("❌ " + (data.message || "Failed to apply"));
      }
    } catch (err) {
      setMessage("❌ Something went wrong while applying");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* Job Detail */}
        <div className="col-md-9 col-lg-10">
          <h2 className="mb-4">Job Details</h2>

          {message && <div className="alert alert-info">{message}</div>}

          {job ? (
            <div className="card shadow-sm p-4">
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location || "Not specified"}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Department:</strong> {job.department || "Not specified"}</p>
              <p><strong>Slots:</strong> {job.slots || 1}</p>
              <p><strong>Status:</strong> {job.status || "open"}</p>
              <p><strong>Posted By:</strong> {job.recruiter?.name || "N/A"}</p>
              <p><strong>Date Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>

              {/* Apply Button (only for candidates) */}
              {user?.role === "candidate" && (
                <button onClick={handleApply} className="btn btn-primary mt-3">
                  Apply Now
                </button>
              )}
            </div>
          ) : (
            <div className="alert alert-danger">Job not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
