const { ConstructLibraryCdk8s } = require('projen/lib/cdk8s');

const CDK_VERSION = '2.22.0';
const project = new ConstructLibraryCdk8s({
  author: 'Hunter Thompson',
  authorAddress: 'aatman@auroville.org.in',
  cdk8sVersion: '2.2.74',
  constructsVersion: '10.0.5',
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
  devDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  peerDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  releaseEveryCommit: true,
  publishToGo: {
    gitUserName: 'Hunter-Thompson',
    gitUserEmail: 'aatman@auroville.org.in',
    moduleName: 'github.com/opencdk8s/cdk8s-cluster-autoscaler-aws-go',
  },
  depsUpgrade: false,
  dependabot: false,
  pullRequestTemplate: false,
  codeCov: true,
  clobber: false,
  readme: true,
  mergify: true,
});

const common_exclude = ['cdk.out', 'yarn-error.log', 'coverage', '.DS_Store', '.idea', '.vs_code'];
project.gitignore.exclude(...common_exclude);

project.synth();

