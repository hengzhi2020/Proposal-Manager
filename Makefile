all: build start

build:
	cd Frontend && docker build . -f Dockerfile -t proposalmgr-frontend
	cd Backend  && docker build . -f Dockerfile -t proposalmgr-backend

start:
	docker stack deploy --prune -c ci/docker-compose.yml proposalmgr

stop:
	docker stack rm proposalmgr
	# Wait until everything is removed
	sleep 1; \
	until [ -z "$$(docker network ls --filter label=com.docker.stack.namespace=proposalmgr -q)" ]; do \
	  sleep 1; \
	done

restart: stop start

