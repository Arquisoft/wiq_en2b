# 🧠🤔 wiq_en2b ❓📚

WIQ is a quiz game project inspired by the engaging and thought-provoking show "Saber y Ganar." 
We aim to create a platform that not only challenges your knowledge but also sparks curiosity and the thrill of discovery.


## What Sets WIQ Apart
🤔 Thoughtful Questions: Dive into a world of intriguing and diverse questions, all generated procedurally using WikiData.  
🌐 Encourage to improve: WIQ lets you keep track of your score to see in which areas you need to improve.

## Features
🏆 Adaptable  difficulty: You can adjust the difficulty to push your limits.  
🌐 Multiplayer: Compete with friends and strangers to prove you are the best.

## Contributors
| Nombre                          | UO       |
|---------------------------------|----------|
| Gonzalo Alonso Fernández        | UO282104 |
| Darío Gutiérrez Mori            | UO282435 |
| Sergio Rodríguez García         | UO282598 |
| Jorge Joaquín Gancedo Fernández | UO282161 |
| Sergio Quintana Fernández       | UO288090 |
| Diego Villanueva Berros         | UO283615 |
| Gonzalo Suárez Losada           | UO283928 |
    
***


[![Deploy on release](https://github.com/Arquisoft/wiq_en2b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en2b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en2b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en2b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en2b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en2b)

This is a base repo for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html). 

This repo is a basic application composed of several components.

- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.
- **User service**. Express service that handles the insertion of new users in the system.
- **Auth service**. Express service that handles the authentication of users.
- **Webapp**. React web application that uses the gateway service to allow basic login and new user features.

Both the user and auth service share a Mongo database that is accessed with mongoose.

