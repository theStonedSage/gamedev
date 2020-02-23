const express=require('express');
const path =require('path');
const router=express.Router();
const passport=require('passport');
const User =require('../models/user');

router.use('/',express.static(path.join(__dirname,'../frontend/login')));

router.get('/',function(req,res){
    
    res.render("login.ejs");
});

module.exports = router;
