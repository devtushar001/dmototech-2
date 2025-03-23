import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DochakiContext } from "../../components/Context/Contact";
import AccessoryView from "../../components/AccessoryView/AccessoryView";
import Breadcrum from "../../components/Breadcrum/Breadcrum";

const Accessory = () => {
    const { id } = useParams();
    const newId = id;
    const { bikeAccessories } = useContext(DochakiContext);
    return (
        <>
            <div className="accessory-full-view">
                {bikeAccessories.map((item, i) => {
                    if (newId === item._id) {
                        return (
                            <>
                                <Breadcrum key={i} name={item.name} id={item._id} category={item.category} />
                                <AccessoryView item={item} />
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}
export default Accessory;