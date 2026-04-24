const Admin = require("../Models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await admin.save();

    res.json({
      success: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // ?? compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({
      id: admin._id,
      role: admin.role,
    },
    "secretkey",
    {expiresIn: "1d" }
  
  );

    res.json({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.send(error);
  }
};
