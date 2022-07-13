
const express = require("express");
const { path } = require("express/lib/application");
const nodemailer = require("nodemailer");
const exphbs = require('express-handlebars')
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const { v4: uuidv4 } = require('uuid');

// firebase realtime set up
const firebaseConfig = {
  apiKey: "AIzaSyBnliQ4NGZrSAwRNbWDM0TQfxFf8lHcyiE",
  authDomain: "cooking-website-a88eb.firebaseapp.com",
  databaseURL: "https://cooking-website-a88eb-default-rtdb.firebaseio.com",
  projectId: "cooking-website-a88eb",
  storageBucket: "cooking-website-a88eb.appspot.com",
  messagingSenderId: "382413354446",
  appId: "1:382413354446:web:4a6ffb612adae1ad4be79f",
  measurementId: "G-YBWZK3BFSX",
  type: "module",
};

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require('firebase/database');

const application = initializeApp(firebaseConfig);
const db = getDatabase(application);

// view engine set up
const { engine } = require("express-handlebars")

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public"));
});

app.post("/contact.html", (req, res) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let message = req.body.message;
  let id = uuidv4();

  if(Object.values(req.body).includes('')) {
    console.log('empty!')
    res.status(500).json({});
  }
  else {
    set(ref(db, 'users/' + id), {
    user_name: userName,
    email: email,
    message : message
    });
    
  res.status(200).json({ data : `${ req.body}` });
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
