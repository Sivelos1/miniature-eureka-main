const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const fs = require('fs');
const uuid = require('./node_modules/uuid').v4;
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) => {
  reportRequest(req);
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  reportRequest(req);
  console.log("this is the `/notes` get requsest");
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//reportRequest: a debug function meant to report any and all requests to the console.
const reportRequest = function(req){
  console.log(db);
  console.info(`${req.method} request recieved for endpoint ${req.originalUrl}.`);
}

// GET route for api/notes
app.get('/api/notes', (req,res) => {
  reportRequest(req);
  db = fs.readFileSync(path.join(__dirname, './db/db.json'));
  res.status(200);
  console.info("Status code 200 - response sent!");
});
//POST route for api/notes
app.post('/api/notes', (req,res) => {
  reportRequest(req);

  const {title, text} = req.body

  if(title && text){
    const newNote = {
      title: title,
      text: text,
      id: uuid()
    }
    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db));
    res.status(201).send(newNote);
  }
  else{
    res.status(400).json({message:`No note found in body`});
    console.info(`Status code 200 - No note was found in the body.`);
  }
});

// DELETE route for api/notes
app.delete('/api/notes/:id', (req,res) => {
  reportRequest(req);
  if(req.params.id){
    var note = db.find(n => n.id === req.params.id);
      if(note){
        delete note;
        res.status(200).json({message:`Successfully deleted element #${req.params.id}`});
        console.info(`Status code 200 - note #${id} successfully deleted!`);
      }
      else{
        res.status(400).json({message:`Could not delete element as it could not be found`});
        console.info("Status code 400 - Couldn't delete element");
      }
  }
});

app.listen(PORT, () =>
  console.log(`App listening at port ${PORT}`)
);
