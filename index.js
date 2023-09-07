const express=require('express');
const passport = require('passport');
const bodyParser = require('body-parser')
const cors=require('cors');
require('dotenv').config();
require('./Auth/auth');
const port=process.env.PORT||5000
const app=express();
const session=require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const authRouter=require('./Auth/authroute')



app.use(cors({origin:'*',methods:"GET,POST,PUT,DELETE",credentials:true}))

app.use(bodyParser.json())
const router=require('./Routes/route')
app.use(router);

// const store = new MongoDBStore({
//     uri: process.env.MONGODB_URI,
//     collection: 'user', // Collection name for storing sessions
 // }); 
app.use(session(
    {
        secret:"key",
        name:"test",
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false,maxAge:24*60*60*100}
    }
    ));

    app.use(passport.initialize());
    app.use(passport.session());


      
app.use(express.json())   
app.use(authRouter);
app.use(express.static('uploads'));


require('./DB/index')
 
app.listen(port,()=>{
    console.log("server started");
})









