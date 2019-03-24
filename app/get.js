'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function getItem(data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                "id": data.pathParameters.id,
               // data.id,
            },
        };

        dynamoDb.get(params, (error, result) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
            };
            resolve(response);
        });
    });
}

//exports.handler = (event, context, callback) => {

module.exports.get = (event, context, callback) => {
    getItem(event).then(response => {
            callback(null, response);
        })
        .catch((e) => {
            console.log(JSON.stringify(e));
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Not able to create record',
            });
        });
};