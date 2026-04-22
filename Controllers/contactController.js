const Contact = require("../Models/contactModel");

// ? Create
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(200).json({ message: "Message Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving message", error });
  }
};

// ? Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// ? Delete Contact
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Contact Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
};