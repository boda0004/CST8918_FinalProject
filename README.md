# CST8918 - DevOps: Infrastructure as Code  
**Final Project: Terraform, Azure AKS, and GitHub Actions**  
Professor: Robert McKenney  

##  Project Overview
This project implements the final capstone for CST8918, applying Infrastructure as Code (IaC) concepts using **Terraform**, **Azure Kubernetes Service (AKS)**, and **GitHub Actions**.  
It extends the **Remix Weather Application** from Week 3, deploying it to multiple Azure environments (dev, test, prod) with automated CI/CD pipelines.  

The solution provisions:
- **Azure Resource Group, Networking, and Subnets** for multiple environments.
- **AKS clusters** in both `test` and `prod` environments.
- **Azure Container Registry (ACR)** for storing the Dockerized Weather App.
- **Azure Cache for Redis** instances for caching weather API responses.
- **Automated infrastructure deployment** and **application deployment pipelines** via GitHub Actions.

---

---

## 🏗 Project Architecture
