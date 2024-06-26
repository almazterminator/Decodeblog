const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GithubStrategy =require('passport-github2').Strategy


passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password , done){
        User.findOne({email}).then(user=>{
            bcrypt.compare(password ,user.password,function(err,result){
                if (err) {return done(err)}
                if(result){return done(null,user)}
            })
        }).catch(e =>{
            return done(e)
        })

    }
))


passport.use(new GithubStrategy({
    clientID: "Ov23libkPm0XUxXi6AvN",
    clientSecret: "27cd3b4aa65eb64da3bb359e899a892d4fbc8968",
    callbackURL: "http://localhost:7000/api/auth/github",
    scope: ['openid','email' , 'profile']

  },
    async function(accessToken, refreshToken, profile, done) {
    const user =await User.find({githubId: profile.id })
    console.log(profile);
    const newUser = await new User({
        githubId: profile.id.username,
        full_name: profile.username,
        
    }).save()
      return done(null, newUser);
   
    }    
));


passport.serializeUser (function(user,done){
    done(null,user._id)
})

passport.deserializeUser (function(id,done){
    User.findById(id).then((user , err )=>{
        done(err,user)
    })
})