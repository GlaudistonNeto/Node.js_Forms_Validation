const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// parse application/x-WWW-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application json
app.use(express.json());


app.use(cookieParser('|T@LDn?@62\Rz=.q'));
app.use(session({
  secret: 'keyword cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', (req, res) =>{
  var emailError = req.flash('emailError');
  var pointsError = req.flash('pointsError');
  var nameError = req.flash('nameError');
  var email = req.flash("email");
  var points = req.flash('points');
  var name = req.flash('name');

  emailError = (emailError == undefined || emailError.length == 0) ? undefined :
                emailError;
  email = (email == undefined || email.length == 0) ? "" : email;

  pointsError = (pointsError == undefined || pointsError.length == 0) ?
                 undefined : pointsError;
                points = (points == undefined || points.length == 0) ? "" :
                points;

  nameError = (nameError == undefined || nameError.length == 0) ? undefined :
                nameError;
                name = (name == undefined || name.length == 0) ? "" : name;

  res.render('index', { emailError, pointsError, nameError,
              email: email, points: points, name: name });
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
        req.flash('emailError', emailError);
        req.flash('pointsError', pointsError);
        req.flash('nameError', nameError);

        req.flash('email', email);
        req.flash('points', points);
        req.flash('points', points);
        res.redirect('/');
      } else {
        res.send('You are all done!');
      }
});

app.listen(8888, (req, res) => {
  console.log('Server Running...');
});