# Proposal Management 

## Deployment with docker

### Requiremnts

- docker-ce
- docker-compose

### Usage

To be run on a manager node.

- `make`: builds images and deploys `proposalmgr` stack
- `make build`: builds `proposalmgr-frontend` and `proposalmgr-backend` images
- `make start`: deploys `proposalmgr` stack
- `make stop`: removes `proposalmgr` stack

### Details

1. Starts a MySQL server container based on the [official image](https://hub.docker.com/_/mysql/),
2. Starts a [Node.js 10.8.0](https://hub.docker.com/_/node/) app that waits for the database to become responsive, and run all migrations and seeds if necessary,
3. Starts a React app (also based on [Node.js 10.8.0](https://hub.docker.com/_/node/)).

Require docker installed. 
The docker-compose.yml file creates a bind mount directoty that allows you to test anything live, just change the code for the server or client and it will immediately become available.

The data for the MySQL will persist between launches.

```
docker-compose up
```

The docker-compose.yml file routes port 80 on your host to the React app running on 3000 on the Docker environment, so once the system is up just go to http://localhost.

To bring it down:

```
docker-compose down
```

If you change your Dockerfile and must rebuild the Node.js or React images, run:

```
docker-compose up --build
```

