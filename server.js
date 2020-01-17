"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
// const ENV         = process.env.ENV || "development";
const bodyParser = require("body-parser");
// const knexConfig  = require("./knexfile");
// const knex        = require("knex")(knexConfig[ENV]);
const PORT = 8080;
const path = require('path');

app.set("view engine", "ejs");

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/barChart/'),
                      path.join(__dirname, 'views/battleship/')]);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));



app.get("/", (req, res) => {
     return res.render("index");
  })

app.get("/aboutme", (req, res) => {
     return res.render("index");
  })


app.get("/resume", (req, res) => {
     return res.render("resume");
  })

app.get("/projects", (req, res) => {
     return res.render("projects");
  })

app.get("/barChart", (req, res) => {
     return res.render("barChartIndex");
  })

app.get("/battleship", (req, res) => {
     return res.render("battleshipIndex");
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

