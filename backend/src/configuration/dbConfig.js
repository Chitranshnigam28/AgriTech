const mongoose = require('mongoose');

// Connection URI for MongoDB
const uri = "mongodb+srv://kisanteam28:MJGJCglcIT4LyIA0@cluster0.nzqnq.mongodb.net/kisan?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB without deprecated options
mongoose.connect(uri)
  .then(() => {
    console.log(`Mongoose connected to ${uri}`);
  })
  .catch(err => {
    console.error(`Mongoose connection error: ${err}`);
  });

module.exports = mongoose;
