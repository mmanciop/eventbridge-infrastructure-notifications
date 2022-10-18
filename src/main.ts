import { App, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Rule } from 'aws-cdk-lib/aws-events';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export class EventbridgeEcsEvents extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const ecsEventsTopic = new Topic(this, 'ecs-events');

    const handler = new NodejsFunction(this, 'LogEvents', {
      environment: {
        LUMIGO_TRACER_TOKEN: SecretValue.secretsManager('AccessKeys', { jsonField: 'LumigoToken' }).toString(), // Pity we cannot mount secrets in the same way ECS can :-(
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/lumigo_wrapper',
      },
      layers: [
        LayerVersion.fromLayerVersionArn(this, 'LumigoLayerJs', 'arn:aws:lambda:eu-central-1:114300393969:layer:lumigo-node-tracer:211'),
      ],
    });
    handler.addEventSource(new SnsEventSource(ecsEventsTopic));

    new Rule(this, 'ecs-events-notification', {
      eventPattern: {
        source: [
          'aws.ecs',
          'aws.lambda',
        ],
      },
      targets: [
        new SnsTopic(ecsEventsTopic),
      ],
    });
  }
}

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new EventbridgeEcsEvents(app, 'eventbridge-ecs-poc-dev', { env });

app.synth();