# 🎛🎵 Rebmem Engineering Music Player

This is the music player application designed for Rebmem Engineering. This forms part of my final submission for the 
level 4 software developer apprenticeship with QA. This main `README.md` contains the basic information on how to run 
the application. Please see the `Further Documentation` section for links to the rest of the documentation.

## ✅ Pre-Requisites

You must have the following installed on your computer to be able to use this repository:

- [NodeJS@10.18.0](https://nodejs.org/en/blog/release/v10.18.0)
- [MongoDB Community Server@4.2.8](https://www.mongodb.com/try/download/community)
- [Yarn@1.22.4](https://classic.yarnpkg.com/en/docs/install/)

> The versions are the recommended versions used, I cannot guarantee this will run using different versions

## 🏁 First Time Setup

### 🛠 Install Dependencies

First, you must run the following command in the root directory:
```shell script
yarn
```
This will install all of the dependencies required by each of the projects.

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

This project is comprised of a React application, an express server and a mongoDB database. To run the three concurrently
for development, you need to run this single command in the root directory:
```shell script
yarn serve
```

The application has been developed with certain assumptions about the hardware it will run on. As such, you must follow
these steps to see it running correctly:
1. Launch the Google Chrome web browser
2. Activate the developer tools _(either right-click anywhere on the screen and choose `Inspect` or navigate to the menu and choose `More Tools > 
Developer Tools`)_
3. Click on the `Toggle device toolbar` button in the header of the dev tools
4. Change the `Responsive` dropdown menu to `iPhone X`
5. Finally, navigate to [http://localhost:3000](http://localhost:3000) to see the application running

## 🗒 Further Documentation

[Link](Link)
