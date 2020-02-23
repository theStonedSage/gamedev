const express=require('express');
const path =require('path');
const router=express.Router();
const User =require('../models/user');
const request=require("request");


router.use('/',express.static(path.join(__dirname,'../frontend/profile')));

router.get("/",function(req,res){
    
    if(!req.isAuthenticated()){
        res.redirect('/');
    }
    else{

        var parseddata;
        var self;
    
        User.findOne({
            steamID: req.user._json.steamid
          }, function(err, user) {
            if(err){
                console.log("err");
            }      
            id=user.steamID;
            self=user;

            options={
                url:"http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001",
                method:"GET",
                qs:{
                    // appid:"730",
                    key:"3FC64D8684DE6888477297C67A67FC88",
                    steamid:"76561198117133699",
                    // steamid:id,
                    include_appinfo:"true"
                    }
                }

                request(options,function(error,response,body){
                    if(error){
                        console.log("err");
                    }
                    else{
                        if(response.statusCode==200){
                            parseddata=JSON.parse(body)
                            // console.log(parseddata.response.games);
                            // res.render("show",{data:body});
                            if(parseddata){
                                res.render("profile.ejs",{profile:self,data:parseddata.response.games});
                            }
                            else{
                                res.render("profile.ejs",{profile:self,data:parseddata});
                            }
                        }
                        else{
                            console.log(response.statusCode);
                        }
                    }
                });
          });
    }
});

router.post('/posts',function(req,res){
  User.findOne({
    steamID: req.user._json.steamid
  }, function(err, user) {
    if(err){
        console.log("err");
    }      
    post=req.body.post;
    user.posts.push(post);
    user.save();
   
    res.redirect("/profile");
        
  });
});

module.exports = router;
