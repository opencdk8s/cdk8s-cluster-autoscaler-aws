import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
export * from './policy';

export interface ClusterAutoScalerOptions {
  /**
   * service account for aws-load-balancer-controller.
   *
   * @default - true
   */
  readonly createServiceAccount?: boolean;
  /**
   * Service Account Name
   *
   * @default - cluster-autoscaler
   */
  readonly serviceAccountName?: string;
  /**
     * Extra commands for controller.
     * @default - [
        './cluster-autoscaler',
        '--v=4',
        '----stderrthreshold=info',
        '--cloud-provider=aws',
        '--skip-nodes-with-local-storage=false',
        '--expander=least-waste'
        ]
     */
  readonly command?: string[];

  /**
     * Namespace
     *
     * @default - kube-system
     */

  readonly namespace?: string;

  /**
     * image for deployment
     */
  readonly image?: string;
}

export class ClusterAutoScaler extends Construct {

  /**
  * service account for aws-load-balancer-controller.
  *
  * @default - true
  */
  public readonly createServiceAccount?: boolean

  /**
   * Service Account Name
   *
   * @default - cluster-autoscaler
   */
  public readonly serviceAccountName?: string;
  /**
   * Extra commands for controller.
   * @default - [
        './cluster-autoscaler',
        '--v=4',
        '----stderrthreshold=info',
        '--cloud-provider=aws',
        '--skip-nodes-with-local-storage=false',
        '--expander=least-waste'
        ]
   */
  public readonly command?: string[];

  /**
   * Namespace
   *
   * @default - kube-system
   */

  public readonly namespace?: string;

  /**
   * image for deployment
   */
  public readonly image?: string;


  constructor(scope: Construct, name: string, opts: ClusterAutoScalerOptions) {
    super(scope, name);

    this.serviceAccountName = opts.serviceAccountName ?? 'cluster-autoscaler';
    this.namespace = opts.namespace ?? 'kube-system';
    this.image = opts.image ?? 'k8s.gcr.io/autoscaling/cluster-autoscaler:v1.17.3';
    this.createServiceAccount = opts?.createServiceAccount ?? true;

    if (opts.createServiceAccount === true) {
      new cdk8s.ApiObject(this, 'sa', {
        apiVersion: 'v1',
        kind: 'ServiceAccount',
        metadata: {
          labels: {
            'k8s-addon': 'cluster-autoscaler.addons.k8s.io',
            'k8s-app': 'cluster-autoscaler',
          },
          name: this.serviceAccountName,
          namespace: this.namespace,
        },
      });
    }

    new cdk8s.ApiObject(this, 'cluster-role', {
      apiVersion: 'rbac.authorization.k8s.io/v1',
      kind: 'ClusterRole',
      metadata: {
        name: 'cluster-autoscaler',
        labels: {
          'k8s-addon': 'cluster-autoscaler.addons.k8s.io',
          'k8s-app': 'cluster-autoscaler',
        },
      },
      rules: [
        {
          apiGroups: [''],
          resources: [
            'events',
            'endpoints',
          ],
          verbs: [
            'create',
            'patch',
          ],
        },
        {
          apiGroups: [''],
          resources: ['pods/eviction'],
          verbs: ['create'],
        },
        {
          apiGroups: [''],
          resources: ['pods/status'],
          verbs: ['update'],
        },
        {
          apiGroups: [''],
          resources: ['endpoints'],
          resourceNames: ['cluster-autoscaler'],
          verbs: [
            'get',
            'update',
          ],
        },
        {
          apiGroups: [''],
          resources: ['nodes'],
          verbs: [
            'watch',
            'list',
            'get',
            'update',
          ],
        },
        {
          apiGroups: [''],
          resources: [
            'pods',
            'services',
            'replicationcontrollers',
            'persistentvolumeclaims',
            'persistentvolumes',
          ],
          verbs: [
            'watch',
            'list',
            'get',
          ],
        },
        {
          apiGroups: ['extensions'],
          resources: [
            'replicasets',
            'daemonsets',
          ],
          verbs: [
            'watch',
            'list',
            'get',
          ],
        },
        {
          apiGroups: ['policy'],
          resources: ['poddisruptionbudgets'],
          verbs: [
            'watch',
            'list',
          ],
        },
        {
          apiGroups: ['apps'],
          resources: [
            'statefulsets',
            'replicasets',
            'daemonsets',
          ],
          verbs: [
            'watch',
            'list',
            'get',
          ],
        },
        {
          apiGroups: ['storage.k8s.io'],
          resources: [
            'storageclasses',
            'csinodes',
          ],
          verbs: [
            'watch',
            'list',
            'get',
          ],
        },
        {
          apiGroups: [
            'batch',
            'extensions',
          ],
          resources: ['jobs'],
          verbs: [
            'get',
            'list',
            'watch',
            'patch',
          ],
        },
        {
          apiGroups: ['coordination.k8s.io'],
          resources: ['leases'],
          verbs: ['create'],
        },
        {
          apiGroups: ['coordination.k8s.io'],
          resourceNames: ['cluster-autoscaler'],
          resources: ['leases'],
          verbs: [
            'get',
            'update',
          ],
        },
      ],
    });

    new cdk8s.ApiObject(this, 'cluster-role-binding', {
      apiVersion: 'rbac.authorization.k8s.io/v1',
      kind: 'ClusterRoleBinding',
      metadata: {
        name: 'cluster-autoscaler',
        labels: {
          'k8s-addon': 'cluster-autoscaler.addons.k8s.io',
          'k8s-app': 'cluster-autoscaler',
        },
      },
      roleRef: {
        apiGroup: 'rbac.authorization.k8s.io',
        kind: 'ClusterRole',
        name: 'cluster-autoscaler',
      },
      subjects: [{
        kind: 'ServiceAccount',
        name: this.serviceAccountName,
        namespace: this.namespace,
      }],
    });

    new cdk8s.ApiObject(this, 'role', {
      apiVersion: 'rbac.authorization.k8s.io/v1',
      kind: 'Role',
      metadata: {
        name: 'cluster-autoscaler',
        namespace: this.namespace,
        labels: {
          'k8s-addon': 'cluster-autoscaler.addons.k8s.io',
          'k8s-app': 'cluster-autoscaler',
        },
      },
      rules: [
        {
          apiGroups: [''],
          resources: ['configmaps'],
          verbs: [
            'create',
            'list',
            'watch',
          ],
        },
        {
          apiGroups: [''],
          resources: ['configmaps'],
          resourceNames: [
            'cluster-autoscaler-status',
            'cluster-autoscaler-priority-expander',
          ],
          verbs: [
            'delete',
            'get',
            'update',
            'watch',
          ],
        },
      ],
    });

    new cdk8s.ApiObject(this, 'role-binding', {
      apiVersion: 'rbac.authorization.k8s.io/v1',
      kind: 'RoleBinding',
      metadata: {
        name: 'cluster-autoscaler',
        namespace: this.namespace,
        labels: {
          'k8s-addon': 'cluster-autoscaler.addons.k8s.io',
          'k8s-app': 'cluster-autoscaler',
        },
      },
      roleRef: {
        apiGroup: 'rbac.authorization.k8s.io',
        kind: 'Role',
        name: 'cluster-autoscaler',
      },
      subjects: [{
        kind: 'ServiceAccount',
        name: this.serviceAccountName,
        namespace: this.namespace,
      }],
    });

    new cdk8s.ApiObject(this, 'deployment', {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'cluster-autoscaler',
        namespace: 'kube-system',
        labels: {
          app: 'cluster-autoscaler',
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'cluster-autoscaler',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'cluster-autoscaler',
            },
            annotations: {
              'prometheus.io/scrape': 'true',
              'prometheus.io/port': '8085',
            },
          },
          spec: {
            serviceAccountName: 'cluster-autoscaler',
            containers: [{
              image: this.image,
              name: 'cluster-autoscaler',
              resources: {
                limits: {
                  cpu: '100m',
                  memory: '300Mi',
                },
                requests: {
                  cpu: '100m',
                  memory: '300Mi',
                },
              },
              command: this.commandFunc(opts.command),
              volumeMounts: [{
                name: 'ssl-certs',
                mountPath: '/etc/ssl/certs/ca-certificates.crt',
                readOnly: true,
              }],
              imagePullPolicy: 'Always',
            }],
            volumes: [{
              name: 'ssl-certs',
              hostPath: {
                path: '/etc/ssl/certs/ca-bundle.crt',
              },
            }],
          },
        },
      },
    });

  }
  private commandFunc(comm?: string[]):string[] {
    const defaultCommand = [
      './cluster-autoscaler',
      '--v=4',
      '--stderrthreshold=info',
      '--cloud-provider=aws',
      '--skip-nodes-with-local-storage=false',
      '--expander=least-waste',
    ];
    if (comm) {
      comm.forEach(e => defaultCommand.push(e));
    }
    return defaultCommand;
  }
}