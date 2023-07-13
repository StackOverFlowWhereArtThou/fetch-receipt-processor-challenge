# Overview

This is a simple API built to satisfy the requirements stated here on the fetch [Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge)

This API was built using Node JS with express and Typescript.

# Docker Image

In order to run your container, run the following docker-compose command: `docker-compose -f docker-compose.yml up -d`

In order to close down your container: `docker-compose down`

## Development Container

In order to build and run the image, please run the following commands:

```
docker-compose build
docker-compose up -d
```

## Production Container

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`

## Stopping a container

You can stop the container (either production or dev) with `docker-compose down`

```
docker build . -t recieipt-processor
docker run -p 3000:3000 recieipt-processor
```
