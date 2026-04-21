const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products:[
        {
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    }
],
totalAmount: {
    type: Number,
    type: Number,
    required: true
},

name: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true
},

contact: {
    type: Number,
    required: true
},

address: {
    type: String,
    required: true
},

pincode: {
    type: Number,
    required: true
},

status: {
    type:String,
    default: "pending"
},


}, {timestamps: true})

module.exports = mongoose.model('order', orderSchema)