import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import "./Categories.css";

const Categories = ({ token, url }) => {
  const [categories, setCategories] = useState([]);
  const [menuImage, setMenuImage] = useState({ type: "single", selection: false, image: null });
  const [categoryData, setCategoryData] = useState({
    menu_name: "",
    menu_image: null
  });

  // Fetch Categories (Optimized)
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${url}/api/category/get`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCategories((prevCategories) => {
        if (JSON.stringify(prevCategories) !== JSON.stringify(data.categories)) {
          toast.success("Categories loaded successfully");
        }
        return data.categories;
      });
    } catch (err) {
      toast.error(err.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCategoryData((prev) => ({ ...prev, menu_image: menuImage.image }));
  }, [menuImage.image]);

  // Delete Category (Optimized)
  const deleteCategory = async (catId) => {
    try {
      const response = await fetch(`${url}/api/category/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ catId }),
      });

      const data = await response.json();
      console.log(data)
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCategories((prevCategories) => prevCategories.filter((cat) => cat._id !== catId));
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  // Add New Category (Optimized)
  const newCategory = async () => {
    if (!categoryData.menu_name || !categoryData.menu_image) {
      toast.error("Category name and image are required!");
      return;
    }

    try {
      const response = await fetch(`${url}/api/category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      console.log(data);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCategories((prevCategories) => [...prevCategories, data.category]);
      toast.success("Category created successfully!");

      // Reset inputs AFTER updating UI
      setTimeout(() => {
        setCategoryData({ menu_name: "", menu_image: null });
        setMenuImage({ type: "single", selection: false, image: null });
      }, 300);
    } catch (err) {
      toast.error(err.message || "Failed to create category");
    }
  };

  return (
    <div className="categories-container">
      <div className="all-categories">
        {categories.length === 0 ? (
          <p className="no-categories">No categories found.</p>
        ) : (
          <div className="category-list">
            {categories.map((category) => (
              <div key={category._id} className="category-item">
                <img src={category.menu_image} alt={category.menu_name} className="category-image" />
                <div className="data">
                  <span className="category-name">{category.menu_name}</span>
                  <button className="delete-button" onClick={() => deleteCategory(category._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="create-new-categories">
        <input
          type="text"
          placeholder="Add category name"
          className="category-input"
          value={categoryData.menu_name}
          onChange={(e) => setCategoryData({ ...categoryData, menu_name: e.target.value })}
        />

        <div className="featured-image">
          {menuImage.selection ? (
            <ImageUploader object={menuImage} imageSelector={setMenuImage} />
          ) : (
            <button
              type="button"
              className="select-image-button"
              onClick={() => setMenuImage({ ...menuImage, selection: true })}
            >
              Select image
            </button>
          )}
          {menuImage.image && <img src={menuImage.image} alt="Featured" className="main-image" />}
        </div>

        <button className="submit-button" onClick={newCategory}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Categories;
