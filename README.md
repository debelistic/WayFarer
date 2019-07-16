# WayFarer

WayFarer is a public bus transportation booking server

[![Build Status](https://travis-ci.com/debelistic/WayFarer.svg?branch=develop)](https://travis-ci.com/debelistic/WayFarer) [![Test Coverage](https://api.codeclimate.com/v1/badges/e7cfdc9687d0d170e451/test_coverage)](https://codeclimate.com/github/debelistic/WayFarer/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/e7cfdc9687d0d170e451/maintainability)](https://codeclimate.com/github/debelistic/WayFarer/maintainability) [![Coverage Status](https://coveralls.io/repos/github/debelistic/WayFarer/badge.svg)](https://coveralls.io/github/debelistic/WayFarer)

## Pivotal Tracker

Project is using the Project Management Tool, Pivotal Tracker. View [Stories](https://www.pivotaltracker.com/n/projects/2359671)

## API Deployment

API is deployed [here](https://wayfarerv1.herokuapp.com)

## API Documentation

The documentation for API is [here](https://documenter.getpostman.com/view/5138806/SVSKLTwU?version=latest)

## Built with

- NodeJS
- ExpressJS
- Postgres
- JavaScript ES6

## Getting Started

### Installation

- Clone this repository using git clone [WayFarer](https://github.com/debelistic/WayFarer.git)
- Use the .env.sample file to setup environment variables and rename the file to .env
- Run ```npm install``` to install all dependencies
- Run ```npm start``` to start the server
- See ```package.json``` for other scripts

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/) Air bnb guidelines

#### Compiler

- [Babel 7](https://babeljs.io/)

#### Test Tools

- [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
- [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
- [Chai-http](http://chaijs.com/) - A Chai plugin for testing node.js HTTP servers
- [nyc](http://nyc.org/) - Code Coverage Generator

### Testing

- Run test
  `npm test`

- Run coverage report
  `npm run coverage`

## API Routes

| Description               | HTTP Methods  | Routes                        |
|:-------------------------:|:-------------:|:-----------------------------:|
| Documentation             | GET           | /documenation                 |
| Create a user account     | POST          | api/v1/auth/signup            |
| Sign in a user            | POST          | api/v1/auth/signin            |
| Create a bus              | POST          | api/v1/buses                  |
| View buses                | GET           | api/v1/buses                  |
| Create a trip             | POST          | api/v1/trips                  |
| Get all trips             | GET           | api/v1/trips                  |
| Get trips by origin       | GET           | api/v1/trips/origin/:origin   |
| Get trips by destination  | GET           | api/v1/trips/origin/:destin   |
| Cancel trip               | PATCH         | api/v1/trips/:tripId          |
| Book seat on a trip       | POST          | api/v1/bookings               |
| View all bookings         | GET           | api/v1/bookings               |
| Delete a booking          | DELETE        | api/v1/bookings/:bookingId    |
| Change seat number        | PATCH         | api/v1/bookings/:bookingId    |

## Project References

- Stack Overflow discussions
