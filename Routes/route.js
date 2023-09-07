 //require('passport-setup')
const fs=require('fs');
const news= require('../DB/newsFeed');
const user=require('../DB/schema');
const passport = require('passport'); 
const multer=require('multer');
const path=require('path');
const { ObjectId } = require('mongodb');
const router=require('express').Router();

const Storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{ 
        cb(null,file.fieldname+Date.now() +path.extname(file.originalname));
    }
})

const upload=multer({
    storage:Storage,
})


router.get('/',(req,res)=>{
    res.end('<h1>WelCome to the Backend Home page</h1>')
})

const utcDate=Date.now()

router.post('/api/poststory',upload.single('image'),async(req,res)=>{

    try{
    const newData = new news({
        title:req.body.title,
        subtitle:req.body.subtitle,
        catagory:req.body.catagory,
        image:req.file.filename,  
         });
      await newData.save();
        
         res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error check your code' });
    } 
})

//email data fetch for uservarification
router.get('/api/user/:id',async(req,res)=>{

    const user_details= await user.find({_id:id})
    res.json(user_details);
})

//news data fetch for NewsfeedPage
router.get('/api/news',async(req,res)=>{
    const news_article=await news.find();
    res.json(news_article);
 })


router.get('/profile', (req, res) => {
    if (req.session.user) {
      res.send(`Hello, ${req.session.user.displayName} (${req.session.user.email})!`);
    } else {
      res.redirect('/');
    }
  });


module.exports=router;