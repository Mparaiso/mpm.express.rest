"use strict"
###
Base class for adapters
@type rest.adapter.Base
@param {Object} model service to query the database
@param {string} name  name of the model
###
class Base
    constructor:(@_model,@_name="model")->
   	#get model
    getModel:->@_model
    # set model
    setModel:(@_model)->
    # get name
    getName:->@_name
    # set name
    setName:(@_name)->
    ###
    findAll resources
    @param  {Object}   params   
    @param  {Function} callback 
    ###
    findAll:(params, callback)->
    ###
    find resource
    @param  {String|Number}   id       
    @param  {Function} callback 
    ###
    find:(id, callback)->
    ###
    create resource
    @param  {Object}   raw     
    @param  {Function} callback
    ###
    create:(raw, callback)->
    ###
    update resource
    @param  {String|Number}   id       
    @param  {Object}   raw      
    @param  {Function} callback 
  	###
    update:(id, raw, callback)->
    ###
    delete resource
   	@param  {String|Number}   id       
   	@param  {Function} callback 
    ###
    delete:(id, callback)->


module.exports = Base

#