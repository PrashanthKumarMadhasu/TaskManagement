import React, { useState, useEffect } from "react";
import { getPosts, addPost } from "../../api";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]); 
  const [caption, setCaption] = useState(""); 
  const [photo, setPhoto] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem("todo-app-token"); 
  console.log("Token:", token);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await getPosts(token);
      setPosts(response.data.posts);
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
    }
  };

  // Handle form submission for adding a post
  const handleAddPost = async (e) => {
    e.preventDefault(); 
    if (!photo || !caption) {
      alert("Both photo and caption are required!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("caption", caption);
    setLoading(true); 
    try {
      const response = await addPost(token, formData);
      setCaption(""); 
      setPhoto(null); 
      fetchPosts(); 
    } catch (error) {
      console.error(
        "Error adding post:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); 
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) setPhoto(file);
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed-page">
      {/* Upload Post Section */}
      <div className="post-container">
        <form onSubmit={handleAddPost} className="form-container">
          <h2 className="form-title">Create a New Post</h2>
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-input">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Uploading..." : "Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Section */}
      <div className="feed-container">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.photo} alt="Post" className="post-image" />
            <h3 className="post-caption">{post.caption}</h3>
            <p className="post-user">
              Posted by: {post.user?.name || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
