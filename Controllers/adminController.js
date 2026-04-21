const Admin = require('../Models/adminModel')

exports.signup = async(req, res) => {
    try {
        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const result = await admin.save()
        res.json({message: "Admin created Successfully"})
        
    } catch (error) {
        res.send(error)
    }
}

exports.login = async(req, res) => {
    try {
        const {email,password} = req.body
        const admin = await Admin.findOne({email, password})
        if(!admin) {
            return res.json({message : "Invalid Email or Password", success:false})
        }
        res.json({message : "Login Successfully",admin, success:true})
    } catch (error) {
        res.send(error)
        
    }
}
