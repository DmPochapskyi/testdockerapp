#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyCdkProjectStack } from '../lib/my-cdk-project-stack';

const app = new cdk.App();
new MyCdkProjectStack(app, 'MyCdkProjectStack', {
  env: {
    account: '730335248716', 
    region: 'eu-central-1',     
  },
});

