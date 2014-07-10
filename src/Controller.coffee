"use strict"
ModelNotFoundError = require './ModelNotFoundError'
async = require('async')
_ = require('lodash')
crypto = require 'crypto'
md5 = (string)->crypto.createHash('md5').update(string).digest('hex')
###
Generic RestFull middleware for connect/express
@type rest.Controller
@param {express} app
@param {{class:Object,name:String,listMethod:String,getMethod:String,postMethods:String,putMethod:String,validateMethod:String,deleteMethod,allow}} options
###
class Controller
    constructor:(@_app,@_options={})->
        this._options.allow = this._options.allow || ['list','get','post','put','delete']

    ###
    setAdapter
    @param {rest.adapter.Base} adapter for data source
    ###
    setAdapter:(adapter)->this._adapter = adapter; return this
    ###
    getAdapter
    @return {rest.adapter.Base} 
    ###
    getAdapter:()-> this._adapter
    ###
    add routes to application
    @return {http.Server}
    ###
    handle:->
        if _.contains(this._options.allow, 'list')
            this._app.get('/', this.list.bind(this))
        if _.contains(this._options.allow, 'get')
            this._app.get('/:id' , this.get.bind(this))
        if _.contains(this._options.allow, 'post')
            this._app.post('/', this.post.bind(this))
        if _.contains(this._options.allow, 'put')
            this._app.put('/:id', this.put.bind(this))
        if _.contains(this._options.allow, 'delete')
            this._app.delete('/:id', this.delete.bind(this))
        return this._app

    resultFunction:(req, res, next)->
        return (err, result)=>
            if err 
                console.log(arguments)
                return res.send(500, err.message)
            if!result
                return res.send(404,new ModelNotFoundError("#{this.getAdapter().getName()} Not Found"))
            else
                #res.header('Etag',"#{md5(JSON.stringify(result))}")
                return res.json(result)

    list:(req, res)->
        this._adapter.findAll(req.query,this.resultFunction(req, res))

    get:(req, res)->
        this._adapter.find(req.params.id,this.resultFunction(req,res))

    post:(req, res)->
        this._adapter.create(req.body,this.resultFunction(req,res))

    put:(req, res)->
        this._adapter.update(req.params.id,req.body,this.resultFunction(req,res))

    delete:(req, res)->
        this._adapter.delete(req.params.id,this.resultFunction(req,res))

module.exports = Controller
