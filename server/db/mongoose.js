const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Database')
  .then(() => { 
      console.log('Connected to database'); 
    },
    (err) => { 
        console.log('Cannot connect to database'); 
    }
  );

module.exports = {
    mongoose
};