import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { recognition } from './Voiceassistant';
import { speak } from './Voiceassistant';
const baseURL = import.meta.env.VITE_API_URL;


const ResDetails = () => {
    const [noitems,setNoitems] = useState()
    const [step, setStep] = useState("resName");
    const [resAccData,setResaccData] = useState({
        resName:"",
        email:"",
        password:"",
        description:"",
        category:"",
            Distict:"",
            City:"",
        phoneNumber:"",
        estimatedDeliveryTime:"",
        
    })
    const navigate = useNavigate()

    const [iems,setitems] = useState({
        
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setResaccData((prev) =>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(resAccData)

        try {
      const res = await axios.post(`${baseURL}/restaurant`,resAccData);
      console.log('Restaurant added:', res.data);
      alert('Restaurant added successfully!');
      navigate('/loginRes')

    } catch (err) {
      console.error('Error adding restaurant:', err);
      alert('Failed to add restaurant');
    }

        
    }

    console.log(noitems)



    return (
        <div className='items'>
            <form onSubmit={handleSubmit}>
                <h2>Shop Account</h2>
                    Restarent Name:<br />
                     <input type='text' name="resName" placeholder='Shop Name' value={resAccData.resName}  onChange={handleChange}/><br/><br/>
                     <br />Email:<br/>
                     <input type="email" placeholder="Email" name='email' value={resAccData.email} onChange={handleChange} required/><br /><br/>
                     Password:<br/>
                     <input type="password" placeholder="Password" name='password' value={resAccData.password} onChange={handleChange} required /><br /><br/>
                description:<br/>
                <input type='text' name="description" placeholder='description of your Restarent' value={resAccData.description} onChange={handleChange} required/><br/><br/>
                category:<br/>
                <input type='text' name="category" placeholder='category (Pizza, Fast Food, Indian, etc.)' value={resAccData.category} onChange={handleChange}/><br/><br/><br/><br/>
                Distict:<br/>
                    <input type="text" name="Distict" placeholder='Enter district name'  value={resAccData.Distict} onChange={handleChange} required /><br/><br/>
                City:<br/>
                    <input type="text" name="City" placeholder='Enter city name' value={resAccData.City} onChange={handleChange} required /><br/><br/>
                phoneNumber:<br/>
                <input type='text' name="phoneNumber" placeholder='phoneNumber' value={resAccData.phoneNumber} onChange={handleChange}/><br/><br/>
                
                estimatedDeliveryTime:<br/>
                <input type='number' name="estimatedDeliveryTime"  value={resAccData.estimatedDeliveryTime}onChange={handleChange} placeholder='estimatedDeliveryTime'/><br/><br/>
                No of items:<br/>
              <br></br>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default ResDetails
