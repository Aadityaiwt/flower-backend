const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../Controllers/contactController");

router.post("/contact", createContact);

router.get("/contact/get-all", getAllContacts);

router.delete("/contact/delete/:id", deleteContact);

module.exports = router;