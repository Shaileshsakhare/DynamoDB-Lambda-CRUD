'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function putItem(data) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: data
        };

        dynamoDb.put(params, (error) => {
            if (error) {
                console.error(error);
                reject(error);
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(params.Item),
            };
            resolve(response);
        });
    });
}

//exports.handler = (event, context, callback) => { //For Lambda
module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    putItem(data).then(response => {
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