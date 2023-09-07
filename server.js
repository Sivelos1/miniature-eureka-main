const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const uuid = require('./node_modules/uuid');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  reportRequest(req);
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//reportRequest: a debug function meant to report any and all requests to the console.
const reportRequest = function(req){
  console.info(`${req.method} request recieved for endpoint ${req.originalUrl}.`);
}

// path for requests without params
app.get('/api/notes/:id', (req,res) => {
  reportRequest(req);
  console.log(req.params.id);
});

app.listen(PORT, () =>
  console.log(`App listening at port ${PORT}`)
);
