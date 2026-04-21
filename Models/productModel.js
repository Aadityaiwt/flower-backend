const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    des: String,
    price: String,
    image: String
});

module.exports = mongoose.model('Product', productSchema)