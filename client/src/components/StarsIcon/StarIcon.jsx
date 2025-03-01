import React, { useContext, useEffect, useState } from "react";
import { DochakiContext } from '../Context/Contact';
import './StarIcon.css';
import { toast } from "react-toastify";

const StarIcon = () => {
    const [ratings, setRatings] = useState(0); // Current rating value
    const [fetchRating, setFetchRatings] = useState([]); // All fetched reviews
    const { url, token } = useContext(DochakiContext); // URL and token from context

    const [ratingData, setRatingData] = useState({
        stars: 0,
        message: ""
    });

    // Submit a rating to the backend
    const submitRatings = async () => {
        try {
            const response = await fetch(`${url}/api/ratings/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(ratingData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            toast.success(result.message || "Rating submitted successfully!");

            // Reset the form after successful submission
            setRatings(0);
            setRatingData({ stars: 0, message: "" });

            // Fetch the updated ratings after submission
            fetchAllRatings();
        } catch (error) {
            console.error("Failed to submit rating:", error);
            toast.error("An error occurred while submitting your rating. Please try again.");
        }
    };

    // Fetch all ratings from the backend
    const fetchAllRatings = async () => {
        try {
            const response = await fetch(`${url}/api/ratings/get-all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching ratings: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.success) {
                setFetchRatings(data.allRatings); // Update state with fetched ratings
                toast.success("Ratings fetched successfully!");
            } else {
                toast.error(data.message || "Failed to fetch ratings.");
            }
        } catch (error) {
            console.error("Error fetching ratings:", error.message);
            toast.error("An error occurred while fetching ratings.");
        }
    };

    // Fetch all ratings on component mount
    useEffect(() => {
        fetchAllRatings();
    }, []);

    // Debugging: Log changes to `ratingData`
    useEffect(() => {
        console.log(ratingData);
    }, [ratingData]);

    return (
        <div className="star-icon">
            {/* Display previously fetched reviews */}
            <div className="our-previos-review">
                <h2>Top reviews</h2>
                <div className="reviews-container">
                    {fetchRating.map((review) => (
                        <div className="review-1" key={review._id}>
                            <p>{review.message}</p>
                            <div className="user-name">
                                <p>{review.userName}</p>
                                <div className="user-ratings">
                                    {[...Array(review.stars)].map((_, index) => (
                                        <span key={index} style={{ color: "goldenrod", fontSize: "170%" }}>★</span>
                                    ))}
                                    {[...Array(5 - review.stars)].map((_, index) => (
                                        <span key={index} style={{ color: "lightgray", fontSize: "170%" }}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rate the app */}
            <div className="rate-us">
                <h3>Rate DMOTOTECH</h3>
                <div className="rated-stars">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            onClick={() => {
                                setRatings(index + 1);
                                setRatingData((prev) => ({ ...prev, stars: index + 1 }));
                            }}
                            className={ratings > index ? "star active" : "star"}>
                            {ratings > index ? '★' : '☆'}
                        </span>
                    ))}
                </div>
            </div>

            {/* Input for review message and submit button */}
            {ratings > 0 && (
                <div className="rating-message">
                    <textarea
                        placeholder="Write your review here..."
                        value={ratingData.message}
                        onChange={(e) => setRatingData((prev) => ({ ...prev, message: e.target.value }))}
                        name="message"
                        id="message">
                    </textarea>
                    <div className="buttons">
                        <button
                            className="cancel"
                            onClick={() => {
                                setRatings(0);
                                setRatingData({ stars: 0, message: "" });
                            }}>
                            Cancel
                        </button>
                        <button onClick={submitRatings} className="submit">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StarIcon;
