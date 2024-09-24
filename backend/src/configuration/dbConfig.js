const mongoose = require('mongoose');

// Connection URI for MongoDB
const uri = "mongodb+srv://rognation4:Shivam121%40121%23@cluster0.ww2ji.mongodb.net/";

// Connect to MongoDB without deprecated options
mongoose.connect(uri)
  .then(() => {
    console.log(`Mongoose connected to ${uri}`);
  })
  .catch(err => {
    console.error(`Mongoose connection error: ${err}`);
  });

module.exports = mongoose;
