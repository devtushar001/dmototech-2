import React, { useContext, useEffect } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import './ShopAccessoryDisplay.css';

const ShopAccessoryDisplay = ({ category, accessories, activeSubCtg }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Our Latest Products</h2>
                <div className="accessories-display-list">
                    {accessories.length > 0 ? (
                        accessories.map((item, i) => {
                            if (
                                category === "All" || 
                                (category === item.category && (!activeSubCtg || activeSubCtg === item.subcategory))
                            ) {
                                return (
                                    <AccessoriesItem item={item}/>
                                );
                            }
                            return null; 
                        })
                    ) : (
                        <p>No accessories found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShopAccessoryDisplay;
