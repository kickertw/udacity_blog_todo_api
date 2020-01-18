const fs = require('fs');

module.exports = {
  getIdentity: function(data) {
    if (data.length === 0) {
      return 1;
    }
  
    var lastId = 0;
    for (var ii = 0; ii < data.length; ii++) {
      console.log(data[ii]);
      if (data[ii].id > lastId) {
        lastId = data[ii].id;
      }
    }
  
    return lastId + 1;
  },
  loadData: function(file) {
    try {
      var rawData = fs.readFileSync(file);
      console.log(rawData);
      var data = JSON.parse(rawData);
      return data;      
    } catch (err) {
      console.log(err);
      return [];  
    }
  },
  saveData: function(data, file) {
    var output = JSON.stringify(data);
    fs.writeFileSync(file, output);
  }
}