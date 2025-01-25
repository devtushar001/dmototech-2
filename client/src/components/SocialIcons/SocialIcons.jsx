import React from "react";
import './SocialIcons.css';
import { assets } from '../../assets/assets';

const SocialIcons = () => {
   return (
      <>
         <div className="social-icons">
            <img src={assets.whatsapp} alt="" />
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
         </div>
      </>
   )
}

export default SocialIcons;