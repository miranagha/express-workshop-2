
const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs")
//var bodyParser = require('body-parser');
var formidable = require('express-formidable');

var app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html

//const filePath = __dirname + "/data/posts.json";

app.get("/", (req, res) => {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file);
    res.render("index", {
      title: "MIRAN" ,
      posts:parsedFile
    });
});
});
app.get("/my-cv", function(req, res) {
  res.render("my-cv");
});


app.get("/admin", (req, res) => {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file);
    res.render("admin", {
      posts:parsedFile
    });
});
});

app.use(express.static("public", {'extensions': ['html']}));

app.get("/contactinformation", function(req, res) {
  res.send("this is contact page");
});


app.use(formidable());
app.post("/admin", function(req, res) {
  console.log(req.fields)
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      var parsedFile = JSON.parse(file);
       parsedFile.push(req.fields)
      fs.writeFile('data/posts.json',  JSON.stringify(parsedFile, null, 2), function (error) {        
      });
  });
});

app.get('/get-posts', function(req, res){
  res.sendFile(__dirname + '/data/posts.json')
})


app.get("/edit", function(req, res) {
  //console.log(req.query.id)
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file);
     var blogPost = parsedFile.filter(function(post){
       if (post.id === req.query.id){
         return true;
       }
       else{
         return false;
       }
     
    // console.log(post.summary);
      });
     res.render("edit", {
      post:JSON.stringify(blogPost)
    });
     console.log(blogPost[0].title)     
});
});


// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});