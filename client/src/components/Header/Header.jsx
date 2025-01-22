import React, { useState } from "react";
import "./Header.css";
import {Link} from 'react-router-dom';
import { assets } from "../../assets/assets";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Live Your Passion",
      subtitle: "Ride Your Attitude",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, impedit. Commodi, eius officiis accusamus nemo nisi fugiat nostrum consectetur minima repellat blanditiis ea, dolores doloribus distinctio sit laudantium nesciunt aperiam.",
      backgroundImage: assets.slider_one
    },
    {
      title: "Explore New Horizons",
      subtitle: "Adventure Awaits",
      description: "Discover the joy of traveling to new places and experiencing life like never before. Step out and conquer your dreams.",
      backgroundImage: assets.slider_two
    },
    {
      title: "Embrace Creativity",
      subtitle: "Unleash Your Potential",
      description: "Uncover hidden talents and make your mark in the world with innovative ideas and boundless creativity.",
      backgroundImage: assets.slider_three
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider" id="slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="slide-content">
              {/* <h2>
                {slide.title} <br />
                {slide.subtitle}
              </h2> */}
              {/* <p>{slide.description}</p> */}
              {/* <button>View Menu</button> */}
            </div>
          </div>
        ))}
      </div>
      <button className="prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="next" onClick={handleNext}>
        &#10095;
      </button>
      <Link to="/shop"><button id="shop-now">Shop now</button></Link>
     
      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Header;
