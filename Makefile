DOCKER_COMPOSE := docker compose

up:
	$(DOCKER_COMPOSE) up -d mysql cassandra schema-loader web-api web-server
down:
	$(DOCKER_COMPOSE) down
web:
	$(DOCKER_COMPOSE) exec web-api make run
build:
	@make build-backend
build-backend:
	cd backend && ./gradlew build
build-frontend:
	cd frontend && npm run build

