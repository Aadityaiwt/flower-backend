const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.mongodbUrl)
.then(() => console.log("MongoDb is connected"))
.catch((er) => {console.log("Mongo Error")})



app.get('/', (req, res) => {
    res.send("Hello I am commig from node js")
})

const productRoutes = require('./Routes/productRoutes')
app.use('/api', productRoutes)


const adminRoutes = require('./Routes/adminRoutes')
app.use('/api', adminRoutes);


const orderRoute = require('./Routes/orderRoute')
app.use('/api', orderRoute);




app.listen(3000, ()=>{
    console.log("Server is running");
})
