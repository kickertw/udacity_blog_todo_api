const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

app.get('/items', (req, res) => {
  const items = [
    {id: 1, name: 'Todo Item 1'},
    {id: 2, name: 'Todo Item 2'},
    {id: 3, name: 'Todo Item 3'},
    {id: 4, name: 'Todo Item 4'},
    {id: 5, name: 'Todo Item 5'},
  ];
  res.send(items);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))