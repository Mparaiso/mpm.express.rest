test: build
	@mocha --recursive -R spec
doc: src
	@codo -o doc src
build: src
	@coffee -o lib -m -b src
commit: build
	@git add .
	@git commit -am"$(message) `date`"
push: commit
	@git push origin
cover:
	@istanbul cover node_modules\mocha\bin\_mocha -- --recursive
