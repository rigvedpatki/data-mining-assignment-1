.PHONY: clean build deploy result

clean:
	rm -rf build

build: 
	npm run build

deploy:
	npm start

result:
	cat output.txt && open output.txt