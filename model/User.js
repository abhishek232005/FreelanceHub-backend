const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["freelancer", "client"],  
    required: true,
  },
  profilePicture: {
    type: String,  
  },
  bio: {
    type: String,
  },
  skills: [{
    type: String,  
  }],
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  skills:{
    type:[{category:{
      type:mongoose.Schema.Types
      .ObjectId,
      ref:"Category"
    },
    subcategory:{
      type:mongoose.Schema.Types
      .ObjectId,
      ref:"SubCategory"
    },amount:Number}]
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User
