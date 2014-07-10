"use strict"

Base = require "./Base"
_ = require 'lodash'
try
    ObjectID = require("mongodb").ObjectID
catch error
    console.log(error)
###
MongoDB adapter
###
class MongoDBAdapter extends Base
    ###
    @type rest.adapter.MongoDBAdapter
    @param {mongodb.Collection} collection mongodb collection
    @param {string} name name of the model
    ###
    constructor:(collection, name="model")->
        super
    findAll:(params, callback)->
        json = _.extend({}, params)
        this._model.find json,(e,cursor)->
            if e 
                callback(e)
            else
                cursor.toArray (e,docs)->
                    if e then callback(e) else callback(undefined,docs)

    find:(id, callback)->
        if not id instanceof ObjectID then id = ObjectID(id)
        this._model.findOne({_id:id},callback)
    create:(raw, callback)->
        this._model.save(raw,{safe:true},callback)
    update:(id, raw, callback)->
        if not id instanceof ObjectID then id = ObjectID(id)
        data = do=>
            json = _.extend({}, raw)
            delete json._id
            return json
        return this.getModel().findAndModify({_id:id},[['_id',1]],{$set:data},{'new':true},callback)
    delete:(id, callback)->
        if not id instanceof ObjectID then id = ObjectID(id)
        return this.getModel().remove({_id:id},{safe:true},callback)

module.exports = MongoDBAdapter
