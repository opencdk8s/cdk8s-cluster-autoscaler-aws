const { ConstructLibraryCdk8s } = require('projen');

const CDK_VERSION = '1.113.0';

const project = new ConstructLibraryCdk8s({
  author: 'Hunter Thompson',
  authorAddress: 'aatman@auroville.org.in',
  cdk8sVersion: '1.0.0-beta.10',
  defaultReleaseBranch: 'development',
  stability: 'experimental',
  jsiiFqn: 'projen.ConstructLibraryCdk8s',
  name: '@opencdk8s/cdk8s-cluster-autoscaler-aws',
  keywords: ['cdk8s', 'cdk'],
  npmAccess: 'public',
  repositoryUrl: 'https://github.com/opencdk8s/cdk8s-cluster-autoscaler-aws',
  python: {
    distName: 'cdk8s-cluster-autoscaler-aws',
    module: 'cdk8s_cluster_autoscaler_aws',
  },
  peerDeps: [
    'constructs@^3.3.65',
    `@aws-cdk/aws-iam@${CDK_VERSION}`,
    `@aws-cdk/core@${CDK_VERSION}`,
  ],
  devDeps: [
    'constructs@^3.3.65',
    `@aws-cdk/aws-iam@${CDK_VERSION}`,
    `@aws-cdk/core@${CDK_VERSION}`,
  ],
  releaseEveryCommit: true,
  dependabot: false,
  gitignore: ['package.json', 'test/'],
  pullRequestTemplate: false,
  releaseBranches: ['development'],
  codeCov: true,
  clobber: false,
  readme: true,
  mergify: true,
});

const common_exclude = ['cdk.out', 'package.json', 'yarn-error.log', 'coverage', '.DS_Store', '.idea', '.vs_code'];
project.gitignore.exclude(...common_exclude);

project.synth();

