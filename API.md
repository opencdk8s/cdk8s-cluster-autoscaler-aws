# API Reference

**Classes**

Name|Description
----|-----------
[AwsClusterAutoScalerPolicyHelper](#opencdk8s-cdk8s-cluster-autoscaler-aws-awsclusterautoscalerpolicyhelper)|Aws External Dns Policy class ,help you add policy to your Iam Role for service account.
[ClusterAutoScaler](#opencdk8s-cdk8s-cluster-autoscaler-aws-clusterautoscaler)|*No description*


**Structs**

Name|Description
----|-----------
[ClusterAutoScalerOptions](#opencdk8s-cdk8s-cluster-autoscaler-aws-clusterautoscaleroptions)|*No description*



## class AwsClusterAutoScalerPolicyHelper 🔹 <a id="opencdk8s-cdk8s-cluster-autoscaler-aws-awsclusterautoscalerpolicyhelper"></a>

Aws External Dns Policy class ,help you add policy to your Iam Role for service account.


### Initializer




```ts
new AwsClusterAutoScalerPolicyHelper()
```



### Methods


#### *static* addPolicy(role)🔹 <a id="opencdk8s-cdk8s-cluster-autoscaler-aws-awsclusterautoscalerpolicyhelper-addpolicy"></a>



```ts
static addPolicy(role: any): any
```

* **role** (<code>any</code>)  *No description*

__Returns__:
* <code>any</code>



## class ClusterAutoScaler 🔹 <a id="opencdk8s-cdk8s-cluster-autoscaler-aws-clusterautoscaler"></a>



__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new ClusterAutoScaler(scope: Construct, name: string, opts: ClusterAutoScalerOptions)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **opts** (<code>[ClusterAutoScalerOptions](#opencdk8s-cdk8s-cluster-autoscaler-aws-clusterautoscaleroptions)</code>)  *No description*
  * **command** (<code>Array<string></code>)  Extra commands for controller. __*Default*__: [ './cluster-autoscaler', '--v=4', '----stderrthreshold=info', '--cloud-provider=aws', '--skip-nodes-with-local-storage=false', '--expander=least-waste' ]
  * **createServiceAccount** (<code>boolean</code>)  service account for aws-load-balancer-controller. __*Default*__: true
  * **image** (<code>string</code>)  image for deployment. __*Optional*__
  * **namespace** (<code>string</code>)  Namespace. __*Default*__: kube-system
  * **serviceAccountName** (<code>string</code>)  Service Account Name. __*Default*__: cluster-autoscaler



### Properties


Name | Type | Description 
-----|------|-------------
**command**?🔹 | <code>Array<string></code> | Extra commands for controller.<br/>__*Default*__: [ './cluster-autoscaler', '--v=4', '----stderrthreshold=info', '--cloud-provider=aws', '--skip-nodes-with-local-storage=false', '--expander=least-waste' ]
**createServiceAccount**?🔹 | <code>boolean</code> | service account for aws-load-balancer-controller.<br/>__*Default*__: true
**image**?🔹 | <code>string</code> | image for deployment.<br/>__*Optional*__
**namespace**?🔹 | <code>string</code> | Namespace.<br/>__*Default*__: kube-system
**serviceAccountName**?🔹 | <code>string</code> | Service Account Name.<br/>__*Default*__: cluster-autoscaler



## struct ClusterAutoScalerOptions 🔹 <a id="opencdk8s-cdk8s-cluster-autoscaler-aws-clusterautoscaleroptions"></a>






Name | Type | Description 
-----|------|-------------
**command**?🔹 | <code>Array<string></code> | Extra commands for controller.<br/>__*Default*__: [ './cluster-autoscaler', '--v=4', '----stderrthreshold=info', '--cloud-provider=aws', '--skip-nodes-with-local-storage=false', '--expander=least-waste' ]
**createServiceAccount**?🔹 | <code>boolean</code> | service account for aws-load-balancer-controller.<br/>__*Default*__: true
**image**?🔹 | <code>string</code> | image for deployment.<br/>__*Optional*__
**namespace**?🔹 | <code>string</code> | Namespace.<br/>__*Default*__: kube-system
**serviceAccountName**?🔹 | <code>string</code> | Service Account Name.<br/>__*Default*__: cluster-autoscaler



