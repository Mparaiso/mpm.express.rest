/*global describe,beforeEach,it*/
"use strict";
var rest, assert;

/**
 * tests for rest.adapter.TestAdapter
 */
rest = require('../../index');
assert = require('assert');

describe("rest.adapter.TestAdapter", function() {
	beforeEach(function() {
		this.collection = [];
		this.adapter = new rest.adapter.TestAdapter(this.collection, "test");
		this.model = {
			foo: 'bar'
		};
	});
	describe('#create', function() {
		it('should create a model', function(done) {
			var self = this;
			this.adapter.create(this.model, function(err, res) {
				assert.equal(self.collection[0].foo, self.model.foo);
				done();
			});
		});
	});
	describe('#findAll', function() {
		it('should find a model', function(done) {
			this.adapter.create(this.model, function() {
				return;
			});
			this.adapter.findAll({}, function(err, res) {
				assert(!err);
				assert.equal(res.length, 1);
				done();
			});
		});
	});
	describe('#find', function() {
		it('should find a model by id', function(done) {
			var id;
			this.adapter.create(this.model, function(err, res) {
				id = res.id;
				return;
			});
			this.adapter.find(id, function(err, res) {
				assert(!err);
				assert.equal(res.id, id);
				done();
			});
		});
	});
	describe('#update', function() {
		it('should update a model by id', function(done) {
			var id, self = this;
			this.adapter.create(this.model, function(err, res) {
				id = res.id;
				return;
			});
			this.adapter.update(id, {
				baz: "fizz"
			}, function(err, res) {
				assert(!err);
				assert.equal(self.collection[0].baz, "fizz");
				done();
			});
		});
	});
	describe('#delete', function() {
		it('should delete a model by id', function(done) {
			var id, self = this;
			this.adapter.create(this.model, function(err, res) {
				id = res.id;
				return;
			});
			this.adapter.delete(id, function(err, res) {
				assert(!err);
				assert.equal(self.collection.length, 0);
				done();
			});
		});
	});
});