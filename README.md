# CI/CD Pipeline Without Docker

## Overview
This project demonstrates a DevOps pipeline that automates the process of building, testing, and deploying an application without using containerization.

## Objective
- Implement Continuous Integration and Continuous Deployment (CI/CD)
- Automate testing and deployment
- Understand DevOps workflow without Docker

## Tech Stack
- Version Control: Git & GitHub
- CI/CD: GitHub Actions / Jenkins
- Language: (e.g., Java / Python / Node.js)
- Hosting: Local Machine / Cloud

## Workflow
1. Developer pushes code to GitHub
2. CI pipeline is triggered
3. Dependencies are installed
4. Code is tested
5. Application is deployed

## CI/CD Pipeline
- Trigger: On every push
- Steps:
  - Checkout code
  - Install dependencies
  - Run tests
  - Deploy application

## How to Run

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo