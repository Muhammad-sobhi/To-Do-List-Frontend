import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import One from "../assets/imgs/one.png";
import { Link } from "react-router-dom";
import { apiUrl } from "./common/http";
import Sidebar from "./common/Sidebar";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const fetchJobs = async () => {
    await fetch(`${apiUrl}/jobs`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setJobs(result.data);
        } else {
          console.log("something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchJobs();

    // 👇 Get user role from localStorage (saved after login)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Jobs
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>

          {/* Job Listings */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Available Jobs</h2>

              {/* ✅ Show button only for admin/recruiter */}
              {(userRole === "admin" || userRole === "recruiter") && (
                <Link to="/jobs/create" className="btn btn-primary">
                  + Create New Job
                </Link>
              )}
            </div>

            <div className="list-group">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="list-group-item list-group-item-action mb-3 shadow-sm rounded"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      <Link
                        to={`/JobDetail/${job.id}`}
                        className="text-decoration-none"
                      >
                        {job.title}
                      </Link>
                    </h5>
                    <small className="text-muted">
                      {job.created_at
                        ? new Date(job.created_at).toLocaleDateString()
                        : ""}
                    </small>
                  </div>
                  <p className="mb-1">
                    <strong>Location:</strong> {job.location ?? "Not specified"}
                  </p>
                  <p className="mb-1">
                    <strong>Description:</strong>{" "}
                    {job.description ? job.description : "Not specified"}
                  </p>
                  {job.type && (
                    <p className="mb-1">
                      <strong>Company:</strong> {job.type}
                    </p>
                  )}
                  <div className="mt-2">
                    <Link
                      to={`/JobDetail/${job.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Job;
