import React, { useContext, useState, useEffect } from "react";
import "./MyOrders.css";
import { fassets } from "../../frontend_assets/assets";
import { DochakiContext } from "../../components/Context/Contact";

const MyOrder = () => {
    const { url, token, readDate } = useContext(DochakiContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (token && url) {
            fetchOrders();
        }
    }, [token, url]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/api/order/myorders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch orders");

            const result = await response.json();
            result.success ? setOrders(result.orders) : setError("No orders found.");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-orders">
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !error && (
                <div className="container">
                    {orders.map((order, i) => {
                        const orderDate = readDate(order.date).toUpperCase();
                        return (
                            <div key={i} className="order-card">
                                <img src={fassets.parcel_icon} alt="Order" className="order-icon" />
                                
                                <p className="order-items">
                                    {order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
                                </p>

                                <p className={`order-price ${order.payment ? "paid" : "failed"}`}>
                                    &#8377; {Math.round(order.amount)}.00
                                </p>

                                <p className="order-count">Items: {order.items.length}</p>

                                <div className="item-list">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="item">
                                            <span>{item.name}</span>
                                            <span>&#8377; {item.price.newPrice}</span>
                                            <span>Qty: {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <span className="order-id">Order Id : {order.razorpayOrder.id.toUpperCase()}</span>

                                <p className="order-status">
                                    <span className="status-dot">&#x25cf;</span>
                                    <b> {order.status}</b>
                                </p>

                                <button className="track-button" onClick={fetchOrders}>Track Order</button>

                                <div className="order-date">Place date : {orderDate}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
