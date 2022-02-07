#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {DemovFrontendStack} from '../lib/demov-frontend-stack';
import {envSpecific} from '../src/utils/environ';

const app = new cdk.App();
new DemovFrontendStack(app, envSpecific('demov-frontend-stack'), {
  tags: {
    environment: 'dev',
  },
});
