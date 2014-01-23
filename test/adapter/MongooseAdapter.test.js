/*global describe,beforeEach,it,before*/
"use strict";
var rest, assert, mongoose, Model, ModelSchema;

/**
 * tests for rest.adapter.MongooseAdapter
 */
rest = require('../../index');
assert = require('assert');
mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_TEST || "mongodb://localhost/test");
ModelSchema = mongoose.Schema({
	foo: String,
	date: {
		type: Date,
		default: Date.now
	}
});
Model = mongoose.model('Model', ModelSchema);

describe("rest.adapter.MongooseAdapter", function(done) {
	beforeEach(function(done) {
		this.collection = mongoose.model('Model');
		this.adapter = new rest.adapter.MongooseAdapter(this.collection, "test");
		this.model = {
			foo: 'bar'
		};
		Model.remove(done);
	});
	describe('#create', function() {
		it('should create a model', function(done) {
			var self = this;
			this.adapter.create(this.model, function(err, res) {
				assert(!err);
				assert.equal(res.foo, self.model.foo);
				done();
			});
		});
	});
	describe('#findAll', function() {
		beforeEach(function(done) {
			this.adapter.create(this.model, done);
		});
		it('should find a model', function(done) {
			this.adapter.findAll({}, function(err, res) {
				assert(!err);
				assert.equal(res.length, 1);
				done();
			});
		});
	});
	describe('#find', function() {
		beforeEach(function(done) {
			var self = this;
			this.adapter.create(this.model, function(err, res) {
				self._id = res._id;
				done();
			});
		});
		it('should find a model by id', function(done) {
			var self = this;
			this.adapter.find(this._id, function(err, res) {
				assert(!err);
				assert.equal(res._id.toString(), self._id.toString());
				done();
			});
		});
	});
	describe('#update', function() {
		beforeEach(function(done) {
			var self = this;
			this.adapter.create(this.model, function(err, res) {
				self._id = res._id;
				done();
			});
		});
		it('should update a model by id', function(done) {
			this.adapter.update(this._id, {
				baz: "fizz"
			}, function(err, res) {
				assert(!err);
				done();
			});
		});
	});
	describe('#delete', function() {
		beforeEach(function(done) {
			var self = this;
			this.adapter.create(this.model, function(err, res) {
				self._id = res._id;
				done();
			});
		});
		it('should delete a model by id', function(done) {
			this.adapter.delete(this._id, function(err, res) {
				assert(!err);
				done();
			});
		});
	});
});