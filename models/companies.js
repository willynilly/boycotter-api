'use strict';

const api = require('../lib/api.js');
const utils = require('../lib/utils.js');
const tableName = 'companies';

const isValidDataCallback = (data) => {
    const propTypeMap = {
        'name': 'string',
    };
    return utils.validatePropertyTypes(propTypeMap, data);
};

const buildItemCallback = (baseItem, data) => {
    let propArray = ['name'];
    let item = utils.assignPropertiesByArray(baseItem, data, propArray);
    return item;
};

const createCompany = (event, context, callback) => {
    return api.createModel(event, context, tableName, isValidDataCallback, buildItemCallback, callback);
};

const updateCompany = (event, context, callback) => {
    return api.updateModel(event, context, tableName, isValidDataCallback, buildItemCallback, callback);
};

const getCompanies = (event, context, callback) => {
    return api.listModel(event, context, tableName, callback);
};

const getCompany = (event, context, callback) => {
    return api.getModel(event, context, tableName, callback);
};

const deleteCompany = (event, context, callback) => {
    return api.deleteModel(event, context, tableName, callback)
};

module.exports = {
    createCompany: createCompany,
    updateCompany: updateCompany,
    getCompanies: getCompanies,
    getCompany: getCompany,
    deleteCompany: deleteCompany
}