DOCKER_COMPOSE = docker compose -f docker-compose.yml

## —— MAIN COMMANDS ———————————————————————————————————————————————————————————————
install: ## Install project
	@echo "Installing project..."
	@if [ ! -f .env ]; then \
		echo "Creating .env file..."; \
		cp .env.example .env; \
	fi
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d
	@echo "Installation complete!"

reinstall: ## Reinstall project
	@echo "Reinstalling project..."
	$(DOCKER_COMPOSE) down -v
	rm -rf node_modules
	rm -f .env
	@$(MAKE) install

up: ## Start containers
	$(DOCKER_COMPOSE) up -d

down: ## Stop containers
	$(DOCKER_COMPOSE) down

ps: ## Show containers status
	$(DOCKER_COMPOSE) ps

logs: ## Show containers logs
	$(DOCKER_COMPOSE) logs -f