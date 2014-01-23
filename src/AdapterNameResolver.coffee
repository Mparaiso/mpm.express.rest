MongooseAdapter = require './adapter/MongooseAdapter'
Base = require './adapter/Base'
###
Object that loads an adapter according to a string.
###
class AdapterNameResolver
    resolve:(name)->
        if name instanceof Base
            return name
        switch name
            when 'mongoose'
                return new MongooseAdapter()


module.exports = AdapterNameResolver