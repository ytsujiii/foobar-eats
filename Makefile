DOCKER_COMPOSE := docker compose

up:
	$(DOCKER_COMPOSE) up -d mysql cassandra schema-loader web-server
down:
	$(DOCKER_COMPOSE) down
web:
	$(DOCKER_COMPOSE) exec web-server bash
build:
	@make build-backend
build-backend:
	cd backend && gradle build
