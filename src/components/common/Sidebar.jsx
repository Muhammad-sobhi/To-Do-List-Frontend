// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3" style={{ minHeight: "100vh" }}>
      <h3 className="mb-4">ATS Dashboard</h3>

      <div className="mb-4">
        <h5>Jobs</h5>
        <ul className="list-unstyled ps-2">
          <li>
            <Link to="/jobs" className="text-decoration-none">
              All Jobs
            </Link>
          </li>
          <li>
            <Link to="/jobs/open" className="text-decoration-none">
              Open Jobs
            </Link>
          </li>
          <li>
            <Link to="/jobs/closed" className="text-decoration-none">
              Closed Jobs
            </Link>
          </li>
          <li>
            <Link to="/jobs/paused" className="text-decoration-none">
              Paused Jobs
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h5>Candidates</h5>
        <ul className="list-unstyled ps-2">
          <li>
            <Link to="/candidates" className="text-decoration-none">
              All Candidates
            </Link>
          </li>
          <li>
            <Link to="/candidates/active" className="text-decoration-none">
              Active
            </Link>
          </li>
          <li>
            <Link to="/candidates/hired" className="text-decoration-none">
              Hired
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h5>Recruiters</h5>
        <ul className="list-unstyled ps-2">
          <li>
            <Link to="/recruiters" className="text-decoration-none">
              All Recruiters
            </Link>
          </li>
          <li>
            <Link to="/recruiters/active" className="text-decoration-none">
              Active
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h5>Reports</h5>
        <ul className="list-unstyled ps-2">
          <li>
            <Link to="/reports/jobs" className="text-decoration-none">
              Job Reports
            </Link>
          </li>
          <li>
            <Link to="/reports/candidates" className="text-decoration-none">
              Candidate Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
