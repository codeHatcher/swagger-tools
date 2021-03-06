/* global describe, it */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

// Here to quiet down Connect logging errors
process.env.NODE_ENV = 'test';

var _ = require('lodash');
var assert = require('assert');
var helpers = require('../helpers');
var middleware = require('../../').middleware.v1_2.swaggerValidator; // jshint ignore:line
var petJson = require('../../samples/1.2/pet.json');
var request = require('supertest');
var rlJson = require('../../samples/1.2/resource-listing.json');
var createServer = helpers.createServer;

describe('Swagger Validator Middleware v1.2', function () {
  it('should return a function when passed the right arguments', function () {
    try {
      assert.ok(_.isFunction(middleware()));
    } catch (err) {
      assert.fail(null, null, err.message);
    }
  });

  it('should not validate request when there are no operations', function () {
    request(createServer([rlJson, [petJson]], [middleware()]))
      .get('/api/foo')
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should return an error for invalid request content type based on POST/PUT operation consumes', function () {
    request(createServer([rlJson, [petJson]], [middleware()]))
      .post('/api/pet/1')
      .expect(400)
      .end(helpers.expectContent('Invalid content type (application/octet-stream).  These are valid: ' +
                                'application/x-www-form-urlencoded'));
  });

  it('should not return an error for invalid request content type for non-POST/PUT', function () {
    var clonedRl = _.cloneDeep(rlJson);
    var clonedAd = _.cloneDeep(petJson);

    clonedAd.consumes = ['application/json'];

    request(createServer([clonedRl, [clonedAd]]))
      .get('/api/pet/1')
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should not return an error for valid request content type', function () {
    request(createServer([rlJson, [petJson]], [middleware()]))
      .post('/api/pet/1')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should not return an error for valid request content type with charset', function () {
    request(createServer([rlJson, [petJson]], [middleware()]))
      .post('/api/pet/1')
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should return an error for missing required parameters', function () {
    var clonedAd = _.cloneDeep(petJson);

    clonedAd.apis[0].operations[0].parameters.push({
      description: 'Whether or not to use mock mode',
      name: 'mock',
      paramType: 'query',
      required: true,
      type: 'boolean'
    });

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .get('/api/pet/1')
      .expect(400)
      .end(helpers.expectContent('Parameter (mock) is required'));
  });

  it('should not return an error for missing required parameters with defaultValue', function () {
    var clonedAd = _.cloneDeep(petJson);

    clonedAd.apis[0].operations[0].parameters.push({
      description: 'Whether or not to use mock mode',
      name: 'mock',
      paramType: 'query',
      required: true,
      defaultValue: 'false'
    });

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .get('/api/pet/1')
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should not return an error for provided required parameters', function () {
    var clonedAd = _.cloneDeep(petJson);

    clonedAd.apis[0].operations[0].parameters.push({
      description: 'Whether or not to use mock mode',
      name: 'mock',
      paramType: 'query',
      required: true,
      type: 'boolean'
    });

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .get('/api/pet/1')
      .query({mock: 'true'})
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should return an error for invalid parameter values based on type/format', function () {
    var argName = 'arg0';
    var badValue = 'fake';
    var testScenarios = [
      {paramType: 'query', name: argName, type: 'boolean'},
      {paramType: 'query', name: argName, type: 'integer'},
      {paramType: 'query', name: argName, type: 'number'},
      {paramType: 'query', name: argName, type: 'string', format: 'date'},
      {paramType: 'query', name: argName, type: 'string', format: 'date-time'},
      {paramType: 'query', name: argName, type: 'array', items: {type: 'integer'}}
    ];

    _.each(testScenarios, function (scenario) {
      _.times(2, function (n) {
        var clonedAd = _.cloneDeep(petJson);
        var clonedS = _.cloneDeep(scenario);
        var content = {};
        var app;
        var expectedMessage;
        var r;

        // We don't test default value with arrays
        if (n === 0) {
          content = {arg0: scenario.type === 'array' ? [1, 'fake'] : badValue};
        } else if (n === 1) {
          if (scenario.type === 'array') {
            return;
          } else {
            clonedS.defaultValue = badValue;
          }
        }

        clonedAd.apis[0].operations[0].parameters.push(clonedS);

        app = createServer([rlJson, [clonedAd]], [middleware()]);
        r = request(app)
          .get('/api/pet/1')
          .query(content)
          .expect(400);

        if (scenario.type === 'array') {
          expectedMessage = 'Parameter (' + argName + ') at index 1 is not a valid integer: fake';
        } else {
          expectedMessage = 'Parameter (' + scenario.name + ') is not a valid ' +
                       (_.isUndefined(scenario.format) ? '' : scenario.format + ' ') + scenario.type + ': ' +
                       badValue;
        }

        r.end(helpers.expectContent(expectedMessage));
      });
    });
  });

  it('should not return an error for valid parameter values based on type/format', function () {
    var argName = 'arg0';
    var testScenarios = [
      {paramType: 'query', name: argName, type: 'boolean', defaultValue: 'true'},
      {paramType: 'query', name: argName, type: 'integer', defaultValue: '1'},
      {paramType: 'query', name: argName, type: 'number', defaultValue: '1.1'},
      {paramType: 'query', name: argName, type: 'string', format: 'date', defaultValue: '1981-03-12'},
      {
        paramType: 'query',
        name: argName,
        type: 'string',
        format: 'date-time',
        defaultValue: '1981-03-12T08:16:00-04:00'
      },
    ];

    _.each(testScenarios, function (scenario) {
      var clonedAd = _.cloneDeep(petJson);

      clonedAd.apis[0].operations[0].parameters.push(scenario);

      _.times(2, function (n) {
        var clonedS = _.cloneDeep(scenario);
        var content = {};

        if (n === 0) {
          delete clonedS.defaultValue;

          content = {arg0: scenario.defaultValue};
        }

        request(createServer([rlJson, [clonedAd]], [middleware()]))
          .get('/api/pet/1')
          .query(content)
          .expect(200)
          .end(helpers.expectContent('OK'));
      });
    });
  });

  it('should return an error for invalid parameter values not based on type/format', function () {
    var argName = 'arg0';
    var testScenarios = [
      {paramType: 'query', name: argName, enum: ['1', '2', '3'], type: 'string'},
      {paramType: 'query', name: argName, minimum: '1.0', type: 'integer'},
      {paramType: 'query', name: argName, maximum: '1.0', type: 'integer'},
      {paramType: 'query', name: argName, type: 'array', items: {type: 'string'}, uniqueItems: true}
    ];
    var values = [
      'fake',
      '0',
      '2',
      ['fake', 'fake']
    ];
    var errors = [
      'Parameter (' + argName + ') is not an allowable value (1, 2, 3): fake',
      'Parameter (' + argName + ') is less than the configured minimum (1.0): 0',
      'Parameter (' + argName + ') is greater than the configured maximum (1.0): 2',
      'Parameter (' + argName + ') does not allow duplicate values: fake, fake'
    ];

    _.each(testScenarios, function (scenario, index) {
      var clonedAd = _.cloneDeep(petJson);

      clonedAd.apis[0].operations[0].parameters.push(scenario);

      request(createServer([rlJson, [clonedAd]], [middleware()]))
        .get('/api/pet/1')
        .query({arg0: values[index]})
        .expect(400)
        .end(helpers.expectContent(errors[index]));
    });
  });

  it('should not return an error for valid parameter values not based on type/format', function () {
    var argName = 'arg0';
    var testScenarios = [
      {paramType: 'query', name: argName, enum: ['1', '2', '3'], type: 'string'},
      {paramType: 'query', name: argName, minimum: '1.0', type: 'integer'},
      {paramType: 'query', name: argName, maximum: '1.0', type: 'integer'},
      {paramType: 'query', name: argName, type: 'array', items: {type: 'string'}, uniqueItems: true}
    ];
    var values = [
      '1',
      '2',
      '1',
      ['fake', 'fake1']
    ];
    _.each(testScenarios, function (scenario, index) {
      var clonedAd = _.cloneDeep(petJson);

      clonedAd.apis[0].operations[0].parameters.push(scenario);

      request(createServer([rlJson, [clonedAd]], [middleware()]))
        .get('/api/pet/1')
        .query({arg0: values[index]})
        .expect(200)
        .end(helpers.expectContent('OK'));
    });
  });

  it('should return an error for an invalid model parameter', function () {
    var clonedAd = _.cloneDeep(petJson);

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .post('/api/pet')
      .send({})
      .expect(400)
      .end(helpers.expectContent('Parameter (body) is not a valid Pet model'));
  });

  it('should not return an error for a valid model parameter', function () {
    var clonedAd = _.cloneDeep(petJson);

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .post('/api/pet')
      .send({
        id: 1,
        name: 'Test Pet'
      })
      .expect(200)
      .end(helpers.expectContent('OK'));
  });

  it('should return an error for an invalid model parameter (array)', function () {
    var clonedAd = _.cloneDeep(petJson);

      clonedAd.models.Tag.required = ['name'];

      clonedAd.apis.push({
        operations: [
          {
            authorizations: {},
            method: 'POST',
            parameters: [
              {
                name: 'body',
                paramType: 'body',
                required: true,
                type: 'array',
                items: {
                  $ref: 'Tag'
                }
              }
            ],
            responseMessages: [
              {
                code: 400,
                message: 'Invalid tag value'
              }
            ],
            type: 'void'
          }
        ],
        path: '/tags'
      });

      request(createServer([rlJson, [clonedAd]], [middleware()]))
        .post('/api/tags')
        .send([
          {
            id: 1
          },
          {
            id: 2
          }
        ])
        .expect(400)
        .end(helpers.expectContent('Parameter (body) is not a valid Tag model'));
  });

  it('should not return an error for a valid model parameter (array)', function () {
    var clonedAd = _.cloneDeep(petJson);

    clonedAd.models.Tag.required = ['name'];

    clonedAd.apis.push({
      operations: [
        {
          authorizations: {},
          method: 'POST',
          parameters: [
            {
              name: 'body',
              paramType: 'body',
              required: true,
              type: 'array',
              items: {
                $ref: 'Tag'
              }
            }
          ],
          responseMessages: [
            {
              code: 400,
              message: 'Invalid tag value'
            }
          ],
          type: 'void'
        }
      ],
      path: '/tags'
    });

    request(createServer([rlJson, [clonedAd]], [middleware()]))
      .post('/api/tags')
      .send([
        {
          name: 'Tag 1'
        },
        {
          name: 'Tag 2'
        }
      ])
      .expect(200)
      .end(helpers.expectContent('OK'));
  });
});
