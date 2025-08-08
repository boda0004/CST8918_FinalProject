variable "resource_group_name" {
  description = "Name of the resource group for Terraform state"
  type        = string
}

variable "storage_account_name" {
  description = "Name of the storage account for Terraform state"
  type        = string
}

variable "container_name" {
  description = "Name of the storage container for Terraform state"
  type        = string
  default     = "tfstate"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}