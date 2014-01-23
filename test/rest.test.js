/*global describe,it,before,beforeEach */
"use strict";
/**
 * test/
 * rest.Controller test
 */
var rest, assert, request, expect, express, noop;
require('source-map-support').install();
assert = require('assert');
request = require('supertest');
rest = require('../index');
expect = require('chai').expect;
express = require('express');
noop = function() {
    return;
};

describe("rest.Controller", function() {
    beforeEach(function() {
        this.collection = [];
        this.adapter = new rest.adapter.TestAdapter(this.collection, "test");
        this.app = express();
        this.app.use(express.json());
        this.controller = new rest.Controller(this.app);
        this.controller.setAdapter(this.adapter);
        this.controller.handle();
        this.model = {
            foo: "bar"
        };
    });
    describe("#list", function() {
        it('should find records', function(done) {
            this.adapter.create(this.model, noop);
            request(this.app)
                .get('/')
                .expect(200)
                .expect(this.adapter.getModel())
                .end(done);
        });
    });
    describe('#get', function() {
        it('should find a record by id', function(done) {
            this.adapter.create(this.model, noop);
            var model = this.adapter.getModel()[0];
            request(this.app)
                .get('/' + model.id)
                .expect(200)
                .expect(model)
                .end(done);
        });
    });
    describe("#post", function() {
        it('should create a model', function(done) {
            request(this.app)
                .post('/')
                .send(this.model)
                .expect(200)
                .end(function(err, res) {
                    assert.equal(res.body.foo, "bar");
                    assert(res.body.id);
                    done();
                });
        });
    });
    describe('#update', function() {
        it('should update a record', function(done) {
            var id, self;
            this.adapter.create(this.model, noop);
            self = this;
            id = this.model.id;
            request(this.app)
                .put('/' + id)
                .send({
                    foo: 'baz'
                })
                .expect(200)
                .end(function(err, res) {
                    var model = self.adapter.getModel()[0];
                    assert.equal(model.foo, "baz");
                    done();
                });
        });
    });
    describe('#delete', function() {
        it('should delete a record', function(done) {
            var id, self;
            this.adapter.create(this.model, noop);
            assert.equal(this.adapter.getModel().length, 1);
            self = this;
            id = this.adapter.getModel()[0].id;
            request(this.app)
                .del("/" + id)
                .expect(200)
                .end(function() {
                    assert.equal(self.adapter.getModel().length, 0);
                    done();
                });
        });
        it('should not delete a non existant record', function(done) {
            request(this.app)
                .del("/" + "foo")
                .expect(404)
                .end(done);
        });
    });
});