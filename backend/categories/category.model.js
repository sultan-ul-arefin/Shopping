const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  image: String,
  subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  // is active or disable ?
  isActive: { type: Boolean, default: true },

});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  timestamps: true,
  collection: 'Categories',
  // transform: function (doc, ret) {
  // remove these props when object is serialized
  // delete ret._id;
  // }
});

module.exports = mongoose.model('Category', schema);
