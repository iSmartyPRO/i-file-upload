# Установка MongoDB на Windows
Установка MongoDB Server на Windows, используя Chocolatey (см. ниже)

```
choco install mongodb --pre
```

# Установка клиента Mongo Shell
Установка MongoDB Shell на Windows, используя Chocolatey (см. ниже)
```
choco install mongodb-shell
```


# Установка Chocolatey
URL: https://chocolatey.org/install

Запускать из PowerShell с админскими правами
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```