const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  getByURL,
  create,
  update,
  delete: _delete
};
const storePopulate = 'user subscriptionInfo referral'; // if need all populate

async function getAll() {
  const store = await db.Store.find().populate(storePopulate);
  return store.map(x => basicStoreDetails(x));
}

async function getById(id) {
  const store = await getStoreById(id);
  return basicStoreDetails(store);
}

async function getByURL(URL) {
  const store = await getStoreByURL(URL);
  return basicStoreDetails(store);
}

async function create(params) {
  // unique validation checking
  if (await db.Store.findOne({ url: params.url })) {
    throw 'Store url "' + params.url + '" is already registered, please try  another one!';
  }

  const store = new db.Store(params);

  // save data
  await store.save();

  return basicStoreDetails(store);
}

async function update(id, params) {
  const store = await getStoreById(id);

  // unique validation checking
  if (params.url && store.url !== params.url && await db.Store.findOne({ url: params.url })) {
    throw 'Store url "' + params.url + '" is already taken, please try  another one!';
  }

  // copy params to store and save
  Object.assign(store, params);
  store.updated = Date.now();
  await store.save();

  return basicStoreDetails(store);
}

async function _delete(id) {
  const store = await getStoreById(id);
  await store.remove();
}

// helper functions

async function getStoreById(id) {
  if (!db.isValidId(id)) throw 'ID not found';
  const store = await db.Store.findById(id).populate(storePopulate);
  if (!store) throw 'Store not found';
  return store;
}

async function getStoreByURL(URL) {
  const store = await db.Store.findOne({ url: URL }).populate(storePopulate);
  if (!store) throw 'Store not found';
  return store;
}
// define basicStoreDetails carefully to view serialized information correctly

function basicStoreDetails(store) {
  const { id, user, name, url, type, logo, address, mapAddress, isOnline, isVerified, isActive, isSubscribed, subscriptionInfo, referral } = store;
  return { id, user, name, url, type, logo, address, mapAddress, isOnline, isVerified, isActive, isSubscribed, subscriptionInfo, referral };
}
