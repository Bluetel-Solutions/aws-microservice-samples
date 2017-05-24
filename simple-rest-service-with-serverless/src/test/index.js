const test = require('ava');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const handler = require('../index').handler;

const pet = {
  species: "dog",
  breed: "great dane",
  name: "marmaduke"
};

test.cb('put pet success', t => {
  const stub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'put');
  t.plan(1);
  stub.returns({
    promise() {
      return Promise.resolve(pet);
    },
  });

  handler({ httpMethod: 'PUT', resource: '/pets/{petId}', body: JSON.stringify(pet) }, {}, (err, response) => {
    stub.restore();
    t.deepEqual(JSON.parse(response.body), pet);
    t.end();
  });
});

test.cb('put get success', t => {
  const stub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'get');
  t.plan(1);
  stub.returns({
    promise() {
      return Promise.resolve({ Item: pet });
    },
  });

  handler({ httpMethod: 'GET', resource: '/pets/{petId}', body: JSON.stringify(pet) }, {}, (err, response) => {
    stub.restore();
    t.deepEqual(JSON.parse(response.body), pet);
    t.end();
  });
});
