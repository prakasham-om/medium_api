const mongoose=require('mongoose');
require('./schema');
require('./newsFeed')

const uri="mongodb+srv://prakash:Prakash%401998@cluster0.uek87eu.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("connected db")})
    .catch((err)=>{console.log(err,"not connected")});


//     async function connection(){
   
//     try{

//        const data= await user.find()   
//        console.log(data);   
//     }catch(e){
//         console.log(e);
//     }finally{
//         mongoose.connection.close();
//     }
// }
// connection();

