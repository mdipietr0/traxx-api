const mongoose = require('mongoose')

const vinylSchema = new mongoose.Schema({
  vinyl_id: {
    type: String,
    required: true
  },
  cover_image: {
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

// create a compound index for vinyl schema to prevent duplicate entries
// TODO for production https://mongoosejs.com/docs/guide.html#indexes
vinylSchema.index(
  {
    vinyl_id: 1,
    collection_type: 1,
    owner: 1
  },
  {unique: true}
)

module.exports = mongoose.model('Vinyl', vinylSchema)
