const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// message schema
const Message = mongoose.model("Message", {
name: String,
email: String,
message: String
});

// API route
app.post("/contact", async (req, res) => {

const { name, email, message } = req.body;

try{
const newMessage = new Message({ name, email, message });
await newMessage.save();

res.json({success:true});
}
catch(err){
res.json({success:false});
}

});

app.listen(5000, () => {
console.log("Server running on port 5000");
});