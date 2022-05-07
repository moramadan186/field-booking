var querie =require("../database/querie");
var dbconnection =require('../database/connection');
const { set } = require("express/lib/response");



exports.userSingUp = async (req,res)=>{
    try {
    var userName=req.body.userName;
    var userEmail=req.body.userEmail;
    var userPassword=req.body.userpassword;
    var userPhone=req.body.userPhone;
    if(!userName|| !userEmail || !userPassword){
        return res.status(500).send('user Name , user Email and user password are required , cannot empty')
    }

    values=[userName,userEmail,userPassword,userPhone];
    var usersSignupQuery=querie.queryList.USERS_SIGNUP_QUERY;
    await dbconnection.dbQuery(usersSignupQuery ,values);
    return res.status(201).send("save store")
    } catch (err) {
        console.log("Error : "+ err)
        return res.status(500).send({error:'failed to save store'})
    }
    
}