import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DochakiContext = createContext(null);

const DochakiContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [bikeAccessories, setBikeAccessories] = useState([]);
    const url = 'http://localhost:10019';

    const fetchBikeAccessoriesList = async () => {
        try {
            const response = await fetch(`${url}/api/accessory/list`);
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
            } else if (result.success) {
                console.log(result.data)
                setBikeAccessories(result.data); 
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Fetch Error: " + err.message);
        }
    };

    const readDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

    const addToCart = async (itemId) => {
        if (!token) {
            toast.error("Please log in to add items to your cart");
            return;
        }

        try {
            const newQuantity = cartItem[itemId] ? cartItem[itemId] + 1 : 1;
            setCartItem((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));

            const response = await fetch(`${url}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    itemId,
                    quantity: newQuantity,
                }),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
                setCartItem((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] - 1, 
                }));
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            setCartItem((prev) => ({
                ...prev,
                [itemId]: prev[itemId] - 1,
            }));
        }
    };

    const removeFromCart = async (itemId) => {
        if (!token) {
            toast.error("Please log in to remove items from your cart");
            return;
        }

        try {
            const newQuantity = cartItem[itemId] > 1 ? cartItem[itemId] - 1 : 0;
            setCartItem((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));

            const response = await fetch(`${url}/api/cart/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    itemId,
                    quantity: newQuantity,
                }),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
                setCartItem((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] + 1, 
                }));
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            setCartItem((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1,
            }));
        }
    };

    const loadCartData = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${url}/api/cart/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCartItem(result.cartData); 
            } else {
                return;
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of Object.keys(cartItem)) {
            if (cartItem[item] > 0) {
                let itemInfo = bikeAccessories.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price.newPrice * cartItem[item];
                } else {
                    console.warn(`Item with _id ${item} not found in bikeAccessories.`);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        async function loadData() {
            await fetchBikeAccessoriesList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
            if (storedToken) {
                await loadCartData();
            }
        }
        loadData();
    }, [token]); 

    const contextValue = {
        bikeAccessories,
        addToCart,
        removeFromCart,
        cartItem,
        getTotalCartAmount,
        url,
        token,
        setToken,
        readDate
    };

    return (
        <DochakiContext.Provider value={contextValue}>
            {props.children}
        </DochakiContext.Provider>
    );
};

export default DochakiContextProvider;