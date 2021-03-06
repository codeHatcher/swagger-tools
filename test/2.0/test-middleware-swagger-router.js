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
var middleware = require('../../').middleware.v2_0.swaggerRouter; // jshint ignore:line
var petStoreJson = require('../../samples/2.0/petstore.json');
var path = require('path');
var request = require('supertest');

var createServer = helpers.createServer;
var optionsWithControllersDir = {
  controllers: path.join(__dirname, '..', 'controllers')
};
var testScenarios = {};

_.each(['', '/api/v1'], function (basePath) {
  var clonedP = _.cloneDeep(petStoreJson);

  // Add nicknames the router understands for the operations we're testing
  clonedP.paths['/pets']['x-swagger-router-controller'] = 'Pets';
  clonedP.paths['/pets/{id}'].get['x-swagger-router-controller'] = 'Pets';
  clonedP.paths['/pets/{id}'].delete['x-swagger-router-controller'] = 'Pets';

  // Setup the proper basePath
  switch (basePath) {
  case '':
    delete clonedP.basePath;

    break;

  case '/api/v1':
    clonedP.basePath = 'http://localhost/api/v1';

    break;
  }

  testScenarios[basePath] = clonedP;
});

describe('Swagger Router Middleware v2.0', function () {
  it('should return a function when passed the right arguments', function () {
    try {
      assert.ok(_.isFunction(middleware(optionsWithControllersDir)));
    } catch (err) {
      assert.fail(null, null, err.message);
    }
  });

  it('should do no routing when there is no route match', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      request(createServer([testScenarios[basePath]], [middleware(optionsWithControllersDir)]))
        .put(basePath + '/foo')
        .expect(200)
        .end(helpers.expectContent('OK'));
    });
  });

  it('should return a 405 when thre is a route match but there are no operations', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      request(createServer([testScenarios[basePath]], [middleware(optionsWithControllersDir)]))
        .put(basePath + '/pets/1')
        .expect(405)
        .expect('Allow', 'DELETE, GET')
        .end(helpers.expectContent('Route defined in Swagger specification but there is no defined put operation.'));
    });
  });

  it('should do routing when options.controllers is a valid directory path', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      request(createServer([testScenarios[basePath]], [middleware(optionsWithControllersDir)]))
        .get(basePath + '/pets/1')
        .expect(200)
        .end(helpers.expectContent(require('../controllers/Pets').response));
    });
  });

  it('should do routing when options.controllers is a valid directory path', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      request(createServer([testScenarios[basePath]], [middleware({
        controllers: [
          path.join(__dirname, '..', 'controllers'),
          path.join(__dirname, '..', 'controllers2')
        ]
      })]))
        .post(basePath + '/pets')
        .send({})
        .expect(200)
        .end(helpers.expectContent(require('../controllers2/Pets').response));
    });
  });

  it('should do routing when options.controllers is a valid controller map', function () {
    var controller = require('../controllers/Pets');

    ['', '/api/v1'].forEach(function (basePath) {
      request(createServer([testScenarios[basePath]], [middleware({
        controllers: {
          'Pets_getPetById': controller.getPetById
        }
      })]))
        .get(basePath + '/pets/1')
        .expect(200)
        .end(helpers.expectContent(controller.response));
    });
  });

  it('should not do any routing when there is no controller and use of stubs is off', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      var swaggerObject = _.cloneDeep(testScenarios[basePath]);

      swaggerObject.paths['/pets/{id}'].get['x-swagger-router-controller'] = 'PetsAdmin';

      request(createServer([swaggerObject], [middleware(optionsWithControllersDir)],
              function (req, res) {
                res.end('NOT OK');
              }))
        .get(basePath + '/pets/1')
        .expect(200)
        .end(helpers.expectContent('NOT OK'));
    });
  });

  it('should do routing when there is no controller and use of stubs is on', function () {
    var options = _.cloneDeep(optionsWithControllersDir);

    options.useStubs = true;

    ['', '/api/v1'].forEach(function (basePath) {
      var swaggerObject = _.cloneDeep(testScenarios[basePath]);

      swaggerObject.paths['/pets/{id}'].get['x-swagger-router-controller'] = 'PetsAdmin';

      request(createServer([swaggerObject], [middleware(options)], function (req, res) {
        res.end('NOT OK');
      }))
        .get(basePath + '/pets/1')
        .expect(200)
        .end(helpers.expectContent({
            category: {
              id: 1,
              name: 'Sample text'
            },
            id: 1,
            name: 'Sample text',
            photoUrls: [
              'Sample text'
            ],
            status: 'available',
            tags: [
              {
                id: 1,
                name: 'Sample text'
              }
            ]
          }));
    });
  });

  it('should do routing when controller method starts with an underscore', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      var swaggerObject = testScenarios[basePath];

      swaggerObject.paths['/pets'].get.operationId = '_getAllPets';

      request(createServer([swaggerObject], [middleware(optionsWithControllersDir)]))
        .get(basePath + '/pets')
        .expect(200)
        .end(helpers.expectContent(require('../controllers/Pets').response));
    });
  });

  it('should do routing when controller is provided but operationId is missing', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      var swaggerObject = testScenarios[basePath];

      delete swaggerObject.paths['/pets/{id}'].delete.operationId;

      request(createServer([swaggerObject], [middleware(optionsWithControllersDir)]))
        .delete(basePath + '/pets/1')
        .expect(204)
        .end(helpers.expectContent(''));
    });
  });

  it('should do indicate whether or not useStubs is on or not', function () {
    ['', '/api/v1'].forEach(function (basePath) {
      _.times(2, function (n) {
        var useStubs = n === 1 ? true : false;
        var options = {
          controllers: {
            'Pets_getPetById': function (req, res) {
              if (useStubs === req.swagger.useStubs) {
                res.end('OK');
              } else {
                res.end('NOT OK');
              }
            }
          },
          useStubs: useStubs
        };

        request(createServer([testScenarios[basePath]], [middleware(options)]))
          .get(basePath + '/pets/1')
          .expect(200)
          .end(helpers.expectContent('OK'));
      });
    });
  });
});
