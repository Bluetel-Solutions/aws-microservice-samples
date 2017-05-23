#!/bin/bash

AWS_STAGE=$1

serverless config credentials -p aws -k ${AWS_KEY} -s ${AWS_SECRET}
serverless deploy --stage $AWS_STAGE
