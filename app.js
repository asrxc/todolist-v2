const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let item = "";
let items = [];
let workItems = [];

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    day: "numeric",
    weekday: "long",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  item = req.body.newItem;

  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/");
  } else{
    items.push(item)
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(2000, function () {
  console.log("Server running on 2000");
});
