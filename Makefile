BIN = node_modules/.bin

.PHONY: bootstrap dev build test lint clean

bootstrap:
	yarn install

dev:
	NODE_ENV=development $(BIN)/webpack-dev-server --hot --watch --mode=development

build: clean test
	NODE_ENV=production $(BIN)/webpack -p --progress --mode=production
	zip -r ./dist/extension.zip ./extension

test: lint
	#$(BIN)/karma start --single-run

lint:
	$(BIN)/standard

clean:
	rm -rf ./dist
