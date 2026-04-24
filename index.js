const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongodbUrl)
.then(() => console.log("MongoDB connected"))
.catch(() => console.log("Mongo error"));

app.get('/', (req, res) => {
    res.send("Hello from Node JS");
});

// Routes
app.use('/api', require('./Routes/productRoutes'));
app.use('/api', require('./Routes/adminRoutes'));
app.use('/api', require('./Routes/orderRoute'));
app.use('/api', require('./Routes/contactRoute'));
app.use('/api', require('./Routes/authRoute')); // ?? check name

app.listen(3000, () => {
    console.log("Server running on port 3000");
});