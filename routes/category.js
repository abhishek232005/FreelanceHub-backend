const express = require('express')
const authentticate = require('../middlwera/authenticate')
const { category_create, get_singel_category, get_Update_category, Delete_Category, get_all_category } = require('../contorlers/category')
const upload = require('../middlwera/fileupload')
// const { get_subcategory } = require('../contorlers/SUBCATEGORY.JS')
const categaryRoute = express.Router()

categaryRoute.post('/create-category',authentticate,upload.single('image'),category_create)
categaryRoute.get('/get-category',authentticate,get_all_category)
categaryRoute.get('/get-singel-category/:id',authentticate,get_singel_category)
categaryRoute.put('/update-category/:id',authentticate,upload.single('image'),get_Update_category)
categaryRoute.delete('/delete-category/:id',authentticate,Delete_Category)


module.exports = categaryRoute