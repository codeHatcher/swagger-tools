Swagger Tools provides a few [Connect][connect] middlewares to help you utilize your Swagger documents.  Each middleware
is documented below.

**Note:** All middlewares for the different Swagger versions function the same but due to the differences between the
Swagger versions, some function arguments are different and so is the `swagger` object attached to the `req` object.  In
the cases where this applies, notation will be made below.

## Swagger Metadata

The Swagger Metadata middleware is the base for all other Swagger Tools middleware and it attaches Swagger information
to the request (`req.swagger`) when a request matches a route define in your Swagger document(s).  For requests where
the route does not match a route defined in your Swagger document(s), this middleware does nothing.  Since Swagger 1.2
and Swagger 2.0 differ both in Swagger document structure and terminology, this middleware takes different parameters
based on Swagger version and it uses different property names on the `req.swagger` object.

The Swagger Metadata middleware is useful because it allows you to easily get access to the pertinent Swagger document
information for your request in your request handler.  This does not require you to use any other Swagger Tools
metadata.  Why might you want to do this?  Imagine you wanted to annotate your Swagger 2.0 documents using vendor
extensions in a way that is useful to your implementation, like cache information or quota information.  By attaching
the request path and the request operation to the `req` object, you can easily get access to your vendor extension
annotations to make life easier.

Swagger Metadata also processes your request parameters for you.  So no matter how the parameters are provided (body,
header, form data, query string, ...), as described in your Swagger document(s), the processing is handled for you to
get the parameter values. _(No validation of the parameter values happens in the Swagger Metadata middleware.)_

### Swagger 1.2

#### #swaggerMetadata(resourceListing, apiDeclarations)

**Arguments**

* **resourceListing:** `object` The Resource Listing object
* **apiDeclarations:** `[object` The array of API Declaration objects

**Returns**

The Connect middleware function.

**Note:** Since Swagger Metadata is used by the other Swagger Tools middleware, it must be used before the other
Swagger Tools middleware.  Also, Swagger Metadata requires that `req.body` and `req.params` be populated so make sure to
use whatever middleware you need prior to using Swagger Metadata.

#### req.swagger

The structure of `req.swagger` is as follows:

* **api:** `object` The corresponding API in the API Declaration that the request maps to
* **apiDeclaration:** `object` The corresponding API Declaration that the request maps to
* **authorizations:** `object` The authorization definitions for the API
* **models:** `object` The model definitions for the API
* **params:** `object` For each of the request parameters defined in your Swagger document, its `schema` and its
processed `value`.  The value is converted to the proper JSON type based on the Swagger document.  If the parameter
defined in your Swagger document includes a default value and the request does not include the value, the default value
is assigned to the parameter value in `req.swagger.params`.
* **resourceListing:** `object` The Resource Listing for the API

### Swagger 2.0

**Arguments**

* **swaggerObject:** `object` The Swagger object

**Returns**

The Connect middleware function.

#### req.swagger

The structure of `req.swagger` is as follows:

* **path:** `object` The corresponding path in the Swagger object that the request maps to
* **params:** `object` For each of the request parameters defined in your Swagger document, its `schema` and its
processed `value`
* **swaggerObject:** `object` The Swagger object

## Swagger Router

The Swagger Router middleware provides facilities for wiring up request handlers, as defined in your Swagger
document(s).  Since your Swagger document(s) already define your API routes, Swagger Router provides a lightweight
approach to wiring up the router handler implementation function to the proper route based on the information in your
Swagger document(s).

Both Swagger 1.2 and Swagger 2.0 middlewares are instantiated the same but how the wiring is defined is different
between the two.

### #swaggerRouter(options)

**Arguments**

* **options:** `[object]` The configuration options
* **options.controllers:** `[string|string[]|object]` The controllers to look for or use.  If the value is a string, we
assume the value is a path to a directory that contain controller modules.  If the value is an array, we
assume the value is an array of paths to directories that contain controller modules.  If the value is an object, we
assume the object keys are the handler name _({ControllerName}_{HandlerFunctionName}) and the value is a function.
* **options.useStubs:** `[boolean]` Whether or not stub handlers should be used for routes with no defined controller or
the controller could not be found.

**Returns**

The Connect middleware function.

**Note:** Since Swagger Router will actually return a response, it should be as close to the end of your middleware
chain as possible.

### req.swagger

The structure of `req.swagger` is updated to include the following:

* **useStubs:** `boolean` The value of `options.useStubs`

### How to Use

For Swagger Router to work, your Swagger document(s) need to be updated to indicate how to find the controller (by name)
and the controller function.  Due to the differences between Swagger 1.2 and Swagger 2.0, the requirements are different
and are documented below.

#### Swagger 1.2

Since Swagger 1.2 does not allow you to add additional properties to your Swagger documents, Swagger Router has to use
an existing Swagger document property to handle the routing.  Since Swagger 1.2 requires all operation objects to have a
`nickname` property, we use it by overloading its value to give Swagger Router what it needs.

The value of the operation's `nickname` property is in the format of `{ControllerName}_{HandlerFunction}`.  So if you
have a `Pet` controller and want your operation to map to its `getById` function, your operation's `nickname` property
would have a value of `Pet_getById`.

#### Swagger 2.0

Since Swagger 2.0 has a new feature called **Vendor Extensions** which allows you to add additional properties
throughout your Swagger documents as long as they start with `x-`.  Swagger Router uses a vendor extension named
`x-swagger-router-controller` to help with the routing.  Basically, `x-swagger-router-controller` can be defined at the
path level and/or the operation level and it tells the controller name to use.  To define the controller to use for an
operation, just define the `x-swagger-router-controller` property at the operation level.  What if you want to reuse the
same controller for multiple/all operations in a path?  Just define the `x-swagger-router-controller` property at the
path level.  Of course if you've defined `x-swagger-router-controller` at the path level and you want to use a different
controller for any operation below that path, you can override the path controller by defining the
`x-swagger-router-controller` at the operation level.

When it comes to finding the controller function to call, there are two options.  The default is to use the operation
name for the operation, which corresponds to the HTTP verb being used.  If you want to override this default and use a
different name, just define the `operationId` property on your operation.  Here is an example Swagger document snippet
where each operation tells you which controller and function will be used based on its definition:

```json
{
  "swagger": 2.0,
  "info": {
    "version": "1.0.0",
    "title": "Swagger Router Example"
  },
  "paths": {
    "/pets/{id}": {
      "x-swagger-router-controller": "Pets",
      "delete": {
        "description": "Swagger router would look for a 'deletePet' function in the 'Pets' controller",
        "operationId": "deletePet",
        "responses": {
          "204": {
            "description": "Pet deleted"
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "get": {
        "description": "Swagger router would look for a 'get' function in the 'Pets' controller",
        "responses": {
          "200": {
            "description": "Pet response",
            "schema": {
              "$ref": "#/definitions/Pet"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "x-swagger-router-controller": "PetsAdmin",
        "description": "Swagger router would look for a 'createPet' function in the 'PetsAdmin' controller",
        "operationId": "createPet",
        "responses": {
          "201": {
            "description": "Pet created"
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "put": {
        "x-swagger-router-controller": "PetsAdmin",
        "description": "Swagger router would look for a 'put' function in the 'PetsAdmin' controller",
        "responses": {
          "201": {
            "description": "Pet updated"
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "description": "ID of pet",
          "required": true,
          "type": "integer",
          "format": "int64"
        }
      ]
    }
  },
  "definitions": {
    "Pet": {
      "id": "Pet",
      "properties": {
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "Error": {
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
```

### Mock Mode

Swagger Router also comes with a feature that can be useful during testing and/or design time.  This feature will
automatically handle routes that are defined in your Swagger document(s) as having route handlers but their configured
controller and/or handler function is missing.  The response content is inferred from your Swagger document(s).  So if
your operation says that the requested API will return an integer, mock mode will return an integer.  If your operation
says that the requested API will return a model, mock mode will return a JSON representation of that model.  For the
example `Pet` above, mock mode would return the following:

```json
{
  "id": 1,
  "name": "Sample text"
}
```

To enable mock mode, just pass the `useStubs` option as `true` to the `swaggerRouter` middleware.  Both of the complete
examples below demonstrate how to do this.

This feature is nice to see how your API should respond based on what you've configured prior to implementing the actual
route handler in code.  This is obviously something that should be disabled in production.

#### Caveats

Mock mode is a relatively new feature to Swagger Router and while it's cool as-is, there are a few things that need to
be done to make it better.  This is currently being tracked in [Issue #30][issue-30].

## Swagger UI

The Swagger UI middleware is used to serve your Swagger document(s) via an API and also to serve
[Swagger UI][swagger-ui] on your behalf.  Must like `swaggerMetadata`, this middleware has a different function
signature based on your Swagger version.

**Note:** This middleware is completely standalone and does not require `swaggerMetadata`.

### Swagger 1.2

#### #swaggerUi(resourceListing, resources)

**Arguments**

* **resourceListing:** `object` The Resource Listing object
* **resources:** `object` Object whose keys are the relative path from your configured `options.apiDocs` to serve the
JSON for the apiDeclaration/resource and the value is the apiDeclaration being served.  _(Note: The path must match a
path in the Resource Listing's `apis`.)_
* **options:** `object` The middleware options
* **options.apiDocs:** `string=/api-docs` The path to serve the Swagger documents from
* **options.swaggerUi:** `string=/docs` The path to serve Swagger UI from

**Returns**

The Connect middleware function.

### Swagger 2.0

**Arguments**

* **swaggerObject:** `object` The Swagger object
* **options:** `object` The middleware options
* **options.apiDocs:** `string=/api-docs` The path to serve the Swagger documents from
* **options.swaggerUi:** `string=/docs` The path to serve Swagger UI from

**Returns**

The Connect middleware function.

### Swagger Documents

For Swagger 2.0, there is only one Swagger document and it is served at the path configured by `options.apiDocs`.  For
Swagger 1.2, there is a Resource Listing document and one document per API Declaration (resource) your API ships with.
The Resource Listing document is served at the path configured by `options.apiDocs` and the API Declaration documents
are served at their respective subpath below the path configured by `options.apiDocs`.  To see an example of this, view
the [complete example](#complete-example) below for your Swagger version to see the paths exposed by the `swaggerUi`
middleware.

## Swagger Validator

The Swagger Validator middleware is used to validate your requests based on the constraints defined in the operation
parameters of your Swagger document(s).  So if your operation has a required parameter and your request does not provide
it, the Swagger Validator will send an error downstream in typical Connect fashion.  There are no configuration options
for this middleware.

## Complete Example

Here is a complete example for using all middlewares documented above:

**Swagger 2.0**

```javascript
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var qs = require('qs');
var swagger = require('swagger-tools');
var swaggerObject = require('./samples/2.0/petstore.json'); // This assumes you're in the root of the swagger-tools
var swaggerMetadata = swagger.middleware.v2.swaggerMetadata;
var swaggerRouter = swagger.middleware.v2.swaggerRouter;
var swaggerUi = swagger.middleware.v2.swaggerUi;
var swaggerValidator = swagger.middleware.v2.swaggerValidator;

var connect = require('connect');
var http = require('http');
var app = connect();

// Wire up the middleware required by Swagger Tools (body-parser and qs)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  if (!req.query) {
    req.query = req.url.indexOf('?') > -1 ? qs.parse(parseurl(req).query, {}) : {};
  }

  return next();
});

// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
app.use(swaggerMetadata(swaggerObject));

// Validate Swagger requests
app.use(swaggerValidator());

// Route validated requests to appropriate controller
app.use(swaggerRouter({useStubs: true, controllers: './controllers'}));

// Serve the Swagger documents and Swagger UI
//   http://localhost:3000/docs => Swagger UI
//   http://localhost:3000/api-docs => Swagger document
app.use(swaggerUi(swaggerObject));

// Start the server
http.createServer(app).listen(3000);
```

**Swagger 1.2**

```javascript
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var qs = require('qs');
var swagger = require('swagger-tools');
var resourceListing = require('./samples/1.2/resourceListing.json'); // This assumes you're in the root of the swagger-tools
var apiDeclarations = [
  require('./samples/1.2/pet.json'), // This assumes you're in the root of the swagger-tools
  require('./samples/1.2/store.json'), // This assumes you're in the root of the swagger-tools
  require('./samples/1.2/user.json') // This assumes you're in the root of the swagger-tools
];
var swaggerMetadata = swagger.middleware.v1.swaggerMetadata;
var swaggerRouter = swagger.middleware.v1.swaggerRouter;
var swaggerUi = swagger.middleware.v1.swaggerUi;
var swaggerValidator = swagger.middleware.v1.swaggerValidator;

var connect = require('connect');
var http = require('http');
var app = connect();

// Wire up the middleware required by Swagger Tools (body-parser and qs)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  if (!req.query) {
    req.query = req.url.indexOf('?') > -1 ? qs.parse(parseurl(req).query, {}) : {};
  }

  return next();
});

// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
app.use(swaggerMetadata(resourceListing, apiDeclarations));

// Validate Swagger requests
app.use(swaggerValidator());

// Route validated requests to appropriate controller
app.use(swaggerRouter({useStubs: true, controllers: './controllers'}));

// Serve the Swagger documents and Swagger UI
//   http://localhost:3000/docs => Swagger UI
//   http://localhost:3000/api-docs => Resource Listing JSON
//   http://localhost:3000/api-docs/pet => Pet JSON
//   http://localhost:3000/api-docs/store => Store JSON
//   http://localhost:3000/api-docs/user => User JSON
app.use(swaggerUi(rlJson, {
  '/pet': apiDeclarations[0],
  '/store': apiDeclarations[1],
  '/user': apiDeclarations[2]
}));

// Start the server
http.createServer(app).listen(3000);
```

[connect]: https://github.com/senchalabs/connect
[issue-30]: https://github.com/apigee-127/swagger-tools/issues/30
[swagger-ui]: https://github.com/wordnik/swagger-ui
