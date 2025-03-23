import React, { useContext, useEffect } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import { DochakiContext } from "../Context/Contact";
import './AccessoriesDisplay.css'

const AccessoriesDisplay = ({ category }) => {
    const { bikeAccessories } = useContext(DochakiContext);
    useEffect(() => {
        console.log(bikeAccessories)
    }, [])
    const lastSixProducts = bikeAccessories.slice(-6);
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Our latest products</h2>
                <div className="accessories-display-list">
                    {lastSixProducts.map((item, i) => {
                        if (category === "All" || category === item.category) {
                            return <AccessoriesItem key={i} item={item} />
                        } 
                    })}
                </div>
            </div>
        </>
    )
}
export default AccessoriesDisplay;