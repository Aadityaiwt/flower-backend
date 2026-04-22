const Order = require("../Models/orderMode");

exports.createOrder = async (req, res) => {
  try {
    const { cart, name, email, contact, address, pincode } = req.body;

    // Required check
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!name || !email || !contact || !address || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Name validation
    if (name.length < 3 || /\d/.test(name)) {
      return res.status(400).json({ message: "Invalid name" });
    }

    // Email validation
    if (!email.includes("@") || !email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Contact validation (10 digit, start 6-9)
    if (!/^[6-9]\d{9}$/.test(contact)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    // Pincode validation (6 digit)
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    // Address validation
    if (address.length < 10) {
      return res.status(400).json({ message: "Invalid address" });
    }

    // total calculate
    const totalAmount = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = new Order({
      products: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      totalAmount,
      name,
      email,
      contact,
      address,
      pincode,
    });

    const savedOrder = await order.save();

    return res.json({
      message: "Order Created Successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
