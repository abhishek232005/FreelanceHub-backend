const Category = require('../model/category')
const fs = require('fs')

const category_create = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        console.log("Request Body:", req.body); 

    
        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

    
        let Imagepath = "";

        
        if (req.file) {
            Imagepath = req.file.path;

            
            if (req.user.Imagepath) {
                fs.unlink(req.user.Imagepath, (err) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                });
            }
        }

        
        const newCategory = new Category({
            name,
            description,
            image: Imagepath?Imagepath : req?.user?.image, 
            isActive: isActive !== undefined ? isActive : true,
        });

        
        const savedCategory = await newCategory.save();

        res.status(201).json({
            message: "Category created successfully.",
            data: savedCategory,
            success:true
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



// get_all_category
const get_all_category = async (req,res)=>{
    try {
        const categories = await Category.find()
        res.status(201).send({category:categories})
    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
        
    }
}

// get_singel_category
const get_singel_category = async (req,res)=>{
    try {
        const _id = req.params._id
        const categories = await Category.findById(_id)
        res.status(201).send(categories)
    } catch (error) {
   res.status(501).send({message:error.message})
    }
}

// get_Update_category
const get_Update_category = async (req,res)=>{
    try {
        const _id = req.params._id
        const { name, description,  isActive } = req.body;
         const imagepath = ""
           if(req?.files){
            imagepath = req.files?.path
            if(req.user?.image){
                fs.unlink(req.user?.image,(err)=>{
                    if(err){
                        console.log(err);
                        
                    }
                })
            }
           }
        const categries = await Category.findByIdAndUpdate(_id,{
            name,description,image:imagepath?imagepath:req.user?.image,isActive
        })
        res.status(201).send(categries)
    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
        
    }
}

// Delete_Category
const Delete_Category = async (req, res) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
      }
  
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
module.exports = {category_create,get_all_category,get_singel_category,get_Update_category,Delete_Category}