BIN = node_modules/.bin

.PHONY: bootstrap dev build test lint clean

bootstrap:
	yarn install

dev:
	NODE_ENV=development $(BIN)/webpack-dev-server --hot --watch --mode=development

build:
	NODE_ENV=production $(BIN)/webpack -p --progress --mode=production

test: lint
	#$(BIN)/karma start --single-run

lint:
	$(BIN)/standard

clean:
	rm -rf ./dist
