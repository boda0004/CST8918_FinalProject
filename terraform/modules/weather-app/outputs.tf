output "frontend_service_name" {
  description = "Name of the frontend service"
  value       = kubernetes_service.frontend.metadata[0].name
}

output "backend_service_name" {
  description = "Name of the backend service"
  value       = kubernetes_service.backend.metadata[0].name
}

output "redis_service_name" {
  description = "Name of the Redis service"
  value       = kubernetes_service.redis.metadata[0].name
}