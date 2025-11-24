const mongoose = require('mongoose')
const subcategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        trim: true,
    },

    image: {
        type: String
    },

    isActive: {
        type: Boolean, 
        default: true,
    },

    categary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    }


});

const SubCategory = mongoose.model('subCategory', subcategorySchema);
module.exports = SubCategory
