var querie = require("../database/querie");
var dbconnection = require("../database/connection");
const { set } = require("express/lib/response");
const { json } = require("body-parser");

exports.adminSingUp = async (req, res) => {
  console.log(req.body);
  try {
    var ssdId = req.body.ssdId;
    var firstName = req.body.firstName;
    var surName = req.body.surName;
    var adminEmail = req.body.adminEmail;
    var adminPassword = req.body.adminPassword;
    var adminPhone = req.body.adminPhone;
    if (
      !ssdId ||
      !firstName ||
      !surName ||
      !adminEmail ||
      !adminPassword ||
      !adminPhone
    ) {
      return res.status(500).json({
        error:
          "ssdId ,firstName ,surName,adminEmail ,adminPassword and adminPhone  are required , cannot empty",
      });
    }

    var adminSignupQuery = querie.queryList.ADMIN_SIGNUP_QUERY;
    await dbconnection.dbQuery(adminSignupQuery, [
      ssdId,
      firstName,
      surName,
      adminEmail,
      adminPassword,
      adminPhone,
    ]);
    return res.status(201).json("sign up is done");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({ error: "sign up failed " });
  }
};
exports.adminLogeIn = async (req, res) => {
  console.log(req.body);
  try {
    var adminEmail = req.body.adminEmail;
    var adminPassword = req.body.adminPassword;
    var adminAuthorizationQuery = querie.queryList.ADMIN_AUTHORIZATION;
    var adminDBValue = await dbconnection.dbQuery(adminAuthorizationQuery, [
      adminEmail,
      adminPassword,
    ]);
    var adminClubsQuery = querie.queryList.ADMIN_CLUB;
    var adminClubsDBValue = await dbconnection.dbQuery(adminClubsQuery, [
      adminDBValue.rows[0].admins_id,
    ]);
    adminClubsDBValue.rows.forEach((e) => {
      e.clubId = e.club_id;
      e.clubName = e.club_name;
      e.from = e.club_time_work_from;
      e.to = e.club_time_work_to;
      e.clubLocation = e.club_location;
      e.clubPrice = e.club_price;
      e.urlImage = e.url_image;
      delete e.club_id;
      delete e.club_name;
      delete e.club_time_work_from;
      delete e.club_time_work_to;
      delete e.club_location;
      delete e.club_price;
      delete e.url_image;
    });
    if (adminDBValue.rowCount === 0) {
      return res.status(500).json({ error: "Incorrect Email or Password" });
    } else {
      return res.status(200).json({
        adminsId: adminDBValue.rows[0].admins_id,
        ssdId: adminDBValue.rows[0].admins_ssd_id,
        firstName: adminDBValue.rows[0].admins_firstname,
        surName: adminDBValue.rows[0].admins_surname,
        email: adminDBValue.rows[0].admins_email,
        password: adminDBValue.rows[0].admins_password,
        phone: adminDBValue.rows[0].admins_phone,
        adminClubs: adminClubsDBValue.rows,
      });
    }
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed log in" });
  }
};
