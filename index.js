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
  console.log('App Running...');
  res.send('Running!');
});

app.listen(8888, (req, res) => {
  console.log('Server Running...');
});