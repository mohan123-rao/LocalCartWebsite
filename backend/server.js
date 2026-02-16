const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Restaurant = require('./restaurantSchema')
const Signup = require('./signupSchema')
const Order = require('./orderSchema')
const cors = require('cors')
const Item = require('./itemSchema')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')
const authMiddleware = require('./authMiddleware')
const Mail = require('nodemailer/lib/mailer')
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(()=>{
console.log("mongodb connected successfully")
})
.catch((err)=>{
console.log(err)
})

// Create a new restaurant
app.post('/restaurant', async (req, res) => {
try {
  const { password, ...restData } = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    const restaurant = new Restaurant(
        {
            ...restData,
        password:hashPassword
    })
    const savedRes = await restaurant.save();
    res.status(201).json(savedRes);
} catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
}
});
app.post('/signup',async (req,res)=>{
try{ 
    const {name,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new Signup({name,email,password:hashPassword})
    const savedRes = await newUser.save();
    res.status(201).json(savedRes);
} catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
}
})


router.post('/login',async (req,res)=>{
try{
    const {email,password} = req.body
    const user = await Signup.findOne({email})
    if(!user){
      return res.status(401).json("invalid email")
    }
    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({ message: "Invalid password" });
}
// jwt token
const token = jwt.sign(
  { id: user._id },
  process.env.secret,
  { expiresIn: "7d" }
);
res.json({
  token,
  user: {
    id: user._id,
    email: user.email
  }
});
}catch (err) {
console.error(err);
res.status(500).json({ message: "Server error" });
}
})


app.post('/items',authMiddleware, async (req,res)=>{
try{ 
    const {item,price} = req.body;
    const newItem = new Item({item,price,restaurantId:req.restaurant.id})
    const savedRes = await newItem.save();
    res.status(201).json(savedRes);
} catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
}
})


// Get all restaurants
app.get('/restaurants', async (req, res) => {
try {
    const restaurants = await Restaurant.find(); // corrected variable
    res.status(200).json(restaurants);
} catch (err) {
   console.error(err);
    res.status(500).json({ message: err.message });
}
});

app.use(router);
// searching route


router.get('/searchRes', async (req,res)=>{
try{
    const query = req.query.q;
    const restaurant = await Restaurant.find({
        resName:{$regex:query,$options:'i'}
    })
    console.log("successfuly searched")
    res.json(restaurant)
}catch(err){
    console.log(err)
    res.status(500).json(err.message)
}
})


router.post("/restaurantlogin", async (req, res) => {
try {
const { email, password } = req.body;
//  findOne (not find)
const user = await Restaurant.findOne({ email });
if (!user) {
  return res.status(400).json({ message: "User not found" });
}
// correct bcrypt compare
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: "Invalid password" });
}
// jwt token
const token = jwt.sign(
  { id: user._id },
  process.env.secret,
  { expiresIn: "7d" }
);
res.json({
  token,
  user: {
    id: user._id,
    email: user.email
  }
});
} catch (err) {
console.error(err);
res.status(500).json({ message: "Server error" });
}
});

//restarent profile data 
app.get('/restaurant/profile',authMiddleware, async (req,res)=>{
  try{
  const resId = req.restaurant.id;
  const resData = await Restaurant.findById(resId)
  res.json(resData)
  }catch(err){
    console.log(err)
  }
})


//customer profile data
app.get('/customer/profile',authMiddleware, async (req,res)=>{
  try{
  const userId = req.restaurant.id;
  const userData = await Signup.findById(userId)
  res.json(userData)
  }catch(err){
    console.log(err)
  }
})



// Get items for a specific restaurant
app.get('/items/:restaurantId', async (req, res) => {
try {
const items = await Item.find({
  restaurantId: req.params.restaurantId
});
res.json(items);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

//send items to restarent by email
//create tranport
const transporter = nodemailer.createTransport({
service:'gmail',
auth:{
user:process.env.email,
pass:process.env.pass
}
})

app.post("/senditems", authMiddleware, async (req, res) => {
  const { orderitems, address,resId} = req.body;
try {
if(!address){
  return res.status(400).json({ message: "Delivery address is required" });
  console.log("delivery address is required")
}


const resData = await Restaurant.findById(resId);
if (!resData) {
  return res.status(404).json({ message: "Restaurant not found" });
}

const itemsText = orderitems
  .map(i => `${i.item} - ₹${i.price}`)
  .join("\n");

await transporter.sendMail({
  from: process.env.email,
  to: resData.email,
  subject: "New Order Received 🍽️",
  text: `Order Details:\n\n${itemsText}
  \n\nDelivery Address:\n\ncity:${address.city}
  \narea:${address.area}
  \nnearby:${address.nearby}
  \n\nPlease prepare the order for delivery!`,
});
res.status(201).json({ message: "Order placed" });
} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}

try{
  const order = new Order({
customerId:req.restaurant.id,
restaurantId:resId,
items:orderitems,
totalAmount:orderitems.reduce((total, item) => total + item.price, 0),
address:{
  city:address.city,
  area:address.area,
  nearby:address.nearby
}
  })
  await order.save()
}catch(err){
  console.log(err)
}
});

app.get('/customer/orders',authMiddleware, async (req,res)=>{
try{
  const orders = await Order.find({customerId:req.restaurant.id}).populate('restaurantId','resName')
  res.json(orders)
}catch(err){
  console.log(err)
  res.status(500).json({message:err.message})
}
})

app.get('/restaurant/items',authMiddleware, async (req,res)=>{
try{
  const items = await Item.find({restaurantId:req.restaurant.id})
  res.json(items)
}catch(err){
  console.log(err)
  res.status(500).json({message:err.message})
}
})

app.put('/restaurant/items/:itemId',authMiddleware, async (req,res)=>{
try{
  const {item,price} = req.body;
  const updatedItem = await Item.findOneAndUpdate(
    {_id:req.params.itemId, restaurantId:req.restaurant.id},
    {item,price},
    {new:true}
  )
  res.json(updatedItem)
}catch(err){
  console.log(err)
  res.status(500).json({message:err.message})
}
})

app.listen(3000,()=>{
console.log("server is created")
})
