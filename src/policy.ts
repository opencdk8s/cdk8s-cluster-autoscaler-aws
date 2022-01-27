import * as iam from 'aws-cdk-lib/aws-iam';

const AwsClusterAutoScalerPolicy = [
  {
    Effect: 'Allow',
    Action: [
      'autoscaling:DescribeAutoScalingGroups',
      'autoscaling:DescribeAutoScalingInstances',
      'autoscaling:DescribeLaunchConfigurations',
      'autoscaling:SetDesiredCapacity',
      'autoscaling:TerminateInstanceInAutoScalingGroup',
      'autoscaling:DescribeTags',
      'ec2:DescribeLaunchTemplateVersions',
      'autoscaling:DescribeLaunchConfigurations',
    ],
    Resource: ['*'],
  },
];

/**
 * Aws External Dns Policy class ,help you add policy to your Iam Role for service account.
 */
export class AwsClusterAutoScalerPolicyHelper {
  public static addPolicy(role: any) :any {
    AwsClusterAutoScalerPolicy.forEach(e => {
      role.addToPolicy(iam.PolicyStatement.fromJson(e));
    });
    return role;
  }
};