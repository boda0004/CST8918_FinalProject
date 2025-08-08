terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "terraform_backend" {
  source = "../modules/backend"

  resource_group_name   = "cst8918-terraform-state-group-5"
  storage_account_name  = "cst8918tfstate${random_string.suffix.result}"
  location             = "East US"
  
  tags = {
    Environment = "shared"
    Project     = "CST8918-Final"
    Team        = "Group-5"
  }
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}