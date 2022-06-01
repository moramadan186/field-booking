var querie = require("../database/querie");
var dbconnection = require("../database/connection");
const { set } = require("express/lib/response");
const { json } = require("body-parser");

exports.adminClubs = async (req, res) => {
  console.log(req.params);
  try {
    var adminsId = req.params.adminsId;
    var adminClubsQuery = querie.queryList.ADMIN_CLUB;
    var adminClubsDBValue = await dbconnection.dbQuery(adminClubsQuery, [
      adminsId,
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
    return res.status(200).json({
      ...adminClubsDBValue.rows,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed log in" });
  }
};

exports.addNewClub = async (req, res) => {
  console.log(req.body);
  try {
    var adminsId = req.body.adminsId;
    var clubName = req.body.clubName;
    var from = req.body.from;
    var to = req.body.to;
    var clubLocation = req.body.clubLocation;
    var clubPrice = req.body.clubPrice;
    var urlImage = req.body.urlImage;
    var clubDescription = req.body.clubDescription;
    if (!adminsId || !clubName || !from || !to || !clubLocation || !clubPrice) {
      return res.status(500).json({
        error:
          "admins Id , club Name , from , to , clubLocation and clubPrice  are required , cannot empty",
      });
    }

    var addClubQuery = querie.queryList.ADD_CLUB;
    await dbconnection.dbQuery(addClubQuery, [
      adminsId,
      clubName,
      from,
      to,
      clubLocation,
      clubPrice,
      urlImage,
      clubDescription,
    ]);

    return res.status(200).json({
      cartItems: `new Club Added`,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed club cart" });
  }
};

exports.deleteClub = async (req, res) => {
  console.log(req.params);
  try {
    var clubId = req.params.clubId;
    var deleteClubQuery = querie.queryList.DELETE_CLUB;
    await dbconnection.dbQuery(deleteClubQuery, [clubId]);
    return res.status(200).json("club is deleted");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({ error: "sign up failed " });
  }
};

exports.clubsDashboard = async (req, res) => {
  console.log(req.params);
  try {
    var clubId = req.params.clubId;
    var clubProfileQuery = querie.queryList.CLUB_PROFILE;
    var clubProfileDB = await dbconnection.dbQuery(clubProfileQuery, [clubId]);
    return res.status(200).json({
      clubName: clubProfileDB.rows[0].club_name,
      from: clubProfileDB.rows[0].club_time_work_from,
      to: clubProfileDB.rows[0].club_time_work_to,
      location: clubProfileDB.rows[0].club_location,
      clubPrice: clubProfileDB.rows[0].club_price,
      clubImage: clubProfileDB.rows[0].url_image,
      clubDescription: clubProfileDB.rows[0].club_description,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed log in" });
  }
};

exports.updateClub = async (req, res) => {
  console.log(req.body);
  try {
    var adminsId = req.body.adminsId;
    var clubName = req.body.clubName;
    var from = req.body.from;
    var to = req.body.to;
    var clubLocation = req.body.clubLocation;
    var clubPrice = req.body.clubPrice;
    var urlImage = req.body.urlImage;
    var clubDescription = req.body.clubDescription;
    var updateClubQuery = querie.queryList.UPDATE_CLUB;
    await dbconnection.dbQuery(updateClubQuery, [
      adminsId,
      clubName,
      from,
      to,
      clubLocation,
      clubPrice,
      urlImage,
      clubDescription,
    ]);

    return res.status(200).json({
      cartItems: `new Club Added`,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed club cart" });
  }
};
