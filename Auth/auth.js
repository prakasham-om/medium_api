const passport=require('passport');
const jwt = require('jsonwebtoken');
const user=require('../DB/schema');
const { redirect } = require('react-router-dom');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy ({
    clientID: '200626424557-krast87d5j5ar67679p490l1f1e8hqae.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL: "/auth/google/callback",
    },
     async (accessToken, refreshToken, profile, done)=>{
        try{
            const existUser=await user.findOne({email:profile.emails[0].value});
            if(existUser){
                    redirect('http://localhost:3000/signin');
            }
            if(!existUser){
            const newUser=new user({
                            userName:profile.displayName,
                            image:profile.photos[0].value,
                            email:profile.emails[0].value
                            
                         });
                 await newUser.save()
                // const token=await jwt.sign({id:newUser._id,created:Date.now().toString()},
                // process.env.JWT_SECRET
                // );
                // newUser.token.push(token)
                // await newUser.save()
                 done(null,newUser);
             }
        }catch(e){
            console.log(e)
        }
  //for db
  console.log(profile.emails[0].value);
  //  console.log(accessToken)
    done(null,profile )
    }
))

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})


