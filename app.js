const express=require("express");
const bodyParser=require("body-parser");
const session=require("express-session");
const mongoose =require("mongoose");
const passport=require("passport");
const SteamStrategy=require("passport-steam").Strategy;
const ejs=require("ejs");
const path =require('path');
const User=require('./models/user');
const request=require("request");



const app=express();
const profile=require('./routes/profile');
const login=require('./routes/login');


mongoose.connect("mongodb://localhost:27017/gamecomDB",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine','ejs');
// app.set('views', path.join(__dirname, '/frontend/profile/views'));
app.set('views', [__dirname + '/frontend/profile/views', __dirname + '/frontend/login/views']);


app.use(express.static(__dirname + '/public'));
app.use(session({
    secret:"name",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: "3FC64D8684DE6888477297C67A67FC88"
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      User.findOne({
        steamID: profile._json.steamid
      }, function(err, user) {
        if (err) return done(err);
  
        if (!user) {
          const info=profile._json;
          var user1=new User({
            steamID:info.steamid,
            personaname:info.personaname,
            avatarmedium:info.avatarmedium,
            avatarfull:info.avatarfull,
            realname:info.realname

          })
          user1.save();
          
        }
        profile.identifier = identifier;
        return done(null, profile);
      });
      
      
    });
  }
));

//routes

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/secret');
  });

  app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });

// app.get("/test",function(req,res){
//     options={
//     url:" http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/",
//     method:"GET",
    
//     qs:{
//         appid:"578080",
//         key:"3FC64D8684DE6888477297C67A67FC88",
//         steamid:"76561198117133699"
//         // gameid:"730"
//     }

// }

//     request(options,function(error,response,body){
//         if(error){
//             console.log(error);
//         }
//         else{
//             res.render("show",{data:body});
//         }
//     });
// });



app.use('/',login);
app.use('/profile',profile);



// app.get("/profile",function(req,res){
    
//     if(!req.isAuthenticated()){
//         res.render("login");
//     }
//     else{

//         var parseddata;
//         var self;
    
//         User.findOne({
//             steamID: req.user._json.steamid
//           }, function(err, user) {
//             if(err){
//                 console.log("err");
//             }      
//             id=user.steamID;
//             self=user;

//             options={
//                 url:"http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001",
//                 method:"GET",
//                 qs:{
//                     // appid:"730",
//                     key:"3FC64D8684DE6888477297C67A67FC88",
//                     // steamid:"76561198117133699",
//                     steamid:id,
//                     include_appinfo:"true"
//                     }
//                 }

//                 request(options,function(error,response,body){
//                     if(error){
//                         console.log("err");
//                     }
//                     else{
//                         if(response.statusCode==200){
//                             parseddata=JSON.parse(body)
//                             // console.log(parseddata.response.games);
//                             // res.render("show",{data:body});
//                             if(parseddata){
//                                 res.render("profile",{profile:self,data:parseddata.response.games});
//                             }
//                             else{
//                                 res.render("profile",{profile:self,data:parseddata});
//                             }
//                         }
//                         else{
//                             console.log(response.statusCode);
//                         }
//                     }
//                 });
//           });
//     }
// });

// app.post('/posts',function(req,res){
//   User.findOne({
//     steamID: req.user._json.steamid
//   }, function(err, user) {
//     if(err){
//         console.log("err");
//     }      
//     post=req.body.post;
//     user.posts.push(post);
//     user.save();
   
//     res.redirect("/profile");
        
//   });
// });

// app.get('/deleteall',function(req,res){
//   User.findOne({
//     steamID: req.user._json.steamid
//   }, function(err, user) {
//     if(err){
//         console.log("err");
//     }      
    
//     user.posts=[]
//     user.save();
   
//     res.redirect("/profile");
        
//   });
// });

// app.get("/csgo",function(req,res){
//   options={
//     url:" http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002",
//     method:"GET",
//     qs:{
//         appid:"730",
//         key:"3FC64D8684DE6888477297C67A67FC88",
//         steamid:"76561198117133699",
//         // steamid:id,
//         // include_appinfo:"true"
//         }
//     }

//     request(options,function(error,response,body){
//       if(error){
//           console.log("err");
//       }
//       else{
//           if(response.statusCode==200){
//               res.render("show",{data:body});
//           }
//           else{
//               console.log(response.statusCode);
//           }
//       }
//   });



// });

app.listen(3000,function(){
    console.log("server is running on port 3000");
});










// -------break-------

















//steam Api
// 3FC64D8684DE6888477297C67A67FC88

// options={
//     url:"http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002",
//     method:"GET",
    
//     qs:{
//         appid:"730",
//         key:"3FC64D8684DE6888477297C67A67FC88",
//         steamid:userid
//     }

// }

// request(options,function(error,response,body){
//     if(error){
//         console.log(error);
//     }
//     else{
//         if(response.statusCode==200){
//             res.render("show",{data:body});        
//         }
//         else{
//             console.log(response.statusCode);
//         }
    
//     }
// });

// options={
    //     url:"https://api.pubg.com/shards/pc-as/players/theistiak/seasons/division.bro.official.pc-2018-04",
    //     method:"GET",
        
    //     headers:{
    //         "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MjYwZjNmMC0yMTc5LTAxMzgtZTJmNC03ZDVjOWM4YTdjZWUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTc5OTQwMzM4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImFtaXRiaGF0dGFjaGFyIn0.LyqLUCE7XZLyTtuaKtYd_nE3yxmutT6HUvawN9rD0uU",
    //         "Accept": "application/vnd.api+json"
    //     },

    // }

    // options={
    //     url:"https://api.pandascore.co/tournaments/upcoming",
    //     method:"GET",
        
        
    //     qs:{
    //         token:"4Ya0IQpU8IPD2s9K-pv3aTxSEt8wF7Iwe7Md8_e90OBg9tbnaXE"
    //     }

    // }