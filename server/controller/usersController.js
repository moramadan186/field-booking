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
    var firstName = req.body.firstName;
    var surName = req.body.surName;
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var userPhone = req.body.phone;
    if (!firstName || !surName || !userEmail || !userPassword) {
      return res.status(500).json({
        error:
          "user Name , user Email and user password are required , cannot empty",
      });
    }

    values = [firstName, surName, userEmail, userPassword, userPhone];
    var usersSignupQuery = querie.queryList.USERS_SIGNUP_QUERY;
    await dbconnection.dbQuery(usersSignupQuery, values);
    return res.status(201).json("sign up is done");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({ error: "sign up failed " });
  }
};
exports.userLogeIn = async (req, res) => {
  try {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var authorizationQuery = querie.queryList.AUTHORIZATION;
    var cartItemQuery = querie.queryList.CART_ITEMS;
    var userDBValue = await dbconnection.dbQuery(authorizationQuery, [
      userEmail,
      userPassword,
    ]);

    if (userDBValue.rowCount === 0) {
      return res.status(500).json({ error: "Incorrect Email or Password" });
    } else {
      var cartItemDBValue = await dbconnection.dbQuery(cartItemQuery, [
        userDBValue.rows[0].user_id,
      ]);
      return res.status(200).json({
        user_id: userDBValue.rows[0].user_id,
        firstName: userDBValue.rows[0].user_firstname,
        surName: userDBValue.rows[0].user_surname,
        email: userDBValue.rows[0].user_email,
        phone: userDBValue.rows[0].user_password,
        password: userDBValue.rows[0].user_phone,
        profileIMG: userDBValue.rows[0].user_profileimg,
        cardItems: cartItemDBValue.rows,
      });
    }
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed log in" });
  }
};
