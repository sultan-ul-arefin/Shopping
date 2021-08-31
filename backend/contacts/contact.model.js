const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  name: { type: String, required: true },
  image: String,
  phoneNumber: String,
  email: String,
  transction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transction' },
  isCustomer: { type: Boolean, default: true },
  isEmployee: { type: Boolean, default: false },
  isSupplier: { type: Boolean, default: false },
  employeeInfo: { position: String, employeeId: String, salary: String },
  customerInfo: {
    region: String, city: String, area: String, address: String
  },
  supplierInfo: { region: String, city: String, area: String, address: String },
  isActive: { type: Boolean, default: true },

});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  timestamps: true,
  collection: 'Contacts'
  // transform: function (doc, ret) {
  // remove these props when object is serialized
  // delete ret._id;
  // }
});

module.exports = mongoose.model('Contact', schema);
