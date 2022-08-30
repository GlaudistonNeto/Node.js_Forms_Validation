const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

// parse application/x-WWW-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application json
app.use(express.json());

app.use(session({
  secret: 'keyword cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

app.get('/', (req, res) =>{
  res.render('index');
});

app.post("/form", (req, res) => {
  var {email, name, points} = req.body;

  var emailError;
  var pointsError;
  var nameError;

  if (email == undefined || email == "") {
    emailError = "Email cannot be empty";
  }

  if (points == undefined || points < 20) {
    pointsError = "Points cannot be empty or smaller than 20";
  }

  if (name == undefined || name == "") {
    nameError = "Name cannot be empty"
  }

  if (name.length < 4) {
    nameError = "Name cannot be smaller than four characters";
  }

  if (emailError != undefined || pointsError != undefined || nameError != 
      undefined) {
        res.redirect('/');
      } else {
        res.send('You are all done!');
      }
});

app.listen(8888, (req, res) => {
  console.log('Server Running...');
});