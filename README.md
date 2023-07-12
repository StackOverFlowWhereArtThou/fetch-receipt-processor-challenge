# Overview

This is a simple API built to satisfy the requirements stated here on the fetch [Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge)

This API was built using Node JS with express and Typescript.

# Docker Image

## Development Container

In order to build and run the image, please run the following commands:

```
docker-compose build
docker-compose up -d
```

## Production Container

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## Stopping a container

You can stop the container (either production or dev) with `docker-compose down`
