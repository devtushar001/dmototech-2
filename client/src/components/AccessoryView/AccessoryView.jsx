import React, { useContext, useState, useEffect } from "react";
import './AccessoryView.css';
import { Link } from "react-router-dom";
import { DochakiContext } from "../Context/Contact";

const AccessoryView = ({ item }) => {
    const { addToCart, removeFromCart, cartItem } = useContext(DochakiContext);
    const [mainImage, setMainImage] = useState(item.featuredImage);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('slide');
        const timer = setTimeout(() => {
            setAnimationClass('');
        }, 500);

        window.scrollTo(0, 0);
        return () => clearTimeout(timer);
    }, [mainImage]); 

    return (
        <div className="accessory-view">
            <div className="accessory-view-left">
                <div className="accessory-view-img-list">
                    {item.galleryImage.map((singleImage, i) => (
                        <img
                            key={i}
                            onClick={() => setMainImage(singleImage)}
                            src={singleImage}
                            alt=""
                        />
                    ))}
                </div>
                <div className="accessory-view-img">
                    <img src={mainImage} className={`accessory-view-main-image ${animationClass}`} alt="" />
                </div>
            </div>
            <div className="accessory-view-right">
                <h1>{item.name}</h1>
                <div className="accessory-view-right-prices">
                    <div className="accessory-view-right-price-old">
                        &#8377;{item.price.oldPrice}
                    </div>
                    <div className="accessory-view-right-price-new">
                        &#8377;{item.price.newPrice}
                    </div>
                </div>
                <div className="accessory-view-right-description">
                    <p>{item.description}</p>
                </div>
                <div className="accessory-view-right-size">
                    <h1>Details For You</h1>
                    <div className="accessory-view-right-sizes">
                        {!cartItem[item._id] ? " " : <div onClick={() => removeFromCart(item._id)}>−</div>}
                        <div>{!cartItem[item._id] ? 0 : cartItem[item._id]}</div>
                        <div onClick={() => addToCart(item._id)}>+</div>
                    </div>
                    <div className="other-details-container">
                        <p className="accessory-view-right-category">
                            <span>Category: {item.category}, {item.name}</span>
                        </p>
                    </div>
                </div>
                <div className="buttons">
                    <Link to={'/cart'}>
                        <button className="buy-now" onClick={() => !cartItem[item._id] ? addToCart(item._id) : cartItem[item._id]}>
                            BUY NOW
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessoryView;
