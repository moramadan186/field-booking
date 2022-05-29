var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var usersRoute = require('./route/usersRoute');
var searchRoute = require('./route/searchRouter');
var cartItemsRouter = require('./route/cartItemsRouter');

const PORT = process.env.port
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", usersRoute);
app.use("", searchRoute);
app.use("", cartItemsRouter);

app.listen(PORT, () => {
  console.log("Server started...................");
});
