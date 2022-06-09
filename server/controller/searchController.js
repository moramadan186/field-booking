var querie = require("../database/querie");
var dbconnection = require("../database/connection");
var date = "2022-05-31";

exports.search = async (req, res) => {
  console.log(req.body);
  try {
    var location = req.body.location;
    date = req.body.date;
    date = date.substring(0, 4) + date.substring(4, 6) + date.substring(6, 10);
    console.log(date);
    if (!location || !date) {
      return res.status(500).send({
        error: "location and date are required , cannot empty",
      });
    }
    var searchForClubQuery = querie.queryList.SEARCH_FOR_CLUB;
    var searchDBValue = await dbconnection.dbQuery(searchForClubQuery, [
      location,
    ]);
    return res.status(200).json({
      search: searchDBValue.rows,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed search" });
  }
};
exports.selectedClub = async (req, res) => {
  try {
    var clubId = req.params.clubId;
    var clubProfileQuery = querie.queryList.CLUB_PROFILE;
    var clubProfileDB = await dbconnection.dbQuery(clubProfileQuery, [clubId]);
    var busyTimeQuery = querie.queryList.BUSY_TIME;
    var busyTime = await dbconnection.dbQuery(busyTimeQuery, [clubId, date]);
    busyTime.rows.forEach((e) => {
      e.startTime = e.start_time;
      e.endTime = e.end_time;
      delete e.start_time;
      delete e.end_time;
    });
    return res.status(200).json({
      clubName: clubProfileDB.rows[0].club_name,
      from: clubProfileDB.rows[0].club_time_work_from,
      to: clubProfileDB.rows[0].club_time_work_to,
      location: clubProfileDB.rows[0].club_location,
      clubPrice: clubProfileDB.rows[0].club_price,
      clubImage: clubProfileDB.rows[0].url_image,
      clubDescription: clubProfileDB.rows[0].club_description,
      BusyTime: busyTime.rows,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed search" });
  }
};
