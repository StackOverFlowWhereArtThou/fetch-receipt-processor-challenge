# Overview

This is a simple API built to satisfy the requirements stated here on the fetch [Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge).

This API was built using Node JS with express and Typescript.

# Launching the Application

The application is deployable via a docker container

In order to build a docker image and run the corresponding container, run the following docker-compose command: `docker-compose -f docker-compose.yml up -d`.

In order to close down your container: `docker-compose down`

# Limitations of this application

While this application is not intended for production, there are a few additional callouts

- Adding a ES Lint and Prettier configuration
- Creating production-specific and dev-specific docker images to enable hot-module-reloading
- As mentioned in the original specs for this app, the DB layer does not actually persist data on restart
