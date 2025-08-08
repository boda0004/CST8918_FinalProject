output "backend_config" {
  description = "Backend configuration for other Terraform configurations"
  value = {
    resource_group_name  = module.terraform_backend.resource_group_name
    storage_account_name = module.terraform_backend.storage_account_name
    container_name      = module.terraform_backend.container_name
  }
}