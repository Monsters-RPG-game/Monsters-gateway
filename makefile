clean:
	rm -rf ./build \
	rm tsconfig.tsbuildinfo

test:
	clear \
	&& npm run test:e2e \
	&& npm run test:unit \
	&& npm run test:db

buildDocker:
	docker build -t monsters/monsters-gateway .

buildTestDocker:
	docker build --build-arg NODE_ENV=testDev -t monsters/monsters-gateway-test .
