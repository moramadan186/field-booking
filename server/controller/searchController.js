var querie = require("../database/querie");
var dbconnection = require("../database/connection");
var date;

exports.search = async (req, res) => {
  try {
    var location = req.body.location;
    date = req.body.date;
    if (!location || !date) {
      return res.status(500).json({
        error: "location and date are required , cannot empty",
      });
    }
    var searchForClubQuery = querie.queryList.SEARCH_FOR_CLUB;
    var searchDBValue = await dbconnection.dbQuery(searchForClubQuery, [
      location,
    ]);

    if (searchDBValue.rowCount === 0) {
      return res.status(500).json({ error: "this location out of service" });
    } else {
      return res.status(200).json({
        ...searchDBValue.rows,
      });
    }
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed search" });
  }
};
exports.selectedClub = async (req, res) => {
  try {
    var club_id = req.params.club_id;
    var clubProfileQuery = querie.queryList.CLUB_PROFILE;
    var clubProfileDB = await dbconnection.dbQuery(clubProfileQuery, [club_id]);
    var busyTimeQuery = querie.queryList.BUSY_TIME;
    var busyTime = await dbconnection.dbQuery(busyTimeQuery, [
      club_id,
      date,
    ]);

    return res.status(200).json({
      club_name: clubProfileDB.rows[0].club_name,
      url_image: clubProfileDB.rows[0].url_image,
      club_description: clubProfileDB.rows[0].club_description,
      club_time_work_from: clubProfileDB.rows[0].club_time_work_from,
      club_time_work_to: clubProfileDB.rows[0].club_time_work_to,
      club_price: clubProfileDB.rows[0].club_price,
      Busy_Time: busyTime.rows,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed search" });
  }
};
