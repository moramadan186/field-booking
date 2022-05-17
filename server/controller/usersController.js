var querie = require("../database/querie");
var dbconnection = require("../database/connection");
var userModel = require("../model/userModel");
var clubModel = require("../model/clubModel");
var bookingModel = require("../model/bookingModel");
const { set } = require("express/lib/response");
const { json } = require("body-parser");

exports.userSingUp = async (req, res) => {
  console.log(req.body);
  try {
    var userName = req.body.firstName + " " + req.body.surName;
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var userPhone = req.body.phone;
    if (!userName || !userEmail || !userPassword) {
      return res
        .status(500)
        .send(
          "user Name , user Email and user password are required , cannot empty"
        );
    }

    values = [userName, userEmail, userPassword, userPhone];
    var usersSignupQuery = querie.queryList.USERS_SIGNUP_QUERY;
    await dbconnection.dbQuery(usersSignupQuery, values);
    return res.status(201).send("sing up is done");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "sing up failed " });
  }
};
exports.userLogeIn = async (req, res) => {
  try {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var authorizationQuery = querie.queryList.AUTHORIZATION;
    var userCaetItemQuery = querie.queryList.USER_CART_ITEMS;
    var userDBValue = await dbconnection.dbQuery(authorizationQuery, [
      userEmail,
      userPassword,
    ]);

    if (userDBValue.rowCount === 0) {
      return res.status(500).json({ error: "Incorrect Email or Password" });
    } else {
      var bookingDBValue = await dbconnection.dbQuery(userCaetItemQuery, [
        userDBValue.rows[0].user_id,
      ]);
      bookingDBValue.rows.forEach(element => {
        delete element.admins_id;
        delete element.user_id;
      });
      console.log(bookingDBValue.rows);
      return res.status(200).json({
        user_id: userDBValue.rows[0].user_id,
        user_name: userDBValue.rows[0].user_name,
        cardItems: bookingDBValue.rows,
      });
    }
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed log in" });
  }
};