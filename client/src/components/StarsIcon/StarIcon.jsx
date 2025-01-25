import React, { useEffect, useState } from "react";
import './StarIcon.css'

const StarIcon = () => {
    const [ratings, setRatings] = useState(0);
    useEffect(() => {
    }, [ratings])
    return (
        <>
            <div className="star-icon">
                <div className="rate-us">
                    <h2>Rate US</h2>
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
                        <button>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div> : ""}
            </div>
        </>
    )
}

export default StarIcon;