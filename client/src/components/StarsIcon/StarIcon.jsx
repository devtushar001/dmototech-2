import React, { useEffect, useState } from "react";
import './StarIcon.css'

const StarIcon = () => {
    const [ratings, setRatings] = useState(0);
    const [reviews, setReviews] = useState(false)
    useEffect(() => {
    }, [ratings])
    return (
        <>
            <div className="star-icon">
                <div className="our-previos-review">
                    <h2>Top reviews.</h2>
                    <br />
                    <div className="reviews-container">
                        <div className="review-1">
                            <p> elit. um id, Lorem ipsum dolor sit amet consectetur adipisicing elit. At, ratione cupiditate? Debitis! velit veniam quod illum dicta tempora harum vero?</p>
                            <div className="user-name">
                                <p>Mr. Tusahr</p>
                                <div className="user-ratings">
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                </div>
                            </div>
                        </div>
                        <div className="review-1">
                            <p> elit. um id, Lorem ipsum dolor sit amet consectetur adipisicing elit. At, ratione cupiditate? Debitis! velit veniam quod illum dicta tempora harum vero?</p>
                            <div className="user-name">
                                <p>Mr. Tusahr</p>
                                <div className="user-ratings">
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                </div>
                            </div>
                        </div>
                        <div className="review-1">
                            <p> elit. um id, Lorem ipsum dolor sit amet consectetur adipisicing elit. At, ratione cupiditate? Debitis! velit veniam quod illum dicta tempora harum vero?</p>
                            <div className="user-name">
                                <p>Mr. Tusahr</p>
                                <div className="user-ratings">
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    <span style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="rate-us">
                    <h3>Rate DMOTOTECH</h3>
                    <div className="rated-stars">
                        <span
                            onClick={() => setRatings(1)}
                            className={ratings > 0 ? "star active" : "star"}>
                            {ratings > 0 ? '★' : '☆'}
                        </span>
                        <span
                            onClick={() => setRatings(2)}
                            className={ratings > 0 ? "star active" : "star"}>
                            {ratings > 1 ? '★' : '☆'}
                        </span>
                        <span
                            onClick={() => setRatings(3)}
                            className={ratings > 0 ? "star active" : "star"}>
                            {ratings > 2 ? '★' : '☆'}
                        </span>
                        <span
                            onClick={() => setRatings(4)}
                            className={ratings > 0 ? "star active" : "star"}>
                            {ratings > 3 ? '★' : '☆'}
                        </span>
                        <span
                            onClick={() => setRatings(5)}
                            className={ratings > 0 ? "star active" : "star"}>
                            {ratings > 4 ? '★' : '☆'}
                        </span>
                    </div>
                </div>
                {ratings > 0 ? <div className="rating-message">
                    <textarea name="message" id="message"></textarea>
                    <div className="buttons">
                        <button className="cancel" onClick={() => setRatings(0)}>Cancel</button>
                        <button className="submit">Submit</button>
                    </div>
                </div> : ""}
            </div>
        </>
    )
}

export default StarIcon;