"use strict"

Base = require "./Base"
_ = require 'lodash'

###
@type rest.adapter.MongooseAdapter
@param {Object} model
@param {string} name
###
class MongooseAdapter extends Base
    constructor:(model, name="model")->
        super
    findAll:(params, callback)->
        json = _.extend({}, params)
        this._model.find(json,callback)
    find:(id, callback)->
        this._model.findById(id,callback)
    create:(raw, callback)->
        model = new this._model(raw)
        model.save(callback)
    update:(id, raw, callback)->
        data = do=>
            json = _.extend({}, raw)
            delete json._id
            return json
        return this.getModel().findByIdAndUpdate(id,data,{},callback)
    delete:(id, callback)->
        return this.getModel().findByIdAndRemove(id,{},callback)

module.exports = MongooseAdapter
