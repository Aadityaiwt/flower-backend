const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require ('../config/cloudnary')

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder:"products",
        allowed_format:['jpg', 'png', 'jpeg']
    }
})

const upload = multer({storage})

module.exports = upload