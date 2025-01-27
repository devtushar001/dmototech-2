import React, { useState, useContext, useEffect } from "react";
import './RazorPay.css';
import { DochakiContext } from "../../components/Context/Contact";

const RazorPay = () => {
    const [data, setData] = useState({
        courseId: "123",
        amount: 0,
    });
    const { url } = useContext(DochakiContext);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const razorPayScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Failed to load Razorpay script"));
            document.body.appendChild(script);
        });
    };

    const razorPayPlaceOrder = async () => {
        if (!data.amount || data.amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (!scriptLoaded) {
            alert("Razorpay script is not loaded yet. Please wait.");
            return;
        }

        try {
            const response = await fetch(`${url}/api/razorpay/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json().catch(() => {
                throw new Error("Invalid JSON response from the server");
            });

            // Validate the result structure
            if (!result || !result.amount || !result.id) {
                throw new Error("Invalid response from server. Missing required fields.");
            }

            const paymentObject = new window.Razorpay({
                key: "rzp_test_5XootAPGentZJU",
                amount: result.amount,
                currency: "INR",
                order_id: result.id,
                handler: async function (response) {
                    console.log("Payment successful", response);

                    // Validate response fields
                    if (
                        !response.razorpay_order_id ||
                        !response.razorpay_payment_id ||
                        !response.razorpay_signature
                    ) {
                        alert("Payment verification failed. Missing response fields.");
                        return;
                    }

                    const paymentDetails = {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    };

                    console.log(paymentDetails);

                    try {
                        const res_two = await fetch(`${url}/api/razorpay/create-order`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(paymentDetails),
                        });

                        const verificationResult = await res_two.json();
                        console.log("Verification Result:", verificationResult);

                        if (verificationResult) {
                            alert("Payment verified successfully!");
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (verificationError) {
                        console.error("Error during payment verification:", verificationError);
                        alert("Failed to verify payment. Please try again.");
                    }
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "1234567890",
                },
                theme: {
                    color: "#F37254",
                },
            });

            paymentObject.open();

        } catch (error) {
            alert("Error processing the order: " + error.message);
        }
    };

    useEffect(() => {
        razorPayScript("https://checkout.razorpay.com/v1/checkout.js")
            .then(() => setScriptLoaded(true))
            .catch((error) => alert(error.message));
    }, []);

    return (
        <div className="razor-pay">
            <input
                style={{ width: "320px", height: "35px" }}
                onChange={(e) => setData((prev) => ({ ...prev, amount: e.target.value }))}
                type="number"
                placeholder="Enter amount"
            />
            <button
                style={{ width: "120px", height: "35px" }}
                onClick={razorPayPlaceOrder}
            >
                Make payment
            </button>
        </div>
    );
};

export default RazorPay;
