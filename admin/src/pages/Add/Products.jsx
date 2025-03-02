import React, { useState, useEffect } from "react";
import './Products.css';
import { toast } from "react-toastify";

const Products = ({ url }) => {
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    currency: "",
    category: "",
    subcategory: "",
    material: "",
    compatibility: "",
    reviews: "",
    reviewCount: "",
  });

  console.log(data)

  const [images, setImages] = useState({
    mainImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setData((prev) => ({
      ...prev,
      category: value,
      subcategory: "",
    }));
  };

  const handleImageChange = (e, imageType) => {
    setImages((prev) => ({
      ...prev,
      [imageType]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    });

    try {
      const response = await fetch(`${url}/api/accessory/add`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to add accessory");
        return;
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }

    setData({
      name: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      currency: "",
      category: "",
      subcategory: "",
      material: "",
      compatibility: "",
      reviews: "",
      reviewCount: "",
    });

    setImages({
      mainImage: null,
      secondImage: null,
      thirdImage: null,
      fourthImage: null,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/nested-category/all-category`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
        }
        setCategories(data.allCategories); // Assuming response data is an array
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCategories();
  }, [url]);

  return (
    <>sdf
    </>
  );
};

export default Products;
