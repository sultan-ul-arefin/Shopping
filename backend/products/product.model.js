const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  price: { type: Number, default: 0.0 },
  cost: { type: Number, default: 0.0 },
  quantity: Number,
  discription: String,
  images: [String],
  vat: { type: Number, default: 0.0 },
  barcode: String,
  attribute: [{
    name: String,
    value: String
  }],

  isOnline: { type: Boolean, default: true },
  // is active or disable ?
  isActive: { type: Boolean, default: true },

});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  timestamps: true,
  collection: 'Products'
  // transform: function (doc, ret) {
  // remove these props when object is serialized
  // delete ret._id;
  // }
});

module.exports = mongoose.model('Category', schema);
