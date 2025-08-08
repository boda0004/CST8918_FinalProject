output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.dev.name
}

output "acr_login_server" {
  value = azurerm_container_registry.dev.login_server
}

output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "kube_config" {
  value     = azurerm_kubernetes_cluster.dev.kube_config_raw
  sensitive = true
}
