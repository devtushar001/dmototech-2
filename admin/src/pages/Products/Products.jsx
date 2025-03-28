import React, { useState, useEffect } from "react";
import './Products.css';
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { toast } from "react-toastify";

const Products = ({ url, token }) => {
  const [featuredImage, setFeaturedImage] = useState({ type: "single", selection: false, image: null });
  const [galleryImage, setGalleryImage] = useState({ type: "multiple", selection: false, image: [] });
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    description: "",
    featuredImage: "",
    galleryImage: "",
    content: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = data.tags.trim()
      ? data.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      : [];

    const newProduct = {
      name: data.name,
      category: data.category,
      price: {
        oldPrice: parseFloat(data.oldPrice) || 0,
        newPrice: parseFloat(data.newPrice) || 0,
      },
      description: data.description,
      galleryImage: galleryImage.image,
      content: data.content,
      featuredImage: featuredImage.image,
      tags: tagsArray,
    };

    try {
      const response = await fetch(`${url}/api/accessory/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      console.log(result)
      if (!response.ok) {
        toast.error(result.message || "Failed to add accessory");
        return;
      }

      toast.success(result.message);

      setData({
        name: "",
        category: "",
        oldPrice: "",
        newPrice: "",
        description: "",
        featuredImage: "",
        galleryImage: "",
        content: "",
        tags: ""
      });

      setFeaturedImage({ type: "single", selection: false, image: null });
      setGalleryImage({ type: "multiple", selection: false, image: [] });

    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${url}/api/nested-category/all-category`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!data.success) toast.error(data.message);
      setCategories(data.allCategories);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="product-adding">
      <div className="product-form">
        <div className="left">
          <input type="text" name="name" placeholder="Product title" value={data.name} onChange={handleChange} />
          <select name="category" value={data.category} onChange={handleChange} >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.menu_name}>{cat.menu_name}</option>
            ))}
          </select>
          <input type="number" name="oldPrice" placeholder="Old Price" value={data.oldPrice} onChange={handleChange} />
          <input type="number" name="newPrice" placeholder="New Price" value={data.newPrice} onChange={handleChange} />
          <textarea name="description" placeholder="Product Description" value={data.description} onChange={handleChange} />
          <input type="text" name="tags" placeholder="Tags (comma-separated)" value={data.tags} onChange={handleChange} />
          <button type="submit" onClick={handleSubmit}>Add Product</button>
        </div>

        <div className="right">
          <div className="featured-image">
            {featuredImage.selection ? (
              <ImageUploader object={featuredImage} imageSelector={setFeaturedImage} />
            ) : (
              <button type="button" onClick={() => setFeaturedImage({ ...featuredImage, selection: true })}>
                Select Featured Image
              </button>
            )}
            {featuredImage.image && <img src={featuredImage.image} alt="Featured" className="main-image" />}
          </div>
          <div className="gallery-image">
            {galleryImage.selection ? (
              <ImageUploader object={galleryImage} imageSelector={setGalleryImage} />
            ) : (
              <button type="button" onClick={() => setGalleryImage({ ...galleryImage, selection: true })}>
                Select Gallery Images
              </button>
            )}
            <div className="gallery-images">
              {galleryImage.image.length > 0 && galleryImage.image.map((img, index) => (
                <img key={index} src={img} alt="Gallery" className="gallery" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
