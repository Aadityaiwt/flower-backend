const Admin = require("../Models/adminModel");

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

    const admin = new Admin({
      name,
      email,
      password,
      role: "user",
    });

    await admin.save();

    res.json({
      success: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.json({
        success: false,
        message:
          "Invalid Email or Password Or not exists this account Please signup",
      });
    }

    res.json({
      success: true,
      message: "Login Successfully",
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
