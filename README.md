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

######Exemple with MongoDB

Create a express app with a json parser

```javascript

	var app,express;
	express=require('express');
	app=express();
	app.use(express.json());
```

Create a mongodb connection , requires a mongodb database ( on localhost here )

```javascript

	var MongoClient,db,collection;
	MongoClient=require('mongodb').MongoClient;
	MongoClient.connect("mongodb://localhost:27017/database",function(err,db){
		//collection will be needed for the MongoDB adapter
		collection = db.collection("documents");
		done();
	});
```

Create the restfull controller and the adapter for MongoDB

```javascript

	var done,controller,adapter,rest,http;
	
	http = require('http');
	rest = require('mpm.express.rest');
	
	done = function(){
		/**
		 * pass the express app into the constructor
		 * you can allow or forbid some verbs by passing an option object 
		 * with a allows object : 
		 * @example :
		 * new rest.Controller(app,{allows:['list','get','post','put','delete']});
		 * if no allows option , all verbs and methods are allowed. if you want
		 * a readonly restfull controller : 
		 * new rest.Controller(app,{allows:['list','get']});
		 */
		controller = new rest.Controller(app);
		// set the adapter , the MongoDBAdapter needs a MongoDB Collection object
		controller.setAdapter(new rest.adapter.MongoDBAdapter(collection))
		// call controller.handle to create all the routes needs for our rest api
		http.createServer(controller.handle()).listen(3000);
	}
```

The following routes have been created

	GET    / 	  list resources,query parameters can be passed to the db adapter for filtering,ect...
	GET    /:id   read
	POST   /      create
	PUT    /:id   update a resource
	DELETE /:id   delete

or pass the express app into another express app

```javascript

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
```

The following routes have been created

	GET    /api/documents
	GET    /api/documents/:id
	POST   /api/documents/
	PUT    /api/documents/:id
	DELETE /api/documents/:id

And Voila! You can of course create multiple rest controllers with the same or different DB adapters.

#####Using Mongoose Adapter

```
var app,express,http,mongoose,Schema,
Model,controller,adapter,rest;

http = require('http');
rest = require('rest');
mongoose=require('mongoose');
express=require('express');

app=express();
app.use(express.json());
mongoose.connect("mongodb://localhost/db");
Schema = mongoose.Schema({message:String});
Model = mongoose.model('Model',Schema);

controller = new rest.Controller(express());
controller.setAdapter(new rest.adapter.MongooseAdapter(Model,'model'));

app.use('/api/model',controller.handle());

http.createServer(app).listen(3000);

```