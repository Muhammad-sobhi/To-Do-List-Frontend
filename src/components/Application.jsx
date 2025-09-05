import React, { useEffect, useState } from "react";
import { request } from "./common/http";
import Sidebar from "./common/Sidebar";
import { Link } from "react-router-dom";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await request("applications", "GET");
        if (data.status === 200) {
          setApplications(data.data);
          if (data.data.length > 0) {
            setRole(data.data[0].candidate_name ? "admin/recruiter" : "candidate");
          }
        } else {
          setError(data.message || "Failed to fetch applications");
        }
      } catch (err) {
        setError("Something went wrong while fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10">
          <h2>Applications</h2>
          {applications.length === 0 ? (
            <div className="alert alert-info">No applications found.</div>
          ) : (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  {role === "admin/recruiter" && <th>Candidate</th>}
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.job_title}</td>
                    <td>{app.company || "N/A"}</td>
                    {role === "admin/recruiter" && <td>{app.candidate_name}</td>}
                    <td>
                      <span
                        className={`badge ${
                          app.status === "applied" ? "bg-warning" :
                          app.status === "hired" ? "bg-success" :
                          app.status === "rejected" ? "bg-danger" : "bg-secondary"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/ApplicationDetail/${app.id}`} className="btn btn-primary btn-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
