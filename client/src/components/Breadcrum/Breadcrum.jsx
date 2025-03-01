import React from "react";
import './Breadcrum.css';
import { fassets } from '../../frontend_assets/assets'

const Breadcrum = (props) => {

    const { name, category } = props;

    return (
        <>
            <div className="breadcrumb">
                HOME <img src={fassets.arrow_icon} alt="arrow" />
                Accessory <img src={fassets.arrow_icon} alt="arrow" />
                {category} <img src={fassets.arrow_icon} alt="arrow" />
                {name}
            </div>
        </>
    )
}
export default Breadcrum;