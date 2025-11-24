const express = require('express')
const { register, login, get_singel, update_profile, delete_user } = require('../contorlers/user')
const authentticate = require('../middlwera/authenticate')
const upload = require('../middlwera/fileupload')
const userroute = express.Router()

userroute.post('/register',register)
userroute.post('/login',login)
userroute.get('/singel_user',authentticate,get_singel)
userroute.put('/update-profile/:id',upload.single('profilePicture'),authentticate,update_profile)
userroute.delete('/delete-profile',authentticate,delete_user)



module.exports = userroute