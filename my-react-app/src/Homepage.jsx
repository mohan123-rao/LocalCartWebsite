import React from 'react'
import './App.css';
import {Link} from 'react-router-dom'
import Restarent from './Restarent';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { recognition,speak } from './Voiceassistant';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const startVoice = () => {
  speak("Welcome to Local cart website. Cheppandi, meeku em kavali");
}

  const navigate = useNavigate()
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${baseURL}/restaurants`);
        setRestaurants(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);


useEffect(() => {
        // Override global listener to add "Biryani" logic while on this page
        const originalResult = recognition.onresult;

        recognition.onresult = (event) => {
            const lastIndex = event.results.length - 1;
            const speechText = event.results[lastIndex][0].transcript.toLowerCase();

            if (speechText.includes("restaurant") || speechText.includes("res") || speechText.includes("food") || speechText.includes("items") || speechText.includes("groceries")) {
                navigate("/search", { state: { query: "biryani" } });
            } else if(speechText.includes("hii") || speechText.includes("hello") || speechText.includes("hey") || speechText.includes("namaste") || speechText.includes("kaise ho") || speechText.includes("salaam")){
                speak("Namaste! Meeku em kavali? Meevu items konali anukuntunnara leda items ammali anukuntunnara cheppandi");
            }
            
            else {
                // If it's not Biryani, let the global controller handle it
                if (originalResult) originalResult(event);
            }
        };

        return () => { recognition.onresult = originalResult; };
    }, [navigate]);

  return (
    <div className='Homepage'>
        <div className='Homepage1'>
        <div className='navbar'>
            <div id='logo'><img src='https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png' width={50}/>Local Cart</div>
            <div className='inner-nav'>
                <div id='aboutus' onClick={() => navigate('/aboutus')}>About Us</div>
                <div id='profile' onClick={() => navigate('/profile')}>Profile</div>
            </div>
        </div>
        <div id='Homepage3'>
            <h2>Order food and Grosery. Discover best shops. Voive Assistant here!
              {/* 🎤 Voice button */}
  <button
    type="button"
    onClick={startVoice}
    style={{
      marginLeft: "10px",
      padding: "0px 0px",
      cursor: "pointer",
      borderRadius:"100px"
    }}
  >🎤</button>
            </h2>
            <form>
  <Link to='/search'>
    <input placeholder='Search for restaurant,grosery shops, item or more'/>
  </Link>
</form>
        </div>

        </div>
        <div className='Homepage2'>
            <br /><br />
            <h2>Order our best food & grosery options</h2><br />
            <div id='foodImages1'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbzhjeKT1IR4WqCP9bWqbtkIoGYzJ7EPm5w&s' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG_bqlartqgjLx0DxPslUQjN_lrXvFtUPEUg&s' width={150} height={150}/>
                <img src='https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2018/12/Instant-Suji-idli.jpg?ssl=1' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlg7JYWWJNnY-MJVGm02itthRtcc105HPt4Q&s' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0PAR2SR40TllYg-vutPD52DCV3cSmcld0w&s' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlNQ2KlqoI-Y1pziuCN5uhV7SvxLuX5nSdFQ&s' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG_bqlartqgjLx0DxPslUQjN_lrXvFtUPEUg&s' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRKGeMstIZbp32iyiVk8FtraGv4UhEoJ1fg&s' width={150} height={150} />
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s' width={150} height={150}/>
            </div>
            <div id='foodImages2'>
                <img src='https://tse3.mm.bing.net/th/id/OIP.gwenI6ux1VRN9HV7QQdA0wHaF7?pid=Api&P=0&h=180' width={150} height={150}/>
                <img src='https://static.vecteezy.com/system/resources/previews/051/960/680/non_2x/an-assortment-of-various-grocery-items-including-fruits-bread-cereals-and-jars-arranged-neatly-for-display-perfect-for-food-related-projects-png.png' width={150} height={150}/>
                <img src='https://tse3.mm.bing.net/th/id/OIP.DXpaUZSzQRS1nOU4bvSktQHaE7?pid=Api&P=0&h=180' width={150} height={150}/>
                <img src='https://c8.alamy.com/comp/HXYTGP/snack-chip-selection-at-grocery-store-HXYTGP.jpg' width={150} height={150}/>
                <img src='https://tse4.mm.bing.net/th/id/OIP.RCNfUjp5JC0n9dY4efGhpgAAAA?pid=Api&P=0&h=180' width={150} height={150}/>
                <img src='https://tse4.mm.bing.net/th/id/OIP.UqqTa19Z7fiHZa_-uLllVwHaE8?pid=Api&P=0&h=180' width={150} height={150}/>
                <img src='https://static.vecteezy.com/system/resources/previews/035/772/223/non_2x/grocery-store-front-with-window-and-door-png.png' width={150} height={150}/>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbzhjeKT1IR4WqCP9bWqbtkIoGYzJ7EPm5w&s' width={150} height={150}/>
                <img src='https://i.pinimg.com/736x/15/de/17/15de17871e9db63e116e68af967f552f.jpg' width={150} height={150}/>
            </div>
            <h2>Restarents</h2>
            <div className='restarents'>
               {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
    ) : (
        restaurants.map(res => (
            <Link key={res._id} to={`/menu/${res._id}`}>
                <Restarent
                resName={res.resName}
                description={res.description}
                category={res.category}
                Distict={res.Distict}
                City={res.City}
                estimatedDeliveryTime={res.estimatedDeliveryTime}
                phoneNumber={res.phoneNumber}
            />
            </Link>
        ))
    )}
            </div>
        </div>
        <footer>
            <div id='Company'>
                <h3>Company</h3>
                <p>About Us</p>
                <p>Careers</p>
                <p>Team</p>
                <p>Minis</p>
                <p>Pyng</p>
            </div>
            <div id='Contact us'>
                <h3>Contact us</h3>
                <p>Help & Support</p>
                <p>Partner with Us</p>
                <p>Ride with us</p>
            </div>
            <div id='Legal'>
                <h3>Legal</h3>
                <p>Terms & Conditions</p>
                <p>Cookie Policy</p>
                <p>Privacy Policy</p>
            </div>
            <div id='Available in'>
                <h3>Available in</h3>
                <p>Banalore</p>
                <p>Gurgaon</p>
                <p>Hyderbad</p>
                <p>Delhi</p>
                <p>Mumbai</p>
                <p>Pune</p>
            </div>
        </footer>
    </div>
  )
}

export default Homepage
