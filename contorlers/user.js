const User = require('../model/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrothey = "abhishekgwala2005"
const fs = require('fs')

const register = async (req, res) => {
    try {
      // Destructure the incoming data
      const { name, email, password, role } = req.body;
  
      // Check if all required fields are present
      if (!name || !email || !password || !role) {
        return res.status(400).send({ message: 'All fields are required' });
      }
  
      // Check if user already exists
      const find_user = await User.findOne({ email });
      if (find_user) {
        return res.status(400).send({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashpassword = await bcrypt.hash(password, 12);
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashpassword,
        role,
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id },secrothey, { expiresIn: '2d' });
  
      // Send response with success message and user data
      res.status(201).send({
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
        success: true,
      });
    } catch (error) {
      console.error(error); 
      res.status(500).send({ message: error.message || 'Server Error' });
    }
  };


//login 

const login = async (req,res)=>{
    try {
      const {email,password} = req.body  
      if(!email || !password){
        res.status(401).send({message:"email or pasword is required"})
      }

      const find_user = await User.findOne({email})
      if(!find_user){
        res.status(400).send({message:"user not fund"})
      }

      const compare_password = await bcrypt.compare(password,find_user.password)
      if(!compare_password){
        res.status(400).send({message:"Invailed Password"})
      }

      const token = jwt.sign({id:find_user._id},secrothey,{expiresIn:"2d"})

      res.status(200).json({
        message: "Login successful",
        find_user,
        token,
        success:true
      });
    } catch (error) {
        
        console.log(error);
        res.status(501).send({message:error.message})
        
    }
}

// get_singel
const get_singel = async (req,res)=>{
try {
    const find_user = await User.findById(req.user._id)
    if(!find_user){
        res.status(400).send({message:"user not found"})
    }
    res.status(201).send(find_user)
} catch (error) {
 console.log(error);
 res.status(501).send({message:error.message})
    
}
}


const update_profile = async (req, res) => {
  try {
    const { name, bio, skills, address } = req.body;
    let imagepath = req.user?.profilePicture || ""; // Default to existing profile picture

    // Handle file upload
    if (req.files && req.files.profilePicture) {
      const uploadedFile = req.files.profilePicture;
      imagepath = uploadedFile.path; // Adjust based on multer's configuration

      
      if (req.user.profilePicture) {
        fs.unlink(req.user.profilePicture, (err) => {
          if (err) console.error("Error deleting old profile picture:", err);
        });
      }
    }

    // Parse skills if it's a valid JSON string
    let parsedSkills = [];
    if (skills) {
      try {
        parsedSkills = JSON.parse(skills);
      } catch (err) {
        return res.status(400).send({ message: "Invalid skills format", success: false });
      }
    }

    const _id = req.params.id;
    console.log("Received User ID:", _id)
    if (!_id) {
      return res.status(400).send({ message: "User ID is required", success: false });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      {
        name,
        bio,
        skills: parsedSkills,
        address,
        profilePicture: imagepath,
      },
      { new: true } 
    );

    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    res.status(200).send({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};





// delete
const delete_user = async (req,res)=>{
try {
    const {userId} = req.params._id
    const user = await User.findByIdAndDelete(userId)
    if(!userId){
        res.status(400).send({message:"user not found"})
    }

    res.status(201).send({message:"User Delete SuccessFully",success:true,user})
} catch (error) {
    console.log(error);
    res.status(501).send({message:error.message})
    
}
}

    module.exports = {register,login,get_singel,update_profile,delete_user}