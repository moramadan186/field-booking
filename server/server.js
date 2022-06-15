var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var usersRoute = require("./route/usersRoute");
var searchRoute = require("./route/searchRouter");
var cartItemsRouter = require("./route/cartItemsRouter");
var adminsRouter = require("./route/adminsRouter");
var clubRouter = require("./route/clubRouter");

const PORT = process.env.PORT || 5000;
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", usersRoute);
app.use("", searchRoute);
app.use("", cartItemsRouter);
app.use("", adminsRouter);
app.use("", clubRouter);

app.listen(PORT, () => {
  console.log("Server started...................");
});
