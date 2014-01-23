test: build
	@mocha --recursive -R spec
doc: src
	@codo -o doc src
build: src
	@coffee -o lib -m -b src
