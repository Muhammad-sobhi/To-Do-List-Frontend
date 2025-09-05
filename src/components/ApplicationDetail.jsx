import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "./common/http";
import Layout from "./common/Layout";
import Sidebar from "./common/Sidebar";

const stages = [
  { value: "applied", label: "Applied" },
  { value: "phone_screen", label: "Phone Screen" },
  { value: "interview", label: "Interview" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await request(`applications/${id}`, "GET");
        if (data.status === 200) {
          setApplication(data.data);
          setStage(data.data.status);
        } else {
          setMessage(data.message || "Application not found");
        }
      } catch {
        setMessage("Error fetching application");
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleStageChange = async (e) => {
    const newStage = e.target.value;
    setStage(newStage);

    try {
      const data = await request(`applications/${id}`, "PUT", { status: newStage });
      if (data.status === 200) {
        setApplication(data.data);
        setMessage(`Application moved to "${newStage}"`);
      } else {
        setMessage(data.message || "Failed to update stage");
      }
    } catch {
      setMessage("Error updating stage");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (message && !application) return <div className="alert alert-danger">{message}</div>;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h2>Application Details</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="card p-3 shadow-sm mt-3">
              {application.candidate && (
                <>
                  <h4>Candidate Info</h4>
                  <p><strong>Name:</strong> {application.candidate.name}</p>
                  <p><strong>Email:</strong> {application.candidate.email}</p>
                </>
              )}

              <h4 className="mt-3">Job Info</h4>
              <p><strong>Title:</strong> {application.job?.title}</p>
              <p><strong>Department:</strong> {application.job?.department}</p>
              <p><strong>Type:</strong> {application.job?.type}</p>

              <h4 className="mt-3">Application Info</h4>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Applied At:</strong> {new Date(application.created_at).toLocaleString()}</p>
              {application.resume_snapshot && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a href={application.resume_snapshot} target="_blank" rel="noopener noreferrer">View</a>
                </p>
              )}

              {/* Stage Transition (Admin / Recruiter only) */}
              {(application.assigned_to || true) && (
                <div className="mt-3">
                  <label><strong>Move to Stage:</strong></label>
                  <select className="form-select mt-1" value={stage} onChange={handleStageChange}>
                    {stages.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetail;
