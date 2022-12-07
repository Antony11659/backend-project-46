install:
	   npm ci

gendiff:
	   node bin/gendiff.js
	
lint:
	   npx eslint .
test: 
	   npm test
test-coverage:
	   npx jest --coverage

