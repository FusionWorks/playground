# Build services
docker_build(
    ref='first-service',
    context='services/first-service',
    dockerfile='services/first-service/Dockerfile',
    live_update=[
        sync('services/first-service/src', '/app/src'),
    ],
    entrypoint=['npm', 'run', 'start:debug']
)

docker_build(
    ref='gateway',
    context='services/gateway',
    dockerfile='services/gateway/Dockerfile',
    live_update=[sync('services/gateway', '/app')],
    entrypoint=['npm', 'run', 'start:debug']
)

docker_build(
    ref='second-service',
    context='services/second-service',
    dockerfile='services/second-service/Dockerfile',
    live_update=[sync('services/second-service', '/app')],
    entrypoint=['npm', 'run', 'start:debug']
)

docker_build(
    ref='cron-service',
    context='services/cron-service',
    dockerfile='services/cron-service/Dockerfile',
    live_update=[sync('services/cron-service', '/app')],
    entrypoint=['npm', 'run', 'start:debug']
)

# Deploy K8s manifests
k8s_yaml([
    'kubernetes/first-service.yaml',
    'kubernetes/gateway.yaml',
    'kubernetes/nats.yaml',
    'kubernetes/second-service.yaml',
    'kubernetes/cron-service.yaml'
])

# Config K8s resources
k8s_resource('first-service', labels=['backend'], resource_deps=['nats'])
k8s_resource('gateway', port_forwards=3000, labels=['backend'], resource_deps=['nats'])
k8s_resource('second-service', labels=['backend'], resource_deps=['nats'])
k8s_resource('cron-service', labels=['backend'], resource_deps=['nats'])
k8s_resource('nats', labels=['services'])
