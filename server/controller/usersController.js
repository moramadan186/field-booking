var querie =require("../database/querie");
var dbconnection =require('../database/connection');
var userModel =require("../model/userModel");
const { set } = require("express/lib/response");
const { json } = require("body-parser");


exports.userSingUp = async (req,res)=>{
    console.log(req.body);
    try {
    var userName=req.body.firstName + " "+req.body.surName;
    var userEmail=req.body.email;
    var userPassword=req.body.password;
    var userPhone=req.body.phone;
    if(!userName|| !userEmail || !userPassword){
        return res.status(500).send('user Name , user Email and user password are required , cannot empty')
    }

    values=[userName,userEmail,userPassword,userPhone];
    var usersSignupQuery=querie.queryList.USERS_SIGNUP_QUERY;
    await dbconnection.dbQuery(usersSignupQuery ,values);
    return res.status(201).send("sing up is done")
    } catch (err) {
        console.log("Error : "+ err)
        return res.status(500).send({error:'sing up failed '})
    }
    
}
exports.userLogeIn = async (req,res)=>{
    try {
        var userEmail=req.body.email;
        var userPassword=req.body.password;
        var authorizationQuery=querie.queryList.AUTHORIZATION;
        var userData = userModel.userData;
        var userDBValue = await dbconnection.dbQuery(authorizationQuery,[userEmail ,userPassword]);
        userDB=JSON.stringify(userDBValue.rows[0]);
        if((JSON.stringify(userDBValue.rows))==="[]"){
            return res.status(500).send({error:'Incorrect Email or Password'})
        }
        else
        {
            var userDataValue = new userData(
            JSON.parse(userDB).user_id,
            JSON.parse(userDB).user_name,
            JSON.parse(userDB).user_email,
            JSON.parse(userDB).user_password,
            JSON.parse(userDB).user_phone);
            return res.status(200).json({
                user_id :userDataValue.user_id ,
                user_name :userDataValue.user_name,
            });
        }

    } catch (err) {
        console.log("Error : "+err)
        return res.status(500).send({error:'failed log in'})
    }

}