import { React, useContext } from "react";
import { fassets } from "../../frontend_assets/assets";
import { Link } from "react-router-dom";
import './AccessoriesItem.css';
// import { HashLink as Link } from "react-router-hash-link";
import { DochakiContext } from "../Context/Contact";

const AccessoriesItem = ({ item }) => {
  const { addToCart, removeFromCart, cartItem, url } = useContext(DochakiContext);

  return (
    <>
      <div className="accessory-item">
        <div className="accessories-item-img-container">
          <img src={item.featuredImage} alt="" className="accessory-item-image" />
          {!cartItem[item._id] ? <img className="add" onClick={() => addToCart(item._id)} src={fassets.add_icon_white} alt="" />
            : <div className="accessory-item-counter">
              <img src={fassets.remove_icon_red} onClick={() => removeFromCart(item._id)} alt="" />
              <p>{cartItem[item._id]}</p>
              <img className="adds" onClick={() => addToCart(item._id)} src={fassets.add_icon_green} alt="" />
            </div>
          }
        </div>
        <div className="accesory-item-info">
          <div className="accessory-item-name-rating">
            <h3>{item.name}</h3>
          </div>
          <div className="accessory-item-ratings">
          </div>
          <div className="accessory-item-price">
            <div className="prices">
              <p className="accessory-item-new-price">&#8377;{item.price.oldPrice} </p>
              <p className="accessory-item-old-price">&#8377;{item.price.newPrice}</p>
            </div>
          </div>

          {/* <p className="accessory-item-category" id="ctgs" ><span >Fit In : </span><p id="ctg-sub-ctg"> {item.category} {!subcategory? "" : <img src={fassets.arrow_icon}  alt="" />}{item.category}</p></p> */}
        </div>
        <Link to={`/accessory/${item._id}`}><button className="view-more">View More..</button></Link>
      </div>
    </>
  )
}
export default AccessoriesItem;