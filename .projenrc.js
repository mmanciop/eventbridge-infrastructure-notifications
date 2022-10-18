const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.46.0',
  defaultReleaseBranch: 'main',
  name: 'eventbridge-ecs-poc',
  devDeps: ['@types/aws-lambda', 'esbuild'],
});
project.synth();