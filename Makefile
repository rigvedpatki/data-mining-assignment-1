.PHONY: clean build deploy result install

clean:
	rm -rf build && \
	rm -rf node_modules

install:
	npm install

build: 
	npm run build

deploy:
	npm start

result:
	cat output.txt && open output.txt