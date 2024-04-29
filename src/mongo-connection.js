const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://taha:taha.@cluster0.drlqpdd.mongodb.net/villa';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
