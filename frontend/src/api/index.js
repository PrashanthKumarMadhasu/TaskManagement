import axios from "axios";

// Set up the API base URL and enable withCredentials for cookie-based sessions.
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Updated base URL to handle both auth and tasks routes
  withCredentials: true, // This ensures cookies (like JWT) are sent with requests
});

// Authentication-related API calls
export const UserSignUp = async (data) => await API.post("/auth/register", data);
export const UserSignIn = async (data) => await API.post("/auth/login", data);
export const sendOtp = async (data) => await API.post("/auth/forgetPassword", data);
export const verifyOtp = async (data) => await API.post("/auth/verifyOtp", data);
export const updatePassword = async (data) => await API.post("/auth/updatePassword", data);

// Task-related API calls
export const addTask = async (token, data) => {
  return await API.post("/tasks", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTasks = async (token) => {
  return await API.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTaskStatus = async (token, taskId, status) => {
  return await API.put(`/tasks/${taskId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const deleteTask = async (token, taskId) => {
  return await API.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Post-related API calls

// Add a new post (with photo upload)
export const addPost = async (token, data) => {
  return await API.post("/posts", data, {
    headers: { 
      Authorization: `Bearer ${token}`, 
      "Content-Type": "multipart/form-data" // Ensure multipart data is handled
    },
  });
};

// Fetch all posts
export const getPosts = async (token) => {
  return await API.get("/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete a post
export const deletePost = async (token, postId) => {
  return await API.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
