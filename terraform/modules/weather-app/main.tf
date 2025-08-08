# Kubernetes provider configuration
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

# Weather API Secret
resource "kubernetes_secret" "weather_api" {
  metadata {
    name      = "weather-api-secret"
    namespace = var.namespace
  }

  data = {
    api-key = base64encode(var.openweather_api_key)
  }

  type = "Opaque"
}

# Redis Deployment
resource "kubernetes_deployment" "redis" {
  metadata {
    name      = "redis"
    namespace = var.namespace
    labels = {
      app = "redis"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "redis"
      }
    }

    template {
      metadata {
        labels = {
          app = "redis"
        }
      }

      spec {
        container {
          image = "redis:7-alpine"
          name  = "redis"

          port {
            container_port = 6379
          }

          resources {
            limits = {
              cpu    = "200m"
              memory = "256Mi"
            }
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
          }
        }
      }
    }
  }
}

# Redis Service
resource "kubernetes_service" "redis" {
  metadata {
    name      = "redis-service"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "redis"
    }

    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}

# Backend Deployment
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "weather-backend"
    namespace = var.namespace
    labels = {
      app = "weather-backend"
    }
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = {
        app = "weather-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "weather-backend"
        }
      }

      spec {
        container {
          image = "${var.acr_login_server}/weather-backend:${var.app_version}"
          name  = "weather-backend"

          port {
            container_port = 3000
          }

          env {
            name = "OPENWEATHER_API_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.weather_api.metadata[0].name
                key  = "api-key"
              }
            }
          }

          env {
            name  = "REDIS_HOST"
            value = "redis-service"
          }

          env {
            name  = "REDIS_PASSWORD"
            value = ""
          }

          env {
            name  = "REDIS_PORT"
            value = "6379"
          }

          env {
            name  = "REDIS_TLS"
            value = "false"
          }

          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 30
            period_seconds        = 10
          }

          readiness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 5
            period_seconds        = 5
          }
        }
      }
    }
  }

  depends_on = [kubernetes_deployment.redis]
}

# Backend Service
resource "kubernetes_service" "backend" {
  metadata {
    name      = "weather-backend-service"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "weather-backend"
    }

    port {
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}

# Frontend Deployment
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "weather-frontend"
    namespace = var.namespace
    labels = {
      app = "weather-frontend"
    }
  }

  spec {
    replicas = var.frontend_replicas

    selector {
      match_labels = {
        app = "weather-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "weather-frontend"
        }
      }

      spec {
        container {
          image = "${var.acr_login_server}/weather-frontend:${var.app_version}"
          name  = "weather-frontend"

          port {
            container_port = 3000
          }

          env {
            name  = "BACKEND_URL"
            value = "http://weather-backend-service:3000"
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 3000
            }
            initial_delay_seconds = 30
            period_seconds        = 10
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 3000
            }
            initial_delay_seconds = 5
            period_seconds        = 5
          }
        }
      }
    }
  }

  depends_on = [kubernetes_deployment.backend]
}

# Frontend Service
resource "kubernetes_service" "frontend" {
  metadata {
    name      = "weather-frontend-service"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "weather-frontend"
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}