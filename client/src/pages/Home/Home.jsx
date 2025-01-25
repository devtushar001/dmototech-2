import React, { useState, useContext } from "react";
import { DochakiContext } from "../../components/Context/Contact";
import ShopCategories from "../../components/ShopCategories/ShopCategories";
import './Home.css';
import Header from "../../components/Header/Header";
import AccessoriesDisplay from "../../components/AccesoriesDisplay/AccessoriesDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import ShopNow from "../../components/ShopNow/ShopNow";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import StarIcon from "../../components/StarsIcon/StarIcon";

const Home = () => {
    const [category, setCategory] = useState('All');
    const [activeSubCtg, setActiveSubCtg] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    // const [filteredAccessories, setFilteredAccessories] = useState([]); // State for filtered products
    // const { bikeAccessories } = useContext(DochakiContext);
    return (
        <>
            <div className="home">
                <Header />
                <SocialIcons/>
                <StarIcon/>
                <div className="ksdl">
                    <ShopCategories
                        inputValue={setSearchQuery}
                        category={category}
                        setCategory={setCategory}
                        activeSubCtg={activeSubCtg}
                        setActiveSubCtg={setActiveSubCtg}
                    />
                </div>
                <AccessoriesDisplay category={category} />
                <ShopNow />
                <AppDownload />
            </div>
        </>
    )
}
export default Home;