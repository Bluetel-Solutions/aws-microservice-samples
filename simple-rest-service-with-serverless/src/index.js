const Alpr = require('alpr').default;

/**
 * AWS doesn't need to be a production dependency because it's always installed in the Lambda
 * environment anyway.
 */
const AWS = require('aws-sdk'); // eslint-disable-line

const dynamoDoc = new AWS.DynamoDB.DocumentClient();
const petTable = process.env.petTable; // This is defined in the serverless.yml file.

/**
 * Request handler. Entry point to the microservice. This isn't the way I would usually structure a
 * Lambda microservice, it is done this way for the ease of demo. It's also worth noting this
 * performs no schema validation.
 *
 * @see http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
 * @return {void}
 */
function handler(event, context, callback) {
  const alpr = new Alpr({ event, context, callback });

  // if (event.httpMethod === 'PUT' && event.resource === '/pets/{petId}') {}
  alpr.route({
    method: 'PUT',
    path: '/pets/{petId}',
    handler(request, response) {
      const params = {
        TableName: petTable,
        Item: request.body,
      };

      params.Item.id = request.pathParameters.petId;
      return dynamoDoc.put(params).promise()
        .then(() => {
          response({
            statusCode: 200,
            headers: {},
            body: params.Item,
          });
        });
    },
  });

  // if (event.httpMethod === 'GET' && event.resource === '/pets/{petId}') {}
  alpr.route({
    method: 'GET',
    path: '/pets/{petId}',
    handler(request, response) {
      const params = {
        TableName: petTable,
        Key: {
          id: request.pathParameters.petId,
        },
      };

      return dynamoDoc.get(params).promise()
        .then((result) => {
          response({
            statusCode: 200,
            headers: {},
            body: result.Item,
          });
        });
    },
  });
}


exports.handler = handler; // eslint-disable-line
