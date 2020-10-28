const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://restfultest:restfultest@cluster0.trbta.mongodb.net/testrestful?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;