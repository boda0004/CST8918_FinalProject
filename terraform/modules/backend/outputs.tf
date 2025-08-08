output "resource_group_name" {
  description = "Name of the created resource group"
  value       = azurerm_resource_group.terraform_state.name
}

output "storage_account_name" {
  description = "Name of the created storage account"
  value       = azurerm_storage_account.terraform_state.name
}

output "container_name" {
  description = "Name of the created storage container"
  value       = azurerm_storage_container.terraform_state.name
}

output "storage_account_key" {
  description = "Primary access key for the storage account"
  value       = azurerm_storage_account.terraform_state.primary_access_key
  sensitive   = true
}