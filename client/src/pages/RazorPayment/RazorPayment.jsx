import React, { useState, useContext, useEffect } from "react";
import "./RazorPayment.css";
import { DochakiContext } from "../../components/Context/Contact";
import { toast } from "react-toastify"; // For user notifications
import { useNavigate } from "react-router-dom";

const RazorPayment = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const { getTotalCartAmount, token, bikeAccessories, cartItem, url } = useContext(DochakiContext);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const navigate = useNavigate();

    const razorPayScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Failed to load Razorpay script"));
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        razorPayScript("https://checkout.razorpay.com/v1/checkout.js")
            .then(() => setScriptLoaded(true))
            .catch((error) => toast.error(error.message));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { firstName, lastName, email, phone, street, city, state, zipcode, country } = data;
        if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipcode || !country) {
            toast.error("Please fill out all required fields.");
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            toast.error("Phone number must be 10 digits.");
            return false;
        }
        return true;
    };

    const razorPayPlaceOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const orderItems = bikeAccessories
            .filter((item) => cartItem[item._id])
            .map((item) => ({
                ...item,
                quantity: cartItem[item._id],
            }));

        if (orderItems.length === 0) {
            toast.error("Your cart is empty. Please add items to proceed.");
            return;
        }

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount(),
        };

        if (!scriptLoaded) {
            toast.error("Razorpay script is not loaded yet. Please wait.");
            return;
        }

        try {
            const response = await fetch(`${url}/api/razorpay/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (!result || !result.razorpayOrder || !result.razorpayOrder.id) {
                throw new Error("Invalid response from server. Missing Razorpay order ID.");
            }

            const paymentObject = new window.Razorpay({
                key: "rzp_test_481XWM263JxEp8", // Replace with your Razorpay API key
                amount: result.razorpayOrder.amount, // Amount in paise
                currency: result.razorpayOrder.currency,
                order_id: result.razorpayOrder.id, // Razorpay Order ID
                handler: async function (response) {
                    //   console.log("Razorpay Handler Response:", response);

                    const paymentDetails = {
                        order_id: response.razorpay_order_id, // Razorpay Order ID
                        payment_id: response.razorpay_payment_id, // Razorpay Payment ID
                        signature: response.razorpay_signature, // Razorpay Signature
                    };

                    if (!paymentDetails.order_id || !paymentDetails.signature) {
                        toast.error("Razorpay order ID or signature is missing. Please try again.");
                        return;
                    }

                    try {
                        const verifyResponse = await fetch(`${url}/api/razorpay/verify-order`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(paymentDetails),
                        });

                        const verificationResult = await verifyResponse.json();
                        console.log(verificationResult);
                        if (verificationResult.success) {
                            toast.success("Payment verified successfully!");
                            navigate("/myorders");
                            window.location.reload();
                        } else {
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    } catch (verificationError) {
                        toast.error("Failed to verify payment. Please try again.");
                    }
                },
                prefill: {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    contact: data.phone,
                },
                theme: {
                    color: "#F37254",
                },
            });

            paymentObject.open();
        } catch (error) {
            toast.error("Error processing the order: " + error.message);
        }
    };

    return (
        <form className="place-order" onSubmit={razorPayPlaceOrder}>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={data.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={data.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={data.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="street"
                    type="text"
                    placeholder="Street"
                    value={data.street}
                    onChange={handleInputChange}
                    required
                />
                <div className="multi-fields">
                    <input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={data.city}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="state"
                        type="text"
                        placeholder="State"
                        value={data.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="multi-fields">
                    <input
                        name="zipcode"
                        type="text"
                        placeholder="Zip code"
                        value={data.zipcode}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="country"
                        type="text"
                        placeholder="Country"
                        value={data.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    value={data.phone}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    required
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>&#8377;{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Shipping Fee + GST</p>
                        <p>&#8377;50</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>&#8377;{getTotalCartAmount() + 50}</p>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default RazorPayment;