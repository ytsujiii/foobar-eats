DOCKER_COMPOSE := docker compose

all:
	@make up

up:
	$(DOCKER_COMPOSE) up -d mysql cassandra schema-loader web-api web-server
down:
	$(DOCKER_COMPOSE) down
