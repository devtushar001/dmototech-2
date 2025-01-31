import React, { useState, useEffect } from "react";
import "./ImageUploader.css";
import { toast } from "react-toastify";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/images/image");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle Image Upload
  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8000/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success(data.message);
      fetchImages();
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Image Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/images/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      alert("Image deleted successfully!");
      fetchImages(); // Refresh images after deletion
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="image-uploader">
      <div className="inputs">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="outputs">
        {!images ? "" :
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((img, i) => (
              <div className="single-image-grid" key={img.imageId} style={{ margin: "10px" }}>
                <img src={img.imageUrl} alt="Uploaded" width="150px" />
                <div className="buttons">
                  <button onClick={() => handleDelete(img._id)}>Delete</button>
                  <button>Use</button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default ImageUploader;
