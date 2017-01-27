'use strict';

const api = require('../lib/api.js');
const utils = require('../lib/utils.js');
const tableName = 'boycotts';

const isValidDataCallback = (data) => {
  const propTypeMap = {
    'competitorName': 'string',
  };
  return utils.validatePropertyTypes(propTypeMap, data);
};

const buildItemCallback = (baseItem, data) => {
  let propArray = ['competitorName'];
  let item = utils.assignPropertiesByArray(baseItem, data, propArray);
  return item;
};

const createBoycott = (event, context, callback) => {
  return api.createModel(event, context, tableName, isValidDataCallback, buildItemCallback, callback);
};

const updateBoycott = (event, context, callback) => {
  return api.updateModel(event, context, tableName, isValidDataCallback, buildItemCallback, callback);
};

const getBoycotts = (event, context, callback) => {
  return api.listModel(event, context, tableName, callback);
};

const getBoycott = (event, context, callback) => {
  return api.getModel(event, context, tableName, callback);
};

const deleteBoycott = (event, context, callback) => {
  return api.deleteModel(event, context, tableName, callback)
};

module.exports = {
  createBoycott: createBoycott,
  updateBoycott: updateBoycott,
  getBoycotts: getBoycotts,
  getBoycott: getBoycott,
  deleteBoycott: deleteBoycott
}