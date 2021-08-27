# cdk8s-cluster-autoscaler-aws

![Release](https://github.com/opencdk8s/cdk8s-cluster-autoscaler-aws/workflows/Release/badge.svg?branch=development)
[![npm version](https://badge.fury.io/js/%40opencdk8s%2Fcdk8s-cluster-autoscaler-aws.svg)](https://badge.fury.io/js/%40opencdk8s%2Fcdk8s-cluster-autoscaler-aws)
[![PyPI version](https://badge.fury.io/py/cdk8s-cluster-autoscaler-aws.svg)](https://badge.fury.io/py/cdk8s-cluster-autoscaler-aws)
![npm](https://img.shields.io/npm/dt/@opencdk8s/cdk8s-cluster-autoscaler-aws?label=npm&color=green)

Synths an install manifest for [cluster-autoscaler AWS](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)

## Controller version : `v1.17.3`

## Overview


### `cluster-autoscaler-autodiscover.yaml` example

```typescript
import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { ClusterAutoScaler } from '@opencdk8s/cdk8s-cluster-autoscaler-aws';


export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    const clusterName = 'example';

    new ClusterAutoScaler(this, 'example', {
      createServiceAccount: true,
      command: [
        `--node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/${clusterName}`,
      ],
    })

  }
}

const app = new App();
new MyChart(app, 'example');
app.synth();

```

<details>
<summary>cluster-autoscaler-autodiscover.yaml</summary>

```yaml

apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
rules:
  - apiGroups:
      - ""
    resources:
      - events
      - endpoints
    verbs:
      - create
      - patch
  - apiGroups:
      - ""
    resources:
      - pods/eviction
    verbs:
      - create
  - apiGroups:
      - ""
    resources:
      - pods/status
    verbs:
      - update
  - apiGroups:
      - ""
    resourceNames:
      - cluster-autoscaler
    resources:
      - endpoints
    verbs:
      - get
      - update
  - apiGroups:
      - ""
    resources:
      - nodes
    verbs:
      - watch
      - list
      - get
      - update
  - apiGroups:
      - ""
    resources:
      - pods
      - services
      - replicationcontrollers
      - persistentvolumeclaims
      - persistentvolumes
    verbs:
      - watch
      - list
      - get
  - apiGroups:
      - extensions
    resources:
      - replicasets
      - daemonsets
    verbs:
      - watch
      - list
      - get
  - apiGroups:
      - policy
    resources:
      - poddisruptionbudgets
    verbs:
      - watch
      - list
  - apiGroups:
      - apps
    resources:
      - statefulsets
      - replicasets
      - daemonsets
    verbs:
      - watch
      - list
      - get
  - apiGroups:
      - storage.k8s.io
    resources:
      - storageclasses
      - csinodes
    verbs:
      - watch
      - list
      - get
  - apiGroups:
      - batch
      - extensions
    resources:
      - jobs
    verbs:
      - get
      - list
      - watch
      - patch
  - apiGroups:
      - coordination.k8s.io
    resources:
      - leases
    verbs:
      - create
  - apiGroups:
      - coordination.k8s.io
    resourceNames:
      - cluster-autoscaler
    resources:
      - leases
    verbs:
      - get
      - update
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system
rules:
  - apiGroups:
      - ""
    resources:
      - configmaps
    verbs:
      - create
      - list
      - watch
  - apiGroups:
      - ""
    resourceNames:
      - cluster-autoscaler-status
      - cluster-autoscaler-priority-expander
    resources:
      - configmaps
    verbs:
      - delete
      - get
      - update
      - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      annotations:
        prometheus.io/port: "8085"
        prometheus.io/scrape: "true"
      labels:
        app: cluster-autoscaler
    spec:
      containers:
        - command:
            - ./cluster-autoscaler
            - --v=4
            - ----stderrthreshold=info
            - --cloud-provider=aws
            - --skip-nodes-with-local-storage=false
            - --expander=least-waste
            - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/example
          image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.17.3
          imagePullPolicy: Always
          name: cluster-autoscaler
          resources:
            limits:
              cpu: 100m
              memory: 300Mi
            requests:
              cpu: 100m
              memory: 300Mi
          volumeMounts:
            - mountPath: /etc/ssl/certs/ca-certificates.crt
              name: ssl-certs
              readOnly: true
      serviceAccountName: cluster-autoscaler
      volumes:
        - hostPath:
            path: /etc/ssl/certs/ca-bundle.crt
          name: ssl-certs

```
</details>

## Installation

### TypeScript

Use `yarn` or `npm` to install.

```sh
$ npm install @opencdk8s/cdk8s-cluster-autoscaler-aws
```

```sh
$ yarn add @opencdk8s/cdk8s-cluster-autoscaler-aws
```

### Python

```sh
$ pip install cdk8s-cluster-autoscaler-aws
```

## Contribution

1. Fork ([link](https://github.com/opencdk8s/cdk8s-cluster-autoscaler-aws/fork))
2. Bootstrap the repo:
  
    ```bash
    npx projen   # generates package.json 
    yarn install # installs dependencies
    ```
3. Development scripts:
   |Command|Description
   |-|-
   |`yarn compile`|Compiles typescript => javascript
   |`yarn watch`| watch & compile
   |`yarn test`|Run unit test & linter through jest
   |`yarn test -u`|Update jest snapshots
   |`yarn run package`|Creates a `dist` with packages for all languages.
   |`yarn build`|Compile + test + package
   |`yarn bump`|Bump version (with changelog) based on [conventional commits]
   |`yarn release`|Bump + push to `master`
4. Create a feature branch
5. Commit your changes
6. Rebase your local changes against the master branch
7. Create a new Pull Request (use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for the title please)

## Licence

[Apache License, Version 2.0](./LICENSE)

## Author

[Hunter-Thompson](https://github.com/Hunter-Thompson)
