// app.use(express.static(path.resolve(__dirname, '../client/src')));
// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

// app.use("/api", usersRoute);
// app.use(express.static('../client'));
// const path = require('path');
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var usersRoute = require('./route/usersRoute');

const PORT = process.env.port
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", usersRoute);

app.listen(PORT, () => {
  console.log("Server started...................");
});
