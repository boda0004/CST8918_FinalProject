variable "namespace" {
  description = "Kubernetes namespace for the weather app"
  type        = string
  default     = "default"
}

variable "acr_login_server" {
  description = "Azure Container Registry login server"
  type        = string
}

variable "app_version" {
  description = "Version tag for the application images"
  type        = string
  default     = "latest"
}

variable "openweather_api_key" {
  description = "OpenWeather API key"
  type        = string
  sensitive   = true
}

variable "backend_replicas" {
  description = "Number of backend replicas"
  type        = number
  default     = 2
}

variable "frontend_replicas" {
  description = "Number of frontend replicas"
  type        = number
  default     = 2
}