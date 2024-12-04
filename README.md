# Monsters - gateway

TLDR:
1. [How to install](#1-how-to-install)
2. [How to build](#2-how-to-build)
3. [Useful information](#3-useful-information)
4. [Docs](#4-docs)
5. [Style](#5-style)


## 1. How to start

### Install dependencies

```shell
npm install / yarn
```

### Prepare environment

## 2. How to build

```shell
npm run build / yarn build
```

If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in tsConfig to false

## 3. Useful information

### 3.1 Logs folder

#### Linux

```text
~/.cache/"package.json -> productName"/logs
```

#### Windows

```text
~/AppData/Roaming/"package.json -> productName"/logs
```

### 3.2 Testing

#### All test currently are written using jest. You can run all tests or just type specific tests

#### Available targets

```text
yarn test:e2e = run 'end to end' tests
yarn test:db = run 'database' tests
yarn test:unit = run 'unit' tests
```

To run all tests, use makefile script

```text
make test
```

### 3.3 Hooks

Instead of adding additional packages like husky, its easier to add hooks manually. If you want your code to check its quality and test itself before committing code, you can add this code to `.git/hooks/pre-commit`
```sh
#!/bin/sh

set -e

echo "Running lint-staged"
npm run lintStaged

echo "Running tsc"
npm run listErrors

echo "Running unit tests"
npm run test:unit

echo "Running db tests"
npm run test:db

echo "Running e2e tests"
npm run test:e2e

echo "Auditing"
npm audit

echo "Checking package version"
if ! git diff --cached --name-only | grep -q 'package.json'; then
    echo "Package.json is not in the staged changes. Make sure to update version in package.json to mir
ror applied changes."
    exit 1
fi

if git diff --cached --name-only | grep -q 'package.json'; then
    if ! git diff --cached -- package.json | grep -q '"version"'; then
        echo "Package.json has been modified but version has not been updated. Make sure to update vers
ion in package.json to mirror applied changes."
        exit 1
    fi
fi
```

Above code will:
- Lint your staged code
- Validate if it can be built
- Test it
- Audit it
- Check if you updated version in package.json

Most of people that I've meet, do not care about auditing their code. If you do not care if packages includes in your app have known vulnerabilities, you can remove last 2 lines from this code. Keep in mind, that github pipelines also run the same commands.

Updating version in package.json is subject to change. The amount of developers == the amount of ways t o use versioning system. If you don't feel like updating version in package.json, remove last 2 commands

### 3.4 Configs

This application uses 3 config files:
- devConfig.json
- prodConfig.json
- testConfig.json

DevConfig will be used, if you run your application with NODE_ENV=development. This config should be used while working on this application

ProdConfig will be used, if you run your application with NODE_ENV=production. This should be used in production env

TestConfig will be used, if you run your application on dev servers. This config only differs from production, that in code it will log debug logs and should connect to dev database.

Each config includes few elements:
```json
{
  "amqpURI": "rabbitUrl",
  "redisURI": "redis://:password@adress:port",
  "mongoURI": "mongodb://user:password@adress:port",
  "authorizationAddress": "http://localhost",
  "myAddress": "http://localhost",
  "corsOrigin": ["http://localhost"]
  "httpPort": 80,
  "socketPort": 81,
  "mysql": {
    "user": "mysqlUser",
    "password": "mysqlPassword",
    "host": "host",
    "db": "db",
    "port": 3306
  },
  "myDomain": ".domain.com",
  "session": {
    "secret": "superSecretPasswordPleaseDoNotLeakIt",
    "secured": true,
    "trustProxy": true
  }
}
```

HttpPort is port, that application will use

MyAddress is address, that will be used to host this application. Make sure to include port, if default won't be used

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

mongoURI is address for mongoDB

authorizationAddress is address for authorization server, which should be utilized

redisURI is address for redis, which is used to cache data like user sessions and connection params

myDomain is domain, that this application will work on. It should be prefixed with dot. This config is used to set cookies, for production for whole domain with subdomains. Either add some random domain in /etc/hosts, or comment all ( atm 2 ) occurrences.

session is config for express-session.
- Secret is secret, which should be used to generate cookies for session
- Secured is boolean, which is true, sets secured cookies. This is used, because localhost will not set secured cookies in modern browsers
- TrustProxy Is config, which will trust `X-Forwarded-For` cookie. Disabled it, unless your api is behind a load balancer like nginx

## 4. Docs

### 4.1 Environments

This application utilizes `NODE_ENV` env, which is set in package.json. `start` command does not include NODE_ENV. This is prepared for docker or any external tools, to manipulate environment.

- Production - prod env. This is the env you want, if you are planning on running production env. This mode disables debug logs.
- Development - development settings. If you are working on this application, thats the mode you want 
- TestDev - custom env, which will utilize another config file. This is prepared for your app to be started on dev/test env in docker/k8s. This mode will use debug logs, unlike production mode
- Test - test env, set while running tests. This env will prevent express router from starting. That way you can run supertest tests, without any interruptions.

### 4.2 Api docs

This project is using swagger docs for api documentation. You can access them by route http://localhost:{port}/docs

Instead of adding json/yaml configs, this template is built on swagger-jsdoc package, which utilizes jsdoc comments. If you prefer to remove comments from compiled code in tsconfig, make sure to rewrite docs to other tool.

### 4.3 Logging

This project utilizes winston for logging. Logging tool is included in `/src/tools`. It provides:

- Log - default logs that you can create.
- Warn - warnings
- Error - errors
- Debug - debug logs, which are disabled if production env is set. More in #4.1

### 4.4 Probes

This application is ready for probing in k8s / other systems. You can find liveness probe in `/src/tools/liveness`. readiness probe should be utilized based on `/health` route. This route will send status 500, if server is dead and status 200 if server is still ok. This status will change from 200 to 500, only if there is a heavy problem with database connection or application is unable to start, due to problems with some services. You can always add customm code, which will modify this state, so k8s will restart your app. K8s configs are not included in this repo.

### 4.5 Connections and access

When I write my apps, I prefer to have some kind of global state, which allows my app to have access to every external connection from any point in code. You can find this "state" in `/src/tools/state`. This state is used to keep external connections and to manage them. For example, instead of dependency injecting each connection to each route, I prefer to just access them from that global state 

### 4.6 Testing

This application has multiple tests written in jest. 

[Tests](./docs/tests.md)

## 5. Style

This application uses my personal eslint settings. They are EXTREMALLY strict and will force you to write specific type of code with unified style across whole project. This is `MY` config. You may not like it so please, modify it to your heart desire.