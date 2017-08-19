# PassPass

## Team

  - Cody
  - Martin
  - Michael
  - Kelly

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

### Online
https://hungryhippopasspass.herokuapp.com/


## Requirements

- Node 6.11.x
- npm 3.10.x
- MySQL 5.7

## Development

### Installing Dependencies
Required files: a session.config.js and a facebook.config.js. Please contact a team member for more details on obtaining the necessary configuration variables.

Fork and clone the repo. From within the root directory:

```sh
npm install
npm run react-dev
npm run server-dev
```
Go to http://127.0.0.1:3000/ in your browser to run locally

### Testing

Tests are done with [Jest](https://facebook.github.io/jest) and [Enzyme](http://airbnb.io/enzyme/index.html). Other packages used:
- [supertest](https://www.npmjs.com/package/supertest)
- [React Test Utilities](https://facebook.github.io/react/docs/test-utils.html)

Run tests in repo root folder with
```sh
npm test
```

Test results will be output to terminal window.

Tests are split into 3 folders: react-client, server, and database, to match the equivalent folders with JavaScript source code.

Checking test coverage is TBD.

## Requirements


## Development

### Installing Dependencies

From within the root directory:

npm install
add facebook.config.js file for facebook session keys
add session.config.js file for session encryption key
install the schema.sql file with instructions at the top of that file

### Roadmap

View the project roadmap on Trello [here](https://trello.com/b/Rsxkw459/passpass)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
