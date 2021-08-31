const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  // transction
  credit: Number,
  debit: Number,
  meta: Schema.Types.Mixed,
  datetime: Date,
  account_path: [String],
  accounts: String,
  book: String,
  memo: String,
  journal: { type: Schema.Types.ObjectId, ref: "Journal" },
  approved: {
    type: Boolean,
    default: true
  },
  voided: {
    type: Boolean,
    default: false
  },
  void_reason: String,

  isDigital: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  timestamps: true,
  collection: 'Transactions'
  // transform: function (doc, ret) {
  // remove these props when object is serialized
  // delete ret._id;
  // }
});

schema.index({ journal: 1 });
schema.index({ accounts: 1, book: 1, approved: 1, updatedAt: -1, createdAt: -1, });
schema.index({ "account_path.0": 1, book: 1, approved: 1 });
schema.index({ "account_path.0": 1, "account_path.1": 1, book: 1, approved: 1 });
schema.index({ "account_path.0": 1, "account_path.1": 1, "account_path.2": 1, book: 1, approved: 1 });

module.exports = mongoose.model('Transction', schema);
