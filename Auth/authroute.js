
const passport = require('passport');
const Authrouter=require('express').Router();
const Client_Url='http://localhost:3000/user'


Authrouter.get('/auth/google',passport.authenticate('google',{scope:['profile','email'],}))
Authrouter.get('/auth/google/callback',passport.authenticate('google',{
   successRedirect:Client_Url,
   failureRedirect:'http://localhost:3000/'

}))



Authrouter.get('/logout',(req,res,next)=>{
    req.logout(async(err)=>{
        if(err){
            return next(err);
        }
        else{
           await res.redirect('http://localhost:3000/')
        }
    });
   // res.clearCookie('token');
  
},(req,res)=>{
    
})
  


// Authrouter.post('/login',
//   passport.authenticate('google', {
//     successRedirect: 'https://3000/user',
//     failureRedirect: 'http:3000/login' 
//      // Redirect to login page on failure
//   })
// );

module.exports=Authrouter;