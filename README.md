# 🧠🤔 KiWiq 🥝❓📚
Visit our page [here!!!](http://kiwiq.run.place/).

WIQ is a quiz game project inspired by the engaging and thought-provoking show "Saber y Ganar." 
We aim to create a platform that not only challenges your knowledge but also sparks curiosity and the thrill of discovery.


## What Sets WIQ Apart
🤔 Thoughtful Questions: Dive into a world of intriguing and diverse questions, all generated procedurally using WikiData.  
🌐 Encourage to improve: WIQ lets you keep track of your score to see in which areas you need to improve. 

😭 It works! after the final version final re-final (FINAL) true (final) (hotfix)

## Features
🏆 Adaptable  difficulty: You can adjust the difficulty to push your limits.  

🌐 Multiplayer: Compete with friends and strangers to prove you are the best.

🌐 Localized: Available in Spanish and English.

## Contributors
Contributor | Contact
-- | -- 
Gonzalo Alonso Fernández | <a href="https://github.com/gony02"><img src="https://img.shields.io/badge/UO282104-Gonzalo Alonso-red"></a>
Sergio Rodríguez García | <a href="https://github.com/sergiorodriguezgarcia"><img src="https://img.shields.io/badge/UO282598-Sergio Rodríguez-orange"></a>
Jorge Joaquín Gancedo Fernández | <a href="https://github.com/jjgancfer"><img src="https://img.shields.io/badge/UO282161-Jorge Joaquín Gancedo-yellow"></a>
Darío Gutiérrez Mori | <a href="https://github.com/Toto-hitori"><img src="https://img.shields.io/badge/UO282435-Darío Gutiérrez-green"></a>
Sergio Quintana Fernández | <a href="https://github.com/sergioqfeg1"><img src="https://img.shields.io/badge/UO288090-Sergio Quintana-cyan"></a>
Diego Villanueva Berros | <a href="https://github.com/UO283615"><img src="https://img.shields.io/badge/UO283615-Diego Villanueva-blue"></a>
Gonzalo Suárez Losada | <a href="https://github.com/uo283928"><img src="https://img.shields.io/badge/UO283928-Gonzalo Suárez-pink"></a>
    
***


[![Deploy on release](https://github.com/Arquisoft/wiq_en2b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en2b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en2b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en2b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en2b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en2b)

This is a repository for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html).

This repo is a basic application composed of several components.

Component | Route | Description
-- | -- | --
Backend/API | `api/` | The main backend service, implemented in Java SpringBoot. It serves all requests from the frontend, and it doubles as main API. It also has a JWT-based authentication system.
Question generator | `questiongenerator/` | A SpringBoot-based service, ran alongside the main backend service, that generates questions and inserts them into the database
Webapp | `webapp/` | Our own frontend to the backend. It is implemented in React 18.
    
***

Both the backend/API and the question generator use PostgreSQL.
