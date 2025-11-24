const Category = require('../model/category')

    const  SubCategory = require('../model/subcategory')
const fs = require('fs')

    const subCategory_create = async (req,res)=>{
        try {
            const { name, description,  isActive, categary } = req.body;
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
            const categaryexist = await Category.findOne({_id:categary})
            if(!categaryexist){
            return  res.status(401).send({message:"categary not fund"})
            }

            const categorycreate = new SubCategory({
                name,description,image: Imagepath?Imagepath :req.user?.image,categary,isActive
            })

            const newcategory = await categorycreate.save()
            res.status(201).send(newcategory)
        } catch (error) {
            console.log(error);
            res.status(501).send({message:error.message})
            
        }
    }


    const get_subcategory = async (req,res)=>{
        try {
            const categoryId = req.params.id
            const subcategory = await SubCategory.find({categary:categoryId})
            res.status(201).send({subcategries:subcategory})
        } catch (error) {
            console.log(error);
            res.status(501).send({message:error.message})
            
        }
    }


    const get_singel_subcategory = async (req,res)=>{
        try {
            const _id = req.params._id
            const subcategory_singel = await SubCategory.findById(_id)
            res.status(201).send(subcategory_singel)
        } catch (error) {
            console.log(error);
            res.status(501).send({message:error.message})
            
        }
    }

    const update_subcategory = async(req,res)=>{
        try {
           const _id = req.params._id 
           const { name, description,  isActive, categary } = req.body;
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
           const subcategries = await SubCategory.findByIdAndUpdate(_id,{
            name,description,image:imagepath?imagepath:req?.user?.image,isActive,categary
           })
           res.status(201).send(subcategries)
        } catch (error) {
            console.log(error);
            res.status(501).send({message:error.message})
            
        }
    }

    // delete_subcategory
    const delete_subcategory = async (req,res)=>{
        try {
            const _id = req.params._id
            const deleteCategries = await SubCategory.findByIdAndDelete(_id)
            if (!deleteCategries) {
                return res.status(404).json({ message: 'SubCategory not found' });
            }
            res.json({ message: 'Category deleted successfully' });


        } catch (error) {
            console.log(error);
            res.status(501).send({message:error.message})
            
        }
    }

    module.exports = {subCategory_create,get_subcategory,get_singel_subcategory,update_subcategory,delete_subcategory}