import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const Items = () => {
    const [item,setItem] = useState()
    const [price,setPrice] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("restaurantToken")
        try {
      const res = await axios.post(`${baseURL}/items`,{item,price},{headers:{Authorization:`Bearer ${token}`}});
      console.log('Restaurant added:', res.data);
      alert('item added successfully!');
      setItem('')
      setPrice('')
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item');
    }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Item Name:<br />
                <input type="text" value={item} placeholder="enter Item name" required  onChange={(e)=>setItem(e.target.value)}/><br /><br />
                price:<br />
                <input type="number" value={price} placeholder="Enter cost" required onChange={(e)=>setPrice(e.target.value)}/><br /><br />
                <button type="submit">Add items</button><br /><br />
            </form><br />
            <button onClick={() => navigate('/')}>DONE</button>
        </div>
    )
}

export default Items
