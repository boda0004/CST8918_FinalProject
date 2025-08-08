variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "cst8918-final-project-group-5-dev"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "node_count" {
  description = "Number of AKS nodes"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "Size of AKS nodes"
  type        = string
  default     = "Standard_B2s"
}

variable "openweather_api_key" {
  description = "OpenWeather API key"
  type        = string
  sensitive   = true
}

locals {
  tags = {
    Environment = var.environment
    Project     = "CST8918-Final"
    Team        = "Group-5"
    CreatedBy   = "Terraform"
  }
}
