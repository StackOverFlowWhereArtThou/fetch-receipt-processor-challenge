# Overview

This API was built using Node JS with express.

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

You can stop the container with `docker-compose down`
