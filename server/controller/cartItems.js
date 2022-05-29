var querie = require("../database/querie");
var dbconnection = require("../database/connection");
const { set } = require("express/lib/response");
const { json } = require("body-parser");

exports.addCart = async (req, res) => {
  console.log(req.body);
  try {
    var clubId = req.body.clubId;
    var userId = req.body.userId;
    var date = req.body.date;
    var timeStart = req.body.timeStart;
    var timeEnd = req.body.timeEnd;
    var adminIdQuery = querie.queryList.ADMINS_ID;
    var adminIdDBValue = await dbconnection.dbQuery(adminIdQuery, [clubId]);
    var addCartQuery = querie.queryList.ADD_CART_ITEMS;
    await dbconnection.dbQuery(addCartQuery, [
      userId,
      adminIdDBValue.rows[0].admins_id,
      clubId,
      date,
      timeStart,
      timeEnd,
    ]);
    console.log(adminIdDBValue.rows[0].admins_id);

    /* var cartItemQuery = querie.queryList.CART_ITEMS;
    var cartItemDBValue = await dbconnection.dbQuery(cartItemQuery, [
      userDBValue.rows[0].user_id,
    ]); */

    return res.status(200).json({
      cartItems:`new cart Added`,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed to add cart" });
  }
};

exports.deleteCartItems = async (req, res) => {
  try {
    var bookedId = req.params.bookedId;
    var deleteCartItemQuery = querie.queryList.DELETE_CART_ITEM;
    await dbconnection.dbQuery(deleteCartItemQuery, [bookedId]);
    return res.status(200).json(" Cart Item is deleted");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({ error: "sign up failed " });
  }
};
