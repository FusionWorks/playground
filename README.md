# NestJS + NATS + Minikube + Tilt Playground

<img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" alt="NestJS" height="64"> <img src="https://nats.io/img/logos/nats-icon-white.png" alt="NATS" height="64">  <img src="https://raw.githubusercontent.com/kubernetes/minikube/master/images/logo/logo.png" alt="Minikube" height="64">  <img src="https://docs.tilt.dev/favicon.ico" alt="Tilt" height="64"> 

This project is using Minikube and Tilt as a matter of local development for Kubernetes, to spin up the infrastructure please follow these steps:

- Install Docker
- Install kubectl cli
- Install Minikube cluster
- Install Tilt
- Spin up the development environment

## Install Docker
### Windows
- Download this [installer](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=header) and follow the steps

### macOS
- For Intel download this [installer](https://desktop.docker.com/mac/main/amd64/Docker.dmg)
- For Apple Silicon download this [installer](https://desktop.docker.com/mac/main/arm64/Docker.dmg)

### Linux
- Install snap repo for your distro
- Install docker with snap
```bash
sudo snapd install docker
```

## Install kubectl cli
### Windows
1. Download the latest [release v1.23.0](https://dl.k8s.io/release/v1.23.0/bin/windows/amd64/kubectl.exe)
2. Move it to a desired directory, for example `C:\Program Files\Kubectl\kubectl.exe`
3. Add the directory created in previous step to the `PATH` environment variable,
to do so press **Win+R** and type _**sysdm.cpl**_ then open envrionment variables
4. Test to ensure the version you installed is up-to-date:
 ```powershell
 kubectl version --client
 ```

### macOS
1. Download the latest release:
- For Intel:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
```
- For Apple Silicon:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"
```
2. Make the kubectl binary executable 
```bash
chmod +x ./kubectl
```
3. Move the kubectl binary to a file location on your system `PATH`
```bash
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl
```
5. Test to ensure the version you installed is up-to-date:
 ```bash
 kubectl version --client
 ```

### Linux
1. Download the latest release: 
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```
3. Install kubectl 
```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```
5. Test to ensure the version you installed is up-to-date:
 ```bash
 kubectl version --client
 ```

## Install Minikube cluster
### Windows
1. Download the [latest release](https://storage.googleapis.com/minikube/releases/latest/minikube-installer.exe)
2. Install the Minikube following installer steps
3. Start your cluster 
```powershell
minikube start
```

### macOS
1. Install the latest release:
```bash 
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```
2. Start your cluster
```bash
minikube start
```

### Linux
1. Install the latest release:
```bash 
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```
2. Start your cluster
```bash
minikube start
```

## Install Tilt

### Windows
```powershell
iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.ps1'))
```

### macOS/Linux
```bash
curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash
```

## Spin up the local setup
Run this command from root dir of the project
```
tilt up
```