# Simple REST Service
> Standard API powered by API Gateway, Lambda and DynamoDB.

[![Launch Stack in CloudFormation](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](
  https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/new?stackName=simple-rest-service&templateURL=https://s3.eu-west-2.amazonaws.com/microservice-samples/simple-rest-service/sam.yaml)


One resource is exposed by the API with the ability to put and get that said resource:
 - `['PUT', 'GET']`: `{apiGatewayUrl}/v1/pets/{petId}`
