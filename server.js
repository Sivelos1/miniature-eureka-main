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
app.get('/api/notes', (req,res) => {
  reportRequest(req);
  if(req.method === `GET`){
    res.send(JSON.parse(db)).status(200);
    console.info("Status code 200 - response sent!");
  }
  else if(req.method === `POST`){
    var id = uuid();
    if(req.body){
      db[id] = JSON.parse(req.body);
      res.status(200).json({message:`Successfully saved note #${id}`});
      console.info(`Status code 200 - note #${id} successfully saved!`);
    }
    else{
      res.status(400).json({message:`No note found in body`});
      console.info(`Status code 200 - No note was found in the body.`);
    }
    
  }
  else{
    res.status(400).json({message:`Error: bad request method`});
    console.info("Status code 400 - bad request method");
  }
  
});
// path for requests with params
app.get('/api/notes/:id', (req,res) => {
  reportRequest(req);
  if(req.params.id){
    if(req.method === `DELETE`){
      try {
        delete db[req.params.id];
        res.status(200).json({message:`Successfully deleted element #${req.params.id}`});
        console.info(`Status code 200 - note #${id} successfully deleted!`);
      }
      catch{
        res.status(400).json({message:`Could not delete element as it could not be found`});
        console.info("Status code 400 - Couldn't delete element");
      }
    }
    else{
      res.status(400).json({message:`Error: bad request method`});
      console.info("Status code 400 - bad request method");
    }
  }
});

app.listen(PORT, () =>
  console.log(`App listening at port ${PORT}`)
);
