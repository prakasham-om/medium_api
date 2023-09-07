//create schema
const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
   userName:{type:String,required:true},
   image:{type:String},
   email:{type:String,required:true,unique:true},
   token:[String]
});


//create model
const user=new mongoose.model("Information",productSchema);

module.exports=user;