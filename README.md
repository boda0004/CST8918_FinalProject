# CST8918 - DevOps: Infrastructure as Code  
**Final Project: Terraform, Azure AKS, and GitHub Actions**  
Professor: Robert McKenney  


##  Team Members
- Parth Bodana
- Tarang Savaj
- Nikolai Semko

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

##  Project Architecture

```

CST8918_FinalProject/
├── .github/
│   └── workflows/           
├── Screenshots/             
├── app/                     
├── terraform/
│   ├── backend/            
│   ├── network/           
│   ├── aks/                 
│   └── app_resources/      
├── README.md                
└── azure-credentials.json   
```

---

##  Infrastructure Modules
- **Backend Module**  
  Sets up Azure Blob Storage for remote Terraform state management.

- **Network Module**  
  Creates resource group, virtual network (10.0.0.0/14), and four per-environment subnets:
  - `prod`: 10.0.0.0/16  
  - `test`: 10.1.0.0/16  
  - `dev`: 10.2.0.0/16  
  - `admin`: 10.3.0.0/16  

- **AKS Module**  
  - **Test**: 1-node AKS cluster (Standard_B2s)
  - **Prod**: AKS cluster (Standard_B2s, scalable from 1 to 3 nodes)

- **App Resources Module**  
  Provisions:
  - Azure Container Registry (ACR)
  - Azure Cache for Redis instances (test and prod)
  - Kubernetes deployment and service configurations for the Remix Weather App

---

##  CI/CD: GitHub Actions Workflows
| Purpose | Trigger | Actions |
|---------|---------|---------|
| **Terraform Static Checks** | Push to any branch | Runs `terraform fmt`, `terraform validate`, `tfsec` |
| **Terraform Plan & Lint** | PR to `main` | Runs `tflint` and `terraform plan` |
| **Apply Infrastructure** | Merge to `main` | Executes `terraform apply` |
| **Docker Build & Push** | PR to `main` (app changes) | Builds app Docker image, tags with commit SHA, pushes to ACR |
| **Deploy to Test** | PR to `main` (app changes) | Deploys app to test AKS environment |
| **Deploy to Prod** | Merge to `main` (app changes) | Deploys app to production AKS environment |

---

##  Workflow Summary
1. **Infrastructure changes**: Submit PR → plan and lint run → upon merge → infrastructure applied.
2. **Application changes**: Submit PR → build, push to ACR, and deploy to test → upon merge → deploy to production.

---


##  Clean-Up Instructions
To avoid ongoing Azure costs, run:
```bash
terraform destroy
