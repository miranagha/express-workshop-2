const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs")
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html

app.get("/", (req, res) => {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file);
    res.render("index", {
      title: "Index" ,
      posts:parsedFile
    });

});
});
app.get("/my-cv", function(req, res) {
  res.render("my-cv");
});

app.get("/admin", function(req, res) {
  res.render("admin");
});

app.use(express.static("public", {'extensions': ['html']}));

app.get("/contactinformation", function(req, res) {
  res.send("this is contact page");
});

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});