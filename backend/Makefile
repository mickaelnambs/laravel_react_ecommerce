DOCKER_COMPOSE = docker compose
DOCKER_EXEC = $(DOCKER_COMPOSE) exec php
ARTISAN = $(DOCKER_EXEC) php artisan
COMPOSER = $(DOCKER_EXEC) composer

YELLOW = \033[33m
RED = \033[31m
GREEN = \033[32m
RESET = \033[0m

## —— Main commands ———————————————————————————————————————————————————————————————
help: ## List all commands
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Project Setup ——————————————————————————————————————————————————————————————
project-install: ## Initial project installation
	@echo "$(GREEN)Project installation...$(RESET)"
	@echo "$(GREEN)Building containers...$(RESET)"
	$(DOCKER_COMPOSE) build
	@echo "$(GREEN)Starting containers...$(RESET)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(YELLOW)Waiting for containers...$(RESET)"
	sleep 10
	@echo "$(YELLOW)Installing dependencies...$(RESET)"
	$(COMPOSER) install
	@echo "$(YELLOW)Creating .env file if not exists...$(RESET)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi
	@echo "$(YELLOW)Updating .env file with database configuration...$(RESET)"
	sed -i 's|DB_CONNECTION=.*|DB_CONNECTION=mysql|' .env
	sed -i 's|# DB_HOST=.*|DB_HOST=laravel_db|' .env
	sed -i 's|# DB_PORT=.*|DB_PORT=3306|' .env
	sed -i 's|# DB_DATABASE=.*|DB_DATABASE=app|' .env
	sed -i 's|# DB_USERNAME=.*|DB_USERNAME=app|' .env
	sed -i 's|# DB_PASSWORD=.*|DB_PASSWORD=app|' .env
	@echo "$(YELLOW)Generating application key...$(RESET)"
	$(ARTISAN) key:generate
	@echo "$(YELLOW)Running migrations...$(RESET)"
	@echo "$(YELLOW)Setting correct permissions on storage and cache directories...$(RESET)"
	$(DOCKER_EXEC) chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
	$(DOCKER_EXEC) chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
	$(ARTISAN) migrate:fresh --seed
	@echo "$(YELLOW)Clearing cache...$(RESET)"
	$(ARTISAN) optimize:clear
	@echo "$(GREEN)Installation complete!$(RESET)"

## —— Docker ————————————————————————————————————————————————————————————————————
build: ## Build Docker containers
	$(DOCKER_COMPOSE) build

up: ## Start containers
	$(DOCKER_COMPOSE) up -d

down: ## Stop containers
	$(DOCKER_COMPOSE) down

restart: ## Restart containers
	@$(MAKE) down
	@$(MAKE) up

ps: ## Display containers status
	$(DOCKER_COMPOSE) ps

logs: ## Display containers logs
	$(DOCKER_COMPOSE) logs -f

php: ## Enter PHP container
	@echo "$(YELLOW)Connecting to PHP container...$(RESET)"
	$(DOCKER_COMPOSE) exec php bash

permissions: ## Fix storage permissions
	$(DOCKER_COMPOSE) chown -R www-data:www-data /var/www/html/storage
	$(DOCKER_COMPOSE) chmod -R 775 /var/www/html/storage
	$(DOCKER_COMPOSE) chown -R www-data:www-data /var/www/html/bootstrap/cache
	$(DOCKER_COMPOSE) chmod -R 775 /var/www/html/bootstrap/cache

## —— Laravel ————————————————————————————————————————————————————————————————————
migrate: ## Run migrations
	$(ARTISAN) migrate

fresh: ## Reset and re-run migrations
	$(ARTISAN) migrate:fresh --seed

cache: ## Clear all caches
	$(ARTISAN) cache:clear
	$(ARTISAN) config:clear
	$(ARTISAN) route:clear
	$(ARTISAN) view:clear

## —— Composer ———————————————————————————————————————————————————————————————————
composer-install: ## Install dependencies
	$(COMPOSER) install

composer-update: ## Update dependencies
	$(COMPOSER) update

dump-autoload: ## Reload autoload
	$(COMPOSER) dump-autoload
