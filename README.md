# 🎛🎵 Rebmem Engineering Music Player

This is the music player application designed for Rebmem Engineering. This forms part of my final submission for the 
level 4 software developer apprenticeship with QA. This main `README.md` contains the basic information on how to run 
the application and a high-level view of how it is put together. Please see the `Further Documentation` section for 
links to the rest of the documentation, which delve into more detail about technologies used for the separate parts of 
the application.

## 📋 Contents

1. [✅ Pre-Requisites](#-pre-requisites)
2. [🏁 First Time Setup](#-first-time-setup)
    1. [⬇️ Install Dependencies](#-install-dependencies)
    2. [💾 Restore Database](#-restore-database)
3. [📱 Usage](#-usage)
    1. [🛠 Development](#-development)
    2. [📦 Build](#-build)
    3. [📤 Deployment](#-deployment)
    4. [🧪 Testing](#-testing)
4. [📼 Technologies](#-technologies)
5. [🌳 Structure](#-structure)
6. [🗒 Further Documentation](#-further-documentation)
    1. [⚛️ App](packages/app/README.md)
    2. [🖥 Server](packages/server/README.md)
    3. [💾 Database](packages/database/README.md)
7. [⏭ Next Steps](#-next-steps)

## ✅ Pre-Requisites

You must have the following installed on your computer to be able to use this repository:

- [NodeJS@10.18.0](https://nodejs.org/en/blog/release/v10.18.0)
- [MongoDB Community Server@4.2.8](https://www.mongodb.com/try/download/community)
- [Yarn@1.22.4](https://classic.yarnpkg.com/en/docs/install/)

> The versions are the recommended versions used, I cannot guarantee this will run using different versions

## 🏁 First Time Setup

### ⬇️ Install Dependencies

First, you must run the following command in the root directory:
```shell script
yarn
```
This will install all the dependencies required by each of the projects.

### 💾 Restore Database

Next, in order to restore the database, you must have the database running:
```shell script
yarn serve:db
```

Then in another terminal window you need to restore the database using the dump provided:
```shell script
yarn restore:db
```

> This will provide you a database with mock data that plugs directly into the nodeJS server. For an actual production
> version of this application, another solution for storing and distributing the database will need to be conceived. 

## 📱 Usage

> IMPORTANT: READ FIRST
> ___
> The application has been developed with certain assumptions about the hardware it will run on. As such, you must follow
> these steps to see it running correctly:
> 1. Launch the Google Chrome web browser
> 2. Activate the developer tools _(either right-click anywhere on the screen and choose `Inspect` or navigate to the menu and choose `More Tools > 
> Developer Tools`)_
> 3. Click on the `Toggle device toolbar` button in the header of the dev tools
> 4. Change the `Responsive` dropdown menu to `iPhone X`
> 5. Finally, navigate to [http://localhost:3000](http://localhost:3000) to see the application running

### 🛠 Development

This project comprises a React application, an express server and a mongoDB database. To run the three concurrently
for development, you need to run this single command in the root directory:
```shell script
yarn serve:dev
```

Alternatively, if you wish to run each of the services individually because you want more visibility over which log 
you're looking at, then run the same command, inside each of the package directories. For example:
```bash
cd packages/database && yarn serve:dev
cd packages/server && yarn serve:dev
cd packages/app && yarn serve:dev
```
> This order is important, you must start by launching the database, then the server and finally the application.

### 📦 Build

> The following information covers the build process as it is at the moment. Please refer to the assumptions and 
> limitations part of my submission to understand more about this. It would theoretically need further work.

If you want to build and serve this application as a production application, simply run these commands:
```shell script
yarn build
yarn serve
```
This will serve onto `http://localhost:4000` which is a distinction from the development server.

As part of the business requirements of this project, it has been requested that this application can run in a low
power mode. To achieve this, I have implemented use of [pm2](https://pm2.keymetrics.io/) which allows you to run node
processes in the background. As such, after the above commands have been run the servers will become background 
processes, and you will be unable to see logs.

If you wish to see the logs, please install pm2 globally: 
```shell script
yarn global add pm2
```
Then run:
```shell script
pm2 logs
```

In addition, you can stop these processes from running if you run:
```shell script
yarn stop
```

> There is currently one known issue with this that needs to be fixed:
>
> - [ ] Background colour not updating correctly

### 📤 Deployment

> Deployment is purely subject to the hardware, which can be handled in phase 2 of the project.

### 🧪 Testing

Unit testing has been provided for part of this application. You can run these unit tests easily from the root of the
project by using the following command:
```shell script
yarn test
```

## 📼 Technologies

* [Lerna](https://lerna.js.org/) is used to for the monorepo structure of this repository.
* [TypeScript](https://www.typescriptlang.org/) is used for strict type checking.
* [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used for quality control and styling of the
code.

## 🌳 Structure

Using the workspace technology provided with lerna, this repository is split into 3 distinct packages:
 * `@rebmem-music-player/app` - this is the front-end part of the application, providing all of the 
 [ReactJS](https://reactjs.org/) code.
 * `@rebmem-music-player/server` - this forms part of the back-end of the application, providing a 
 [NodeJS](https://nodejs.org/) / [ExpressJS](https://expressjs.com/) server, utilising 
 [mongoose](https://mongoosejs.com/) to interact with the database.
 * `@rebmem-music-player/database` - this is the other half of the back-end of the application, providing the
 [MongoDB](https://www.mongodb.com/) database.
 
 Please see the next section for further documentation of each of these packages.

## 🗒 Further Documentation

### [⚛️ @rebmem-music-player/app](packages/app/README.md)
### [🖥 @rebmem-music-player/server](packages/server/README.md)
### [💾 @rebmem-music-player/database](packages/database/README.md)

## ⏭ Next Steps

The following are possible next steps for the project moving into phase two:
- The redux store in the application contains a lot of duplication of code and logic for each of the API calls. This is
a common issue as applications begin to get larger, as such there are also methods available to resolve this.
- The database needs to be updated to properly use the ObjectId type instead of storing references as strings.
- The server needs to be updated so all the files are TypeScript.
- API calls have been split into smaller ones to fetch data simultaneously, based on the assumption this will increase
performance. This needs to be tested on the actual hardware, they can be combined if it does not.
- Store the files in the database as suggested in the server readme.
- Increase unit testing code coverage - due to time restrictions these have only been written for the components and
utility functions. They can and should be expanded to cover the redux store and the server.

## Credits

Royalty free music was provided for the test database by [Bensound](https://www.bensound.com/).