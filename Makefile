build:
	docker-compose -f docker-compose.yml build

run:
	docker-compose -f docker-compose.yml --env-file .env up -d --build

stop:
	docker-compose -f docker-compose.yml down -v

clean:
	docker stop $$(docker ps -a -q) || true
	docker rm $$(docker ps -a -q) || true
	docker rmi $$(docker images -q) || true
	