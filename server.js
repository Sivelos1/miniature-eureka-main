const express = require('express');
const path = require('path');
// Helper method for generating unique ids
//const uuid = require('./helpers/uuid');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  reportRequest(req);
  res.sendFile(path.join(__dirname, './public/index.html'));
  console.log("am i working lol");
});

//reportRequest: a debug function meant to report any and all requests to the console.
const reportRequest = function(req){
  console.info(`${req.method} request recieved for endpoint ${req.originalUrl}.`);
}

// GET request for Notes page
app.get('/api/notes', (req,res) => {
  reportRequest(req);
  res.sendFile(path.join(__dirname, '/public/notes.html'));
  res.status(200).json({message:"helooooo"});
});

app.listen(PORT, () =>
  console.log(`App listening at port ${PORT}`)
);
