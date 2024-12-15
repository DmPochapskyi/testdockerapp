import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Add tags 
    cdk.Tags.of(this).add('Project', 'CdkProject');
    cdk.Tags.of(this).add('Environment', 'Development');

    // Create a custom VPC with 2 Availability Zones and 1 NAT Gateway
    const vpc = new ec2.Vpc(this, 'cdkProjectVpc', {
      maxAzs: 2,
      natGateways: 1,
    });

    // Create a Security Group allowing HTTP and HTTPS traffic
    const securityGroup = new ec2.SecurityGroup(this, 'cdkProjectSG', {
      vpc: vpc,
      securityGroupName: 'cdkProjectSG',
      description: 'Allow HTTP and HTTPS traffic',
      allowAllOutbound: true,
    });

    // Add ingress rules for HTTP (port 80) and HTTPS (port 443)
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS traffic');

    // An ECR repository with a lifecycle policy
    new ecr.Repository(this, 'cdkEcrRepository', {
      repositoryName: 'cdk-docker-repo',
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep the repository after stack deletion
      lifecycleRules: [
        {
          tagPrefixList: ['prod'], // Retain only images tagged with 'prod'
          maxImageCount: 10, // Keep a maximum of 10 images
        },
      ],
    });
  }
}