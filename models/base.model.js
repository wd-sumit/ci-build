const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'modelType',
  collection: 'models',
}

const baseSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

