# building our projects
docker build -t vinipachecov/multi-client:latest -t vinipachecov/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t vinipachecov/multi-server:latest -t vinipachecov/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t vinipachecov/multi-worker:latest -t vinipachecov/multi-worker:$SHA -f ./worker/Dockerfile ./worker
# pushing them
docker push vinipachecov/multi-client:latest
docker push vinipachecov/multi-server:latest
docker push vinipachecov/multi-worker:latest

docker push vinipachecov/multi-client:$SHA
docker push vinipachecov/multi-server:$SHA
docker push vinipachecov/multi-worker:$SHA
kubectl apply -f k8s/
kubectl set image deployments/server-deployment server=vinipachecov/multi-server:$SHA
kubectl set image deployments/client-deployment client=vinipachecov/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=vinipachecov/multi-worker:$SHA


