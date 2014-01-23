mpm.express.rest
================

[![NPM](https://nodei.co/npm/mpm.express.rest.png)](https://nodei.co/npm/mpm.express.rest/)

**Rest Framework for Express**

mpm.express.rest helps developpers write restfull controllers 
for expressjs. With mpm.express.rest, developpers no longer needs
to write glue code to link the database to express routes.

author: mparaiso <mparaiso@online.fr>
licence: LGPL
version:0.0.1

###REQUIREMENTS

	nodejs , npm , expressjs

###Database support through builtin adapters

	- Mongoose ( mongoose  package required)
	- MongoDB ( mongodb package required)
	- Javascript Arrays

###INSTALLATION

	npm install -g mpm.express.rest

###USAGE

####BASIC USAGE

**Exemple with MongoDB**

Create a express app with a json parser

	var app,express;
	express=require('express');
	app=express();
	app.use(express.json());

Create a mongodb connection , requires a mongodb database ( on localhost here )


	var MongoClient,db,collection;
	MongoClient=require('mongodb').MongoClient;
	MongoClient.connect("mongodb://localhost:27017/database",function(err,db){
		//collection will be needed for the MongoDB adapter
		collection = db.collection("documents");
		done();
	});

Create the restfull controller and the adapter for MongoDB

	var done,controller,adapter,rest,http;
	
	http = require('http');
	rest = require('mpm.express.rest');
	
	done = function(){
		//pass the express app into the constructor
		controller = new rest.Controller(app);
		// set the adapter , the MongoDBAdapter needs a MongoDB Collection object
		controller.setAdapter(new rest.adapter.MongoDBAdapter(collection))
		// call controller.handle to create all the routes needs for our rest api
		http.createServer(controller.handle()).listen(3000);
	}

The following routes have been created

	GET    /
	GET    /:id
	POST   /
	PUT    /:id
	DELETE /:id

or pass the express app into another express app

	//main express app
	var mainapp = require('./mainapp');

	done = function(){
		//pass the express app into the constructor
		controller = new rest.Controller(app);
		// set the adapter , the MongoDBAdapter needs a MongoDB Collection object
		controller.setAdapter(new rest.adapter.MongoDBAdapter(collection))
		// call controller.handle to create all the routes needed for our rest api
		mainapp.use("/api/documents/",controller.handler)
		http.createServer(mainapp).listen(3000);
	}

The following routes have been created

	GET    /api/documents
	GET    /api/documents/:id
	POST   /api/documents/
	PUT    /api/documents/:id
	DELETE /api/documents/:id

And Voila! You can of course create multiple rest controllers with the same or different DB adapters.