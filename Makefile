SHELL := /bin/sh
.DEFAULT_GOAL := help
.PHONY: help web-deps run-web build typecheck test preview
help: ## Показать команды
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z0-9_-]+:.*## / {printf "  %-14s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
web-deps: ## Установить зависимости по lock-файлу
	npm --prefix web ci
run-web: ## Запустить сайт локально
	npm --prefix web run dev
build: ## Собрать статический сайт
	npm --prefix web run build
typecheck: ## Проверить TypeScript и Vue
	npm --prefix web run typecheck
test: ## Проверить телефонные и десктопные экраны
	npm --prefix web run test:e2e
preview: ## Открыть собранную версию локально
	npm --prefix web run preview

