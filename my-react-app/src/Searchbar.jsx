import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const Searchbar = () => {
    const [query, setQuery] = useState("");
    const [restaurant, setRestaurants] = useState([]);

    const searchRes = async (value) => {
        setQuery(value);

        if (!value) {
            setRestaurants([]);
            return;
        }

        const res = await axios.get(
            `${baseURL}/searchRes?q=${value}`
        );
        setRestaurants(res.data);
    };

    return (
        <div className="search">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search for restaurant, item or more"
                    onChange={(e) => searchRes(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="search-res">
                <h3>Restaurants</h3>
                <ul>
                    {restaurant.map((r) => (
                        <Link key={r._id} to={`/menu/${r._id}`}>
                        <div id="sea-res" key={r._id}>
                             <h3 class="res-name">{r.resName}</h3>

    <p class="res-category">•{r.category}</p>

    <p class="res-description">
      {r.description}
    </p>

    <div class="res-meta">
      <span class="res-status open">Open Now</span><br />
      <span class="res-time">Delivery Time:🕒 {r.estimatedDeliveryTime}</span>
    </div>

    <p class="res-location">📍 {r.Distict}, {r.City}</p>

    <p class="res-phone">📞 +91 {r.phoneNumber}</p>
                        </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Searchbar;
