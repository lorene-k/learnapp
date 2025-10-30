FILEPATH	=	./docker-compose.yml
COMPOSE		=	docker compose -f
TARGET		?=	dev

# ------------  RULES  ------------------------------------------------------ #
all:			up

dev:
				@$(MAKE) TARGET=dev up

prod:
				@$(MAKE) TARGET=prod FRONTEND_VOLUME= BACKEND_VOLUME= up

up:
				@$(COMPOSE) $(FILEPATH) up -d

down:
				@$(COMPOSE) $(FILEPATH) down

start:
				@$(COMPOSE) $(FILEPATH) start

stop:
				@$(COMPOSE) $(FILEPATH) stop

cleanimg:
				@docker image prune -a

cleanvol:
				@docker volume rm $(shell docker volume ls -q)

fclean:			down cleanimg

re:				fclean all

.PHONY:			all dev prod up down start stop cleanimg cleanvol fclean re