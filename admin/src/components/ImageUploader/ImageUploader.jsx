import React, { useState, useEffect } from "react";
import './ImageUploader.css'

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:30017/api/images/image");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:30017/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Image uploaded successfully!");
      fetchImages();
    } catch (error) {
      alert("Upload failed");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="image-uploader">
      <div className="inputs">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="outputs">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {images.map((img) => (
            <div className="single-image-grid" key={img._id} style={{ margin: "10px" }}>
              <img src={img.imageUrl} alt="Uploaded" width="150px" />
              <div className="buttons">
                <button>Delete</button>
                <button>Use</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;