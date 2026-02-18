import React, { useEffect, useState } from "react";
import axios from "axios";
import EditItem from "./EditItem";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [data, setData] = useState(null);
  const [extra, setExtra] = useState([]);

  const role = localStorage.getItem("role");
  const token =
    role === "restaurant"
      ? localStorage.getItem("restaurantToken")
      : localStorage.getItem("userToken");
const navigator = useNavigate()
      if(!token) {
        navigator('/loginchoice');
      }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // profile
        const profileUrl =
          role === "restaurant"
            ? `${baseURL}/restaurant/profile`
            : `${baseURL}/customer/profile`;

        const res = await axios.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);

        // extra data
        const extraUrl =
          role === "restaurant"
            ? `${baseURL}/restaurant/items`
            : `${baseURL}/customer/orders`;

        const res2 = await axios.get(extraUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExtra(res2.data);
        console.log(res2.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAll();
  }, [role, token]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>My Profile</h1>

      {role === "customer" ? (
        <>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>

          <h2>My Orders</h2>
          {extra.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            extra.map((o) => (
              <div key={o._id}>
                {o.items.map((i, index) => (
                  <p key={index}>
                    {i.item} - ₹{i.price}
                  </p>
                ))}
                <hr />
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <p>Shop Name: {data.resName}</p>
          <p>Email: {data.email}</p>

          <h2>My Items</h2>
          {extra.map((i) => (
            <EditItem key={i._id} itemData={i} token={token} />
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;
