'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createResponse = (statusCode, data) => {
    const response = {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify(data),
    };
    return response;
}

const successResponse = (statusCode, data, callback) => {
    const response = createResponse(statusCode, data);
    callback(null, response);
}

const errorResponse = (statusCode, data, callback) => {
    const response = createResponse(statusCode, data);
    callback(null, response);
};

const createModel = (event, context, tableName, isValidDataCallback, buildItemCallback, callback) => {

    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (data === undefined || !isValidDataCallback(data)) {
        console.error('Validation Failed');
        errorResponse(300, 'Invalid data.', callback);
        return;
    }

    let baseItem = {
        id: uuid.v1(),
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    let item = buildItemCallback(baseItem, data);

    const params = {
        TableName: tableName,
        Item: item,
    };

    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error(error);
            errorResponse(500, 'Couldn\'t create the item.', callback);
        } else {
            successResponse(200, item, callback);
        }
    });
};

const updateModel = (event, context, tableName, isValidDataCallback, buildItemCallback, callback) => {

    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (data === undefined || !isValidDataCallback(data)) {
        console.error('Validation Failed');
        errorResponse(300, 'Invalid data.', callback);
        return;
    }

    let baseItem = {
        id: event.pathParameters.id,
        updatedAt: timestamp
    };
    let item = buildItemCallback(baseItem, data);

    const params = {
        TableName: tableName,
        Item: item,
    };

    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error(error);
            errorResponse(500, 'Couldn\'t update the item', callback);
        } else {
            successResponse(200, item, callback);
        }
    });
};

const listModel = (event, context, tableName, callback) => {
    const params = {
        TableName: tableName,
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            errorResponse(500, 'Couldn\'t get any items', callback);
        } else {
            successResponse(200, result.Items, callback);
        }
    });
};

const getModel = (event, context, tableName, callback) => {
    const params = {
        TableName: tableName,
        Key: {
            id: event.pathParameters.id,
        },
    };

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            errorResponse(500, 'Couldn\'t get the item.', callback);
        } else {
            successResponse(200, result.Item, callback);
        }
    });
};

const deleteModel = (event, context, tableName, callback) => {
    const params = {
        TableName: tableName,
        Key: {
            id: event.pathParameters.id,
        }
    };

    dynamoDb.delete(params, (error) => {
        if (error) {
            console.error(error);
            errorResponse(500, 'Couldn\'t delete the item.', callback);
        } else {
            successResponse(200, {}, callback);
        }
    });
};

module.exports = {
    createModel: createModel,
    listModel: listModel,
    getModel: getModel,
    updateModel: updateModel,
    deleteModel: deleteModel
}
