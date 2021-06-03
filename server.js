const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cidb', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log('connected to db'));

const PORT = process.env.PORT || 3000

app.listen(PORT)