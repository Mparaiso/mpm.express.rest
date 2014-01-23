"use strict"

###
@type rest.errors.ModelNotFoundError
###
class ModelNotFoundError extends Error
	###
	@param {String} message 
	###
	constructor:(@message="error")->
    	super
    	@name = "ModelNotFoundError"
    	@type = "ModelNotFoundError"


module.exports = ModelNotFoundError

### end ###