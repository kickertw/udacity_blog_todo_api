const os = require('os');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;
const dbFile = os.tmpdir() + '/udacity_temp_db.json';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get-all', (req, res) => {
  var data = db.loadData(dbFile);
  res.send(data);
});

app.get('/get/:id', (req, res) => {
  var data = db.loadData(dbFile);
  var id = req.params.id;

  for(var ii = 0; ii < data.length; ii++) {
    if (data[ii].id === id) {
      res.send(data);
      return;
    }
  }  

  res.status(404).send('Not Found');
});

// POST method route
app.post('/add', function (req, res) {
  var name = req.body.name;
  var data = db.loadData(dbFile);
  var newId = db.getIdentity(data);

  data.push({id: newId, name: name});
  db.saveData(data, dbFile);

  res.send('OK');
});

app.put('/update/:id', function(req, res) {
  var name = req.body.name;
  var id = req.params.id;

  var data = db.loadData(dbFile);
  for(var ii = 0; ii < data.length; ii++) {
    if (data[ii].id == id) {
      data[ii].name = name;
      db.saveData(data, dbFile);
      break;
    }    
  }

  res.send('OK');
});

app.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  var data = db.loadData(dbFile);
  for(var ii = 0; ii < data.length; ii++) {
    if (data[ii].id == id) {
      data.splice(ii, 1);
      db.saveData(data, dbFile);
      break;
    }
  }

  res.send('OK');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))