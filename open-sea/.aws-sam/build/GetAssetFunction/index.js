const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const { ASSETS_TABLE_NAME } = process.env;
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const response = {
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST",
    "Content-Type": "application/json"
  },
  "body": '',
  "isBase64Encoded": false
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.getAsset = async (event, context) => {

    console.info("EVENT > ", event);

    const {tokenId} = event.pathParameters;

    const filter = {
        TableName: ASSETS_TABLE_NAME,
        Key: {
          'TokenId': parseInt(tokenId)
        },
      };
        
    //const result = await ddb.getItem(filter).promise();
    const data = await docClient.get(filter).promise();
    const result = data.Item;

    delete result.TokenId

    console.info("getAsset > result:", JSON.stringify(result, null, 2));

    try {
        // const ret = await axios(url);
        response.body = JSON.stringify(result);
    } catch (err) {
        console.log(err);
        return err;
    }

    

    return response;
};
