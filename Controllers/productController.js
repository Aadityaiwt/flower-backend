const Product = require('../Models/productModel.js')

// Add product

exports.addProduct = async(req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            des:req.body.des,
            price:req.body.price,
            image:req.file.path
        })
        const result = await newProduct.save()
        res.json({data:result})
    } catch (error) {
        res.status(500).json({message: "Error adding Product"})
    }
}

// Update Product

exports.updateProduct = async(req, res) => {
    try {
        const id = req.params.id

        let updateData = {
            title:req.body.title,
            des:req.body.des,
            price:req.body.price
        }
        if(req.file) {
            updateData.image = req.file.path
        }

        const updateProduct = await Product.findByIdAndUpdate(id, updateData, {new:true})

        res.json({message:"Product Update Successfully", updateProduct})
    } catch (error) {
        res.status(500).json({message:"Error updating Product"});
    }
}

// Get All product

exports.getProduct = async(req, res) => {
    try {
        const product = await Product.find()
        res.json({message: "Product Found", product})
    } catch (error) {
        console.log(error);
        
    }
}

// Get Single Product

exports.getSingleProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!Product) {
            return res.json({message: "Data not found"})
        }
        res.json({message: "Product Found", product})
    } catch (error) {
        console.log(error);
        
    }
}

// Delete Product

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if(!deletedProduct) {
            return req.json("Product Id missing")
        }
        res.json({message: "Product Deleted", deletedProduct})
    } catch (error) {
        console.log(error);
    }
}

