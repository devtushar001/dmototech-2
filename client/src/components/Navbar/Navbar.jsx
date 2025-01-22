import React, { useContext, useState } from "react";
import './Navbar.css';
import { assets } from "../../assets/assets";
import { fassets } from "../../frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { DochakiContext } from "../Context/Contact";


const Navbar = (props) => {
    const { showLogin, setShowLogin } = props;
    console.log(showLogin)
    const [menu, setMenu] = useState("home");
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();
    const reloadPage = () => {
        window.location.reload()
        window.location.href = '/';
    }
    const { getTotalCartAmount, token, setToken } = useContext(DochakiContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
        setSidebar(false);
    }

    return (
        <>
            <div className="navbar">
                <Link to="/"><img src={assets.logo_blur} alt="" className="logo" onClick={reloadPage} /></Link>
                <ul className="navbar-menu">
                    <Link to="/"> <li className={menu === "home" ? "active" : ""} onClick={() => { setMenu("home") }}>home</li></Link>
                    <Link to='/about-us'> <li className={menu === "about-us" ? "active" : ""} onClick={() => { setMenu("about-us") }}>about-us</li></Link>
                    <Link to='/shop'> <li className={menu === "shop" ? "active" : ""} onClick={() => { setMenu("shop") }}>shop</li></Link>
                    <Link to='/contact-us'> <li className={menu === "contact-us" ? "active" : ""} onClick={() => { setMenu("contact-us") }}>contact us</li></Link>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-search-icon">
                        <Link to="/cart"><img src={fassets.basket_icon} alt="" /></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div>
                    <div id="user-menu" >
                        {!token ? <button onClick={() => setShowLogin(true)}>Login</button> :
                            <div className="navbar-profile">
                                <img id="login-user" src={fassets.profile_icon} />
                                <ul className="nav-profile-dropdown"> <li onClick={() => navigate('/myorders')}>Orders</li>
                                    <hr />
                                    <li onClick={logout}>Logout</li>
                                </ul>
                            </div>}
                    </div>
                    <div className="small-nav-menu">
                        <img onClick={() => { setSidebar(true) }} id="menu-icon" src={assets.menu_icon} alt="" />
                        {sidebar ?
                            <div className="small-menu-list">
                                <div id="user-details">
                                    <span>User</span>
                                    <span className="cross-menu" onClick={() => { setSidebar(false) }}>X</span>
                                </div>
                                <ul id="small-view-links">
                                    <Link to="/"><li onClick={() => { setSidebar(false) }}>home</li></Link>
                                    <Link to="/shop"><li onClick={() => { setSidebar(false) }}>shop</li></Link>
                                    <Link to="/about-us"><li onClick={() => { setSidebar(false) }}>about-us</li></Link>
                                    <Link to="/contact-us"><li onClick={() => { setSidebar(false) }}>contact-us</li></Link>
                                    <Link to="/cart"><li onClick={() => { setSidebar(false) }}>cart</li></Link>
                                    <Link to="/myorders"><li onClick={() => { setSidebar(false) }}>your-order's</li></Link>

                                </ul>
                                <div id="users-data">
                                    {!token ? <button onClick={() => setShowLogin(true)}>Login</button> : <div id="user-system"><img id="login-user" src={fassets.profile_icon} /> <button onClick={logout}>Logout</button> </div> }
                                </div>
                            </div> : ""}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;