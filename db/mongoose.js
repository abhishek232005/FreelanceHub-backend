const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://abhishekgwala2005_db_user:TFU1V9FjyCruYpLy@cluster0.86nkohy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('mongoose connect successfully');
    
}).catch(()=>{
    console.log("mongoose connection Failed");
    
})