// Generated by CoffeeScript 1.6.3
"use strict";
var Controller, ModelNotFoundError, async, _;

ModelNotFoundError = require('./ModelNotFoundError');

async = require('async');

_ = require('underscore');

/*
Generic RestFull middleware for connect/express
@type rest.Controller
@param {express} app
@param {{class:Object,name:String,listMethod:String,getMethod:String,postMethods:String,putMethod:String,validateMethod:String,deleteMethod,allows}} options
*/


Controller = (function() {
  function Controller(_app, _options) {
    this._app = _app;
    this._options = _options != null ? _options : {};
    this._options.allows = this._options.allows || ['list', 'get', 'post', 'put', 'delete'];
  }

  /*
  setAdapter
  @param {rest.adapter.Base} adapter for data source
  */


  Controller.prototype.setAdapter = function(adapter) {
    this._adapter = adapter;
    return this;
  };

  /*
  getAdapter
  @return {rest.adapter.Base}
  */


  Controller.prototype.getAdapter = function() {
    return this._adapter;
  };

  /*
  add routes to application
  @return {http.Server}
  */


  Controller.prototype.handle = function() {
    if (_.contains(this._options.allows, 'list')) {
      this._app.get('/', this.list.bind(this));
    }
    if (_.contains(this._options.allows, 'get')) {
      this._app.get('/:id', this.get.bind(this));
    }
    if (_.contains(this._options.allows, 'post')) {
      this._app.post('/', this.post.bind(this));
    }
    if (_.contains(this._options.allows, 'put')) {
      this._app.put('/:id', this.put.bind(this));
    }
    if (_.contains(this._options.allows, 'delete')) {
      this._app["delete"]('/:id', this["delete"].bind(this));
    }
    return this._app;
  };

  Controller.prototype.resultFunction = function(req, res, next) {
    var _this = this;
    return function(err, result) {
      if (err) {
        console.log(arguments);
        return res.send(500, err.message);
      }
      if (!result) {
        return res.send(404, new ModelNotFoundError("" + (_this.getAdapter().getName()) + " Not Found"));
      } else {
        return res.json(result);
      }
    };
  };

  Controller.prototype.list = function(req, res) {
    return this._adapter.findAll(req.query, this.resultFunction(req, res));
  };

  Controller.prototype.get = function(req, res) {
    return this._adapter.find(req.params.id, this.resultFunction(req, res));
  };

  Controller.prototype.post = function(req, res) {
    return this._adapter.create(req.body, this.resultFunction(req, res));
  };

  Controller.prototype.put = function(req, res) {
    return this._adapter.update(req.params.id, req.body, this.resultFunction(req, res));
  };

  Controller.prototype["delete"] = function(req, res) {
    return this._adapter["delete"](req.params.id, this.resultFunction(req, res));
  };

  return Controller;

})();

module.exports = Controller;