
all: dev

clean:
	npm run clean

install:
	npm install

dev:
	npm run dev

# disabled for now
# client:
# 	npm run start

# disabled for now
# client-dev:
# 	npm run start-dev

server:
	NODE_ENV=production npm run start

server-dev:
	NODE_ENV=production npm run start-dev

nf:
	nf start --procfile ./Procfile

nf-dev:
	nf start --procfile ./Procfile.dev

build:
	npm run build

test: test-unit

test-unit:
	npm run test-unit

test-integration:
	npm run test-integration

lint:
	npm run lint

validate:
	npm run validate

.PHONY: test
