//create schema
const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
   title:{type:String,required:true},
   subtitle:{type:String,required:true},
   image:String,
   catagory:[{type:String}],
   publishedAt:{type:Date,default:new Date()}
});



//create model
const news=new mongoose.model("news",productSchema);

module.exports=news;