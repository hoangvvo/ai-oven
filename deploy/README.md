# Deployment

## Build image

```bash
docker build \
  -t localhost:32000/ai-oven:latest \
  ../

docker push localhost:32000/ai-oven:latest
```

## Deploy to k8s

Create `values-override.yaml

```yaml
ingress:
  enabled: false
  className: ""
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []

env:
  DATABASE_URL: postgresldburl
  MILVUS_HOST: milvushost
  PAYPAL_CLIENT_ID: id
  PAYPAL_CLIENT_SECRET: secret
  JWT_SECRET: secret
  OPENAI_API_KEY: value
  SECRET_KEY: secret
```

Deploy

```bash
helm upgrade --install -f aioven/values-override.yaml aioven ./aioven -n aioven --create-namespace
```
