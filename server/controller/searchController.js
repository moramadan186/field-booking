var querie = require("../database/querie");
var dbconnection = require("../database/connection");
//var date;
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
    var date = req.params.date;
    if (!date) {
      return res.status(500).json("date is empty")
    }
    var clubProfileQuery = querie.queryList.CLUB_PROFILE;
    var clubProfileDB = await dbconnection.dbQuery(clubProfileQuery, [clubId]);
    var busyTimeQuery = querie.queryList.BUSY_TIME;
    var busyTime = await dbconnection.dbQuery(busyTimeQuery, [clubId, date]);
    var from = parseInt(
      clubProfileDB.rows[0].club_time_work_from.substring(0, 2)
    );
    var to = parseInt(clubProfileDB.rows[0].club_time_work_to.substring(0, 2));
    var time = {};
    for (var i = from; i <= to; i++) {
      time[`0${i}:00:00`] = `available`;
    }

    for (var j = 0; j < busyTime.rows.length; j++) {
      for (var i = from; i <= to; i++) {
        if (busyTime.rows[j].start_time == `0${i}:00:00`) {
          time[`0${i}:00:00`] = `busy`;
        }
      }
    }
    console.log(date);
    return res.status(200).json({
      clubName: clubProfileDB.rows[0].club_name,
      from: clubProfileDB.rows[0].club_time_work_from,
      to: clubProfileDB.rows[0].club_time_work_to,
      location: clubProfileDB.rows[0].club_location,
      clubPrice: clubProfileDB.rows[0].club_price,
      clubImage: clubProfileDB.rows[0].url_image,
      clubDescription: clubProfileDB.rows[0].club_description,
      times: time,
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: "failed search" });
  }
};
