# suffragium
Test app voor workshop end-to-end testing

Deze app is een fork van [jalbertsr/suffragium](https://github.com/jalbertsr/suffragium).

## Screenshoots

![Screenshot](https://i.imgur.com/445uasl.png)

### Realtime voting
![realtime](https://i.imgur.com/031SZXT.gif)

### Data Visualitzation
![dataviz](https://i.imgur.com/16th1D5.gif)

---
## Description

Suffragium is a real time voting app where you can create your poll and get results instantly visualizing data in a way you've never done before! Suffragium is the best way to vote any quick decision and get the results at your hands.

---

## Installation

You need to have installed [NodeJS](https://nodejs.org/) with [npm](https://www.npmjs.com/), [bower](https://bower.io/) and [MongoDB](https://www.mongodb.com/)

---
### Configuration `env` file

You need to create an **.env** file in the project root with the following environment variables configured:

- Port:

  ```
  PORT=3000
  ```

- Mongodb path and database to use:

  ```
  urlDb=mongodb://localhost:27017/NAME_DB
  ```
- Secret key to encrypt cookies:

  ```
  SECRETKEY=XXXXXXXXXX
  ```

- Secret word to encrypt users' passwords:

  ```
  SECRET=XXXXXXXXXX
  ```

---

### To run the server:

```
$ npm start
```

All dependencies will be installed automatically

### To run in dev mode or debugg mode:

```
$npm run dev
```

```
$npm dev:debug
```


## API

The server part has multiple **API endpoints** using several routes:

- `/api` -> Serves the internal data of polls and users.
- `/auth` -> Serves the authentication options, register and login.

---

## Built with:

- **Front-end**

    - angular: 1.6.4
      - angular-route: 1.6.6
      - angular-jwt: 0.1.9
    - browserify: 14.4.0
    - bower: 1.8.0
    - materialize: 0.100.1
    - font-awesome: 4.7.0
    - socket.io-client: 2.0.3

- **Back-end**
  - socket.io 2.0.3
  - dotenv: 4.0.0
  - express: 4.15.4
    - express-jwt: 5.3.0
  - jsonwebtoken: 7.4.3
  - mongoose: 4.11.7
  - passport: 0.4.0
    - passport-jwt: 3.0.0
    - passport-local: 1.0.0
    - passport-local-mongoose: 4.2.1

---

## Author

[Joan Albert Segura](https://github.com/jalbertsr)
