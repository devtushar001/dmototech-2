import { useEffect, useState } from 'react';
import './AllProducts.css';
import nav_icon from '../../assets/db';

const ProductList = ({ token, url }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${url}/api/accessory/list`) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.featuredImage} alt={product.name} className="product-image" />
          <div className="content">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-old-price">₹{product.price.oldPrice}</p>
            <p className="product-new-price">₹{product.price.newPrice}</p>
            <div className="product-tags">
              {product.tags.map((tag, index) => (
                <span key={index}  className="product-tag">{tag},</span>
              ))}
            </div>  
          </div>
          <div className="product-options">
            <img src={nav_icon.edit_icon} alt="" />
            <img src={nav_icon.bin_icon} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
