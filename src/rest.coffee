"use strict"
express = require('express')

###
@namespace
###
rest =
    error:
        ModelNotFoundError: require './ModelNotFoundError'
    Controller: require './Controller'
    AdapterNameResolver: require './AdapterNameResolver'
    adapter:
        Base: require './adapter/Base'
        MongooseAdapter:require './adapter/MongooseAdapter'
        MongoDBAdapter: require './adapter/MongoDBAdapter'
        TestAdapter: require './adapter/TestAdapter'


###
create a Restfull controller for express
@param  {string} adapter_name 
@param  {Object} model        
@param  {Object} options    
@return {express}              
###
rest.create = (adapter_name,model,options={})->
    app = express()
    resolver = new rest.AdapterNameResolver
    adapter = resolver.resolve(adapter_name)
    if !adapter
        return new Error "adapter of type #{adapter_name} not found"
    adapter.setModel(model)
    adapter.setName(options.name)
    r = new rest.Controller(app, options)
    r.setAdapter(adapter)
    return r.handle()

module.exports = rest