# Getting updates on Lambda and ECS via EventBridge

This project showcases how to receive events from AWS about changes in Lambda functions and ECS workloads.

## Deploy

### Software to have on hand

1. Node.js v14+ installed
1. Yarn installed
1. A local Docker daemon installed that can run `docker build` as the user that you are running the commands in the [Run](#run) section
1. AWS CLI ([installation instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html))
1. Local setup of the AWS CLI:
   ```sh
   aws configure
   ```
1. AWS Cloud Development Kit (CDK) v2 ([installation instructions](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html))

### AWS account

1. AWS Cloud Development Kit (CDK) v2 bootstrapped:
   ```sh
   cdk bootstrap
   ```

1. Create an AWS Secret Manager secret called `AccessKeys` with the following tokens:

   * `LumigoToken`: the Lumigo token for monitoring the lambdas of this project

### Run

```
cdk deploy --all
```
