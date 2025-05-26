const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors(
  {
    origin: "https://frontend-task-34.vercel.app",
    credentials: true // Allow credentials if needed
  }
));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String
});
const User = mongoose.model("User", userSchema);

// POST endpoint
app.post("/submit", async (req, res) => {
  const { name, email, number } = req.body;
  try {
    const user = new User({ name, email, number });
    await user.save();
    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    console.error("Error saving user:", err); // Add this line
    res.status(500).json({ error: "Failed to save user" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
