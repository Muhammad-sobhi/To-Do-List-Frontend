// src/utils/api.js
export const apiUrl = "http://localhost:8000/api"; 

export const request = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const json = await res.json();
  return { status: res.status, data: json }; 
};
