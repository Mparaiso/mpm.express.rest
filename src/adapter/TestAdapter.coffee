"use strict"
Base = require "./Base"
_ = require "underscore"
###
return the index of an element according to a predicate 
@param  {Array}   collection 
@param  {Function} callback   
@return {Number}  the index of the object or -1 if not found            
###
findIndex = (collection,callback)->
	i=-1
	for doc,index in collection
		if callback(doc,index,collection)
			i = index
			break
	return i
###
TestAdapter
###
class TestAdapter extends Base

    constructor:()->
    	super
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
    	c= @_model.filter (doc)=>
    		for key,value in params
    			if @_model[key] != value
    				return false
    		return true
    	callback(undefined,c)
    ###
    find resource
    @param  {String|Number}   id       
    @param  {Function} callback 
    ###
    find:(id, callback)->
    	callback(undefined,(@_model.filter((doc)=>doc.id==id))[0])
    ###
    create resource
    @param  {Object}   raw     
    @param  {Function} callback
    ###
    create:(raw,callback)->
        r = _.extend raw,{id: _.uniqueId()}
        @_model.push(r)
        callback(undefined,r)

    ###
    update resource
    @param  {String|Number}   id       
    @param  {Object}   raw      
    @param  {Function} callback 
  	###
    update:(id, raw, callback)->
    	i = findIndex(@_model,(doc)=>doc.id==id)
    	if i>=0
    		r=_.extend(@_model[i],raw,{id:id})
    	callback(undefined,r)

    ###
    delete resource
   	@param  {String|Number}   id       
   	@param  {Function} callback 
    ###
    delete:(id, callback)->
    	i = findIndex(@_model,(doc)=>doc.id==id)
    	if i>=0
            doc = @_model.splice(i,1)
            callback(undefined,i)
        else
            callback()


module.exports = TestAdapter
