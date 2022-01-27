# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ClusterAutoScaler <a name="ClusterAutoScaler" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler"></a>

#### Initializers <a name="Initializers" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer"></a>

```typescript
import { ClusterAutoScaler } from '@opencdk8s/cdk8s-cluster-autoscaler-aws'

new ClusterAutoScaler(scope: Construct, name: string, opts: ClusterAutoScalerOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.opts">opts</a></code> | <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions">ClusterAutoScalerOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.name"></a>

- *Type:* string

---

##### `opts`<sup>Required</sup> <a name="opts" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.Initializer.parameter.opts"></a>

- *Type:* <a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions">ClusterAutoScalerOptions</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.command">command</a></code> | <code>string[]</code> | Extra commands for controller. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.createServiceAccount">createServiceAccount</a></code> | <code>boolean</code> | service account for aws-load-balancer-controller. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.image">image</a></code> | <code>string</code> | image for deployment. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.namespace">namespace</a></code> | <code>string</code> | Namespace. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.serviceAccountName">serviceAccountName</a></code> | <code>string</code> | Service Account Name. |

---

##### `command`<sup>Optional</sup> <a name="command" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]
- *Default:* [ './cluster-autoscaler', '--v=4', '----stderrthreshold=info', '--cloud-provider=aws', '--skip-nodes-with-local-storage=false', '--expander=least-waste' ]

Extra commands for controller.

---

##### `createServiceAccount`<sup>Optional</sup> <a name="createServiceAccount" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.createServiceAccount"></a>

```typescript
public readonly createServiceAccount: boolean;
```

- *Type:* boolean
- *Default:* true

service account for aws-load-balancer-controller.

---

##### `image`<sup>Optional</sup> <a name="image" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

image for deployment.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* kube-system

Namespace.

---

##### `serviceAccountName`<sup>Optional</sup> <a name="serviceAccountName" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScaler.property.serviceAccountName"></a>

```typescript
public readonly serviceAccountName: string;
```

- *Type:* string
- *Default:* cluster-autoscaler

Service Account Name.

---


## Structs <a name="Structs" id="Structs"></a>

### ClusterAutoScalerOptions <a name="ClusterAutoScalerOptions" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions"></a>

#### Initializer <a name="Initializer" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.Initializer"></a>

```typescript
import { ClusterAutoScalerOptions } from '@opencdk8s/cdk8s-cluster-autoscaler-aws'

const clusterAutoScalerOptions: ClusterAutoScalerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.command">command</a></code> | <code>string[]</code> | Extra commands for controller. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.createServiceAccount">createServiceAccount</a></code> | <code>boolean</code> | service account for aws-load-balancer-controller. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.image">image</a></code> | <code>string</code> | image for deployment. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.namespace">namespace</a></code> | <code>string</code> | Namespace. |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.serviceAccountName">serviceAccountName</a></code> | <code>string</code> | Service Account Name. |

---

##### `command`<sup>Optional</sup> <a name="command" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]
- *Default:* [ './cluster-autoscaler', '--v=4', '----stderrthreshold=info', '--cloud-provider=aws', '--skip-nodes-with-local-storage=false', '--expander=least-waste' ]

Extra commands for controller.

---

##### `createServiceAccount`<sup>Optional</sup> <a name="createServiceAccount" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.createServiceAccount"></a>

```typescript
public readonly createServiceAccount: boolean;
```

- *Type:* boolean
- *Default:* true

service account for aws-load-balancer-controller.

---

##### `image`<sup>Optional</sup> <a name="image" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

image for deployment.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* kube-system

Namespace.

---

##### `serviceAccountName`<sup>Optional</sup> <a name="serviceAccountName" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.ClusterAutoScalerOptions.property.serviceAccountName"></a>

```typescript
public readonly serviceAccountName: string;
```

- *Type:* string
- *Default:* cluster-autoscaler

Service Account Name.

---

## Classes <a name="Classes" id="Classes"></a>

### AwsClusterAutoScalerPolicyHelper <a name="AwsClusterAutoScalerPolicyHelper" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.AwsClusterAutoScalerPolicyHelper"></a>

Aws External Dns Policy class ,help you add policy to your Iam Role for service account.

#### Initializers <a name="Initializers" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.AwsClusterAutoScalerPolicyHelper.Initializer"></a>

```typescript
import { AwsClusterAutoScalerPolicyHelper } from '@opencdk8s/cdk8s-cluster-autoscaler-aws'

new AwsClusterAutoScalerPolicyHelper()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@opencdk8s/cdk8s-cluster-autoscaler-aws.AwsClusterAutoScalerPolicyHelper.addPolicy">addPolicy</a></code> | *No description.* |

---

##### `addPolicy` <a name="addPolicy" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.AwsClusterAutoScalerPolicyHelper.addPolicy"></a>

```typescript
import { AwsClusterAutoScalerPolicyHelper } from '@opencdk8s/cdk8s-cluster-autoscaler-aws'

AwsClusterAutoScalerPolicyHelper.addPolicy(role: any)
```

###### `role`<sup>Required</sup> <a name="role" id="@opencdk8s/cdk8s-cluster-autoscaler-aws.AwsClusterAutoScalerPolicyHelper.addPolicy.parameter.role"></a>

- *Type:* any

---




