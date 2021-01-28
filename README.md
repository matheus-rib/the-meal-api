# The-Meal API
API made with Typescript [Deployed in Heroku](https://the-meal-api.herokuapp.com).
It uses [TheMealDb](https://www.themealdb.com) 

Developed with [Docker](https://www.docker.com) (and Docker-Compose)


## Table of Contents
  - [Requirements](#requirements)
  - [How to run](#how-to-run)
  - [Commands](#commands)
    - [Install dependencies](#install-dependencies)
    - [Run the API](#run-the-api)
    - [Run commands](#run-commands)
    - [Tests](#tests)
  - [Docs](#docs)
    - [Rest API](#rest-api)
      - [Routes](#routes)
  - [Authors](#authors)

## Requirements
- Docker (and docker-compose)
- Insomnia (for API Routes docs)
- NPM or Yarn

## How to run
- Create `.env` file using `.env.example` as base
- Install dependencies ([check commands session](#commands))
- Run the API ([check commands session](#commands))

## Commands
### Install dependencies
```bash
# Install dependencies
docker-compose run --rm api yarn
# or: docker-compose run --rm api npm install
```
### Run the API
```bash
# Start the api
docker-compose up
# Then open http://localhost:4000
```

## Run commands
```bash
docker-compose run --rm api ...
```

## Tests
To run all tests: 
```bash
yarn docker:test
# or: npm run docker:test
```

To run a specific test: 
```bash
yarn docker:test yarn test __tests__/folder_you_wanna_test/...
# or: npm run docker:test yarn test __tests__/folder_you_wanna_test/...
```

## Docs
### Rest API
- Install the [Insomnia Rest](https://insomnia.rest/)
- Open the insomnia
  - Then click in `import/export`,
  - Import from file
  - Select `./docs/insomnia.yaml`

#### Routes
  - HealthCheck('`/`')
    - HealthCheck (GET - '`/`'): Returns API info
  - Meals ('`/meals`')
    - CategoriesList (GET - '`/categories`'): Returns a list of meals categories
    - ListByCategory (GET - '`/categories/:categoryName`'): Returns a list of meals from the category
    - Show (GET - '`/show/:mealId`'): Returns a meal matching to the mealId in route
    - Search (GET - '`/search`'): Returns all meals matching the `search` property in query 
    - Random (GET - '`/random`'): Returns a random meal

## Authors
- Matheus Ribeiro