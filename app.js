
const express = require("express");
const { path } = require("express/lib/application");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const { v4: uuidv4 } = require('uuid');

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public"));
});

app.post("/contact.html", (req, res) => {
  let firstName = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let id = uuidv4();

  set(ref(db, 'users/' + id), {
    email: email,
    first_name: firstName,
    message : message
  });

 
  //   console.log(firstName)
  //get collection data this moment
  /*
    getDocs(reference)
    .then((snapshot) =>{
      console.log(snapshot.docs);
    })
    */
  res.status(200).json({ data: `Result is ${firstName}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
