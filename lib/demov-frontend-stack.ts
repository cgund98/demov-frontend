import * as cdk from '@aws-cdk/core';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
// import {HttpUrlIntegration} from '@aws-cdk/aws-apigateway-integrations';
import {Bucket, BucketAccessControl} from '@aws-cdk/aws-s3';
import {Distribution, OriginAccessIdentity} from '@aws-cdk/aws-cloudfront';
import {S3Origin} from '@aws-cdk/aws-cloudfront-origins';
import * as path from 'path';

import {envSpecific, deployEnv} from '../src/utils/environ';

export class DemovFrontendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket and deployment
    const bucket = new Bucket(this, envSpecific('demov-frontend'), {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });

    new s3deploy.BucketDeployment(this, envSpecific('demov-frontend-deployment'), {
      sources: [s3deploy.Source.asset(path.join(__dirname, '/../build'))],
      destinationBucket: bucket,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, envSpecific('demov-frontend-origin-access'));
    bucket.grantRead(originAccessIdentity);

    // Cloudfront Distribution
    const dist = new Distribution(this, envSpecific('demov-frontend-dist'), {
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],

      defaultBehavior: {
        origin: new S3Origin(bucket, {originAccessIdentity}),
      },
    });

    new cdk.CfnOutput(this, 'cloudfront-url', {
      value: dist.domainName,
      description: 'The URL of the cloudfront distribution.',
      exportName: 'cloudfront-url',
    });

    // API gateway
    const api = new apigateway.RestApi(this, envSpecific('demov-frontend-api'), {
      description: 'Frontend gateway for demov application',
      deployOptions: {
        stageName: deployEnv(),
        tracingEnabled: true,
        dataTraceEnabled: true,
      },
      binaryMediaTypes: ['*/*'],
    });

    // Proxy cloudfront
    api.root.addMethod('GET', new apigateway.HttpIntegration(`https://${dist.domainName}`));

    const distIntegration = new apigateway.HttpIntegration(`https://${dist.domainName}/{proxy}`, {
      proxy: true,
      options: {
        requestParameters: {
          'integration.request.path.proxy': 'method.request.path.proxy',
        },
      },
    });
    api.root.addProxy({
      defaultIntegration: distIntegration,
      defaultMethodOptions: {
        requestParameters: {
          'method.request.path.proxy': true,
        },
      },
    });

    // Proxy backend
    const backendIntegration = new apigateway.HttpIntegration(`https://api-${deployEnv()}.demov.app/v1/{proxy}`, {
      proxy: true,
      httpMethod: 'ANY',
      options: {
        requestParameters: {
          'integration.request.path.proxy': 'method.request.path.proxy',
        },
      },
    });
    const v1 = api.root.addResource('v1');
    const methodOptions = {
      requestParameters: {
        'method.request.path.proxy': true,
      },
    };
    const proxy = v1.addProxy({
      anyMethod: false,
      defaultIntegration: backendIntegration,
      defaultMethodOptions: {...methodOptions},
    });
    proxy.addMethod('GET', backendIntegration, methodOptions);
    proxy.addMethod('POST', backendIntegration, methodOptions);
    proxy.addMethod('PUT', backendIntegration, methodOptions);
    proxy.addMethod('DELETE', backendIntegration, methodOptions);

    // Domain
    const cert = acm.Certificate.fromCertificateArn(
      this,
      'cert',
      'arn:aws:acm:us-east-2:178852309825:certificate/cd5cedef-1b11-4f05-bc76-f0010d43da57',
    );

    const domain = new apigateway.DomainName(this, 'domain-name', {
      domainName: `${deployEnv()}.demov.app`,
      certificate: cert,
    });
    domain.addBasePathMapping(api, {stage: api.deploymentStage});
  }
}
