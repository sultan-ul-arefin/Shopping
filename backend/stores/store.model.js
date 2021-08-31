const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },

  shopName: { type: String, required: true },
  url: { type: String, unique: true },
  shopType: { type: String, required: true },
  logo: String,
  banner: [{ type: String }],

  address: {
    division: String,
    district: String,
    area: String,
  },
  about: {
    shopNo: String,
    floorNo: String,
    marketName: String,
    otherInfo: String,
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    youtube: String,
    whatsapp: String,
    imo: String,
  },
  phoneNumber: String,
  helplineNumber: String,

  mapAddress: { lat: String, lon: String, },

  referral: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },

  // is this shop sell online or ofline ?
  isOnline: { type: Boolean, default: false, required: true },
  // is shop verified by OTP ?
  isVerified: { type: Boolean, default: false },
  // is shop active or disable ?
  isActive: { type: Boolean, default: true },

  // package subscription
  isSubscribed: { type: Boolean, default: false },
  subscriptionInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageInfo' },

});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  timestamps: true,
  collection: 'Stores',
  // transform: function (doc, ret) {
  // remove these props when object is serialized
  // delete ret._id;
  // }
});

module.exports = mongoose.model('Store', schema);
