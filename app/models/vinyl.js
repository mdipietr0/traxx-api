const mongoose = require('mongoose')

const vinylSchema = new mongoose.Schema({
  vinyl_id: {
    type: String,
    required: true
  },
  collection_type: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Vinyl', vinylSchema)
