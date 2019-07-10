# Setting up Kubernetes on Google Cloud

You will need Google Credits otherwise you will endup paying for some cash.
This is a step by step process on how to deploy Kubernetes cluster on Google Cloud using 
Docker and Kubernetes: The Complete Guide course background.

Steps:

- Create Kubernetes Project[#]
- Create IAM access as Kubernetes Admin[#]
- Download JSON access[#]
- Encrypt json access with travis encrypt[#]
- Create deploy script[#]


## Create Kubernetes Project
Create a project in GC console, selecting Kubernetes engine and 3 nodes. With the 300 free credits GC offers for students.

Creating user access 

-kubectl create clusterrolebinding tiller-cluster-role --clusterrole=c
luster-admin --serviceaccount=kube-system:tiller

package manager
helm init --service-account tiller --upgrade

install nginx-ingress

helm install stable/nginx-ingress --name my-nginx --set rbac.create=true