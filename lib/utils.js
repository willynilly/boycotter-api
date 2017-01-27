'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const validatePropertyTypes = (propTypeMap, obj) => {
    for (let prop in propTypeMap) {
        let propType = propTypeMap[prop];
        let value = obj[prop];
        if (propType.toLowerCase() === "array") {
            if (!Array.isArray(value)) {
                return false;
            }
        } else {
            if (typeof value !== propType) {
                return false;
            }
        }
    }
    return true;
}

const assignProperty = (obj1, prop1, obj2, prop2) => {
    if (prop2 in obj2) {
        obj1[prop1] = obj2[prop2];
    }
    return obj1;
}

const assignPropertiesByMap = (obj1, obj2, propMap) => {
    if (propMap !== null && propMap !== undefined) {
        for (let prop1 in propMap) {
            let prop2 = propMap[prop1];
            obj1 = assignProperty(obj1, prop1, obj2, prop2);
        }
    }
    return obj1;
}

const assignPropertiesByArray = (obj1, obj2, propArray) => {

    if (Array.isArray(propArray)) {
        propArray.forEach((prop) => {
            obj1 = assignProperty(obj1, prop, obj2, prop);
        });
    }
    return obj1;
}

module.exports = {
    assignProperty: assignProperty,
    assignPropertiesByArray: assignPropertiesByArray,
    assignPropertiesByMap: assignPropertiesByMap,
    validatePropertyTypes
}