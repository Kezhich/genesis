var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

app.use(fileUpload({}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Open /form and /get_json, please.');
})

app.get('/get_json', function (req, res) {
  const fs = require("fs");
  let fileContent = fs.readFileSync("json_done.txt", "utf8");
  res.send(fileContent);
})


app.get('/form', function (req, res) {
  res.setHeader('content-type', 'text/html;charset=utf-8');
  res.write('<form action="/upload" method="POST" enctype="multipart/form-data" >');
  res.write('<input type="file" name="photo">');
  res.write('<input type="submit">');
  res.write('</form>');
  res.end();
})

app.post('/upload', function(req, res) {
  req.files.photo.mv('input.txt');
  res.end("Uploaded!");
  console.log(req.files.photo); // the uploaded file object
  const { exec } = require("child_process");

  exec("python3 parse.py >> json_done.txt", (error, stdout, stderr) => {

  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
