const express=require("express");
const mongoose =require("mongoose");

const userSchema= new mongoose.Schema({
    steamID:String,
    personaname:String,
    avatarmedium:String,
    avatarfull:String,
    realname:String,
    posts:[String]
});

const User=mongoose.model("people",userSchema);

module.exports=User;