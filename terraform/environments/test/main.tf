terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }

  # Will be configured after bootstrap
  # backend "azurerm" {
  #   resource_group_name  = "cst8918-terraform-state-group-5"
  #   storage_account_name = "STORAGE_ACCOUNT_NAME"
  #   container_name       = "tfstate"
  #   key                  = "dev.terraform.tfstate"
  # }
}

provider "azurerm" {
  features {}
}

# Dev Environment Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = local.tags
}

# Create a simple AKS cluster for dev environment
resource "azurerm_kubernetes_cluster" "dev" {
  name                = "test-weather-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "test-weather"
  kubernetes_version  = "1.32"

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.node_vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = local.tags
}

# Azure Container Registry for dev
resource "azurerm_container_registry" "dev" {
  name                = "cst8918weatheracrtest"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = local.tags
}

# Grant AKS pull permissions to ACR
#resource "azurerm_role_assignment" "aks_acr_pull" {
#  principal_id                     = azurerm_kubernetes_cluster.dev.kubelet_identity[0].object_id
#  role_definition_name             = "AcrPull"
#  scope                           = azurerm_container_registry.dev.id
#  skip_service_principal_aad_check = true
#}
