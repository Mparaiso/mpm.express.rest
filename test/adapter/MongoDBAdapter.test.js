/*global describe,beforeEach,it,before,after*/
"use strict";
var rest, assert, mongodb, db;

/**
 * tests for rest.adapter.MongoDBAdapter
 */
rest = require('../../index');
assert = require('assert');
mongodb = require('mongodb');

before(function(done) {
	var self;
	self = this;
	mongodb.MongoClient.connect(process.env.MONGODB_TEST, function(err, db) {
		if (err) {
			throw err;
		}
		self.collection = db.collection('test');
		self.db = db;
		done();
	});
});
after(function(done) {
	this.db.close(done);
});
describe("rest.adapter.MongoDBAdapter", function(done) {
	beforeEach(function(done) {
		this.adapter = new rest.adapter.MongoDBAdapter(this.collection, "test");
		this.model = {
			foo: 'bar'
		};
		this.collection.remove(done);
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