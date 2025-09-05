import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Sidebar from "../components/common/Sidebar";
import { request } from "../components/common/http";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await request("my-profile", "GET");
      if (data.status === 200) {
        setProfile(data.data);
        setForm(data.data); // fill form with existing profile
      } else {
        setMessage(data.message || "Failed to load profile");
      }
    } catch {
      setMessage("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("_method", "PUT"); // important for Laravel
  ["name","email","phone","linkedin_url","resume"].forEach(key => {
    if(form[key] !== undefined) formData.append(key, form[key]);
  });

  try {
    const data = await request("update-my-profile", "POST", formData, true); // POST with _method=PUT
    if (data.status === 200) {
      setProfile(data.data);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } else {
      setMessage(JSON.stringify(data.errors || data.message));
    }
  } catch {
    setMessage("Error updating profile");
  }
};

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            {message && <div className="alert alert-info">{message}</div>}

            {!editing ? (
              <div className="card shadow-sm p-3 mt-3">
                <h2>My Profile</h2>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  {profile.linkedin_url ? (
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer">
                      {profile.linkedin_url}
                    </a>
                  ) : "Not provided"}
                </p>
                {profile.resume_url && (
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a href={`${process.env.REACT_APP_API_URL}/storage/${profile.resume_url}`} target="_blank" rel="noreferrer">
                      View / Download
                    </a>
                  </p>
                )}
                <button className="btn btn-primary mt-3" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form className="card shadow-sm p-3 mt-3" onSubmit={handleSubmit}>
                <h4>Edit Profile</h4>
                <input name="name" value={form.name || ""} onChange={handleChange} className="form-control mb-2" placeholder="Name"/>
                <input name="email" value={form.email || ""} onChange={handleChange} className="form-control mb-2" placeholder="Email"/>
                <input name="phone" value={form.phone || ""} onChange={handleChange} className="form-control mb-2" placeholder="Phone"/>
                <input name="linkedin_url" value={form.linkedin_url || ""} onChange={handleChange} className="form-control mb-2" placeholder="LinkedIn URL"/>
                <input type="file" name="resume" onChange={handleChange} className="form-control mb-2"/>

                <div>
                  <button type="submit" className="btn btn-success me-2">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
