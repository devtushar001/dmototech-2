import React from "react";
import './SocialIcons.css';
import { assets } from '../../assets/assets';

const SocialIcons = () => {
   return (
      <>
         <div className="social-icons">
            <a href="https://wa.me/918806795165" target="_blank"><img src={assets.whatsapp} alt="" /> </a>
            <a href="https://www.facebook.com/dochaki/" target="_blank"><img src={assets.facebook_icon} alt="" /></a>
            <a href="https://www.instagram.com/dmototech/" target="_blank"><img src={assets.instagram_icon} alt="" /></a>
         </div>
      </>
   )
}

export default SocialIcons;