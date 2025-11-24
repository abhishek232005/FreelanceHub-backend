const  express = require('express')
const authentticate = require('../middlwera/authenticate')
const { subCategory_create } = require('../contorlers/SUBCATEGORY.JS')
const { get_subcategory } = require('../contorlers/SUBCATEGORY.JS')
const { get_singel_subcategory } = require('../contorlers/SUBCATEGORY.JS')
const { update_subcategory } = require('../contorlers/SUBCATEGORY.JS')
const { delete_subcategory } = require('../contorlers/SUBCATEGORY.JS')
const upload = require('../middlwera/fileupload')
const subcategaryRoute = express.Router()

subcategaryRoute.post('/subCategory_create',authentticate,upload.single('image'),subCategory_create)
subcategaryRoute.get('/subCategory_get/:id',authentticate,get_subcategory)
subcategaryRoute.get('/subCategory_get_singel/:id',authentticate,get_singel_subcategory)
subcategaryRoute.post('subCategory_update',authentticate,upload.single('image'),update_subcategory)
subcategaryRoute.post('subCategory_delete',authentticate,delete_subcategory)



module.exports = subcategaryRoute