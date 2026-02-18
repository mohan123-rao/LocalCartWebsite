import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const Menu = () => {
  const { restaurantId } = useParams();
  const [items, setItems] = useState([]);
  const [orderitems, setOrderitems] = useState([]);

  //  correct naming (match backend)
  const [address, setAddress] = useState({
    city: "",
    area: "",
    nearby: "",
  });

  // add item
  const setOrder = (item, price) => {
    setOrderitems((prev) => [...prev, { item, price }]);
    console.log(orderitems);
  };

  // handle address input
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // place order
  const Placeorder = async () => {
    // validations
    if (orderitems.length === 0) {
      alert("Add at least one item");
      return;
    }

    if (!address.city || !address.area || !address.nearby) {
      alert("Fill full address");
      return;
    }

    try {
      await axios.post(`${baseURL}/senditems`, {
        orderitems,
        address,
        resId: restaurantId,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      alert("Your Order placed successfully.");

      // reset
      setOrderitems([]);
      setAddress({ city: "", area: "", nearby: "" });

    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  // fetch menu
  useEffect(() => {
    if (!restaurantId) return;

    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/items/${restaurantId}`
        );
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItems();
  }, [restaurantId]);

  return (
    <div>
      <h1>Menu</h1>

      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            <h3>{item.item}</h3>
            <p>₹ {item.price}</p>
            <button onClick={() => setOrder(item.item, item.price)}>
              Add to Cart
            </button>
          </div>
        ))
      )}

      <br /><br />

      <h2>Delivery Address</h2>

      <input
        name="city"
        value={address.city}
        onChange={handleAddress}
        placeholder="City"
      />
      <br />

      <input
        name="area"
        value={address.area}
        onChange={handleAddress}
        placeholder="Area"
      />
      <br />

      <input
        name="nearby"
        value={address.nearby}
        onChange={handleAddress}
        placeholder="Nearby landmark"
      />
      <br />

      <button onClick={Placeorder}>Place Order</button>
    </div>
  );
};

export default Menu;
