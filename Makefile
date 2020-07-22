all: build start

build:
	cd proposalmgr && docker build . -f Dockerfile -t proposalmgr

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

full-restart: stop all

delete-db:
	docker volume rm proposalmgr-db

backup: stop
	sudo rm -rf backups/tmp/
	mkdir -p backups/tmp/
	docker run --rm \
	  -v proposalmgr-db:/src \
	  -v `pwd`/backups/tmp/:/dest \
	  busybox \
	  sh -c "cp -r /src/* /dest/"
	sudo tar -czf ./backups/proposalmgr-`date -u -Iminutes`.tgz -C backups/tmp/ .
	sudo rm -rf backups/tmp/
	docker stack deploy --prune -c ci/docker-compose.yml proposalmgr

# The first line checks if the restore directory is empty
restore: stop
	sudo rm -rf backups/tmp/
	mkdir -p backups/tmp/
	sudo tar -xzf ${BACKUP_FILE} -C ./backups/tmp/
	[ "$$(ls -A backups/tmp/)" ] && \
	docker run --rm \
	  -v `pwd`/backups/tmp/:/src \
	  -v proposalmgr-db:/dest \
	  busybox \
	  sh -c "rm -rf /dest/* && cp -r /src/* /dest/"
	sudo rm -rf backups/tmp/
	docker stack deploy --prune -c ci/docker-compose.yml proposalmgr

