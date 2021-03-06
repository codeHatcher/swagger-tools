!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),(o.SwaggerTools||(o.SwaggerTools={})).specs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(e){"use strict";var r="undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null,n="undefined"!=typeof window?window.jjv:"undefined"!=typeof e?e.jjv:null,t=require("jjve"),a="undefined"!=typeof window?window.SparkMD5:"undefined"!=typeof e?e.SparkMD5:null,s="undefined"!=typeof window?window.traverse:"undefined"!=typeof e?e.traverse:null,i=require("./helpers"),o=require("./validators"),c=require("../schemas/json-schema-draft-04.json"),d="http://json-schema.org/draft-04/schema",u={checkRequired:!0,removeAdditional:!1,useDefault:!1,useCoerce:!1},h={formatPath:!1},m={},p=i.refToJsonPointer,f=i.toJsonPointer,l=function(e,a){var s=n(u);return s.addFormat("uri",function(){return!0}),s.addSchema(d,c),r.each(a,function(n){var t=r.cloneDeep(e.schemas[n]);t.id=n,s.addSchema(n,t)}.bind(this)),s.je=t(s),s},v=function(e,r,n,t,a){a.push({code:e,message:r,data:n,path:t})},g=function(e,r,n,t,a,s){v("UNUSED_"+n,t+" is defined but is not used: "+r,e,a,s)},O=function(e,n,t,a,s,i){r.isUndefined(e)||-1!==e.indexOf(n)||v("UNRESOLVABLE_"+t,a+" could not be resolved: "+n,n,s,i)},y=function(e,n,t,a,s,i){!r.isUndefined(e)&&e.indexOf(n)>-1&&v("DUPLICATE_"+t,a+" already defined: "+n,n,s,i)},A=function(e,n,t,a,s){var i=a[a.length-1];r.isUndefined(e)||e.length===r.uniq(e).length||v("DUPLICATE_"+n,t+" "+i+" has duplicate items",e,a,s)},E=function(e,r,n,t,a){switch(e.version){case"1.2":try{o.validateTypeAndFormat(r.name,n,"array"===r.type?r.items.type:r.type,"array"===r.type&&r.items.format?r.items.format:r.format)}catch(s){return void v("INVALID_TYPE",s.message,n,t,a)}try{o.validateEnum(r.name,n,r.enum)}catch(s){return void v("ENUM_MISMATCH",s.message,n,t,a)}try{o.validateMaximum(r.name,n,r.maximum,r.type)}catch(s){return void v("MAXIMUM",s.message,n,t,a)}try{o.validateMinimum(r.name,n,r.minimum,r.type)}catch(s){return void v("MINIMUM",s.message,n,t,a)}try{o.validateUniqueItems(r.name,n,r.uniqueItems)}catch(s){return void v("ARRAY_UNIQUE",s.message,n,t,a)}break;case"2.0":try{o.validateTypeAndFormat(r.name,n,"array"===r.type?r.items.type:r.type,"array"===r.type&&r.items.format?r.items.format:r.format)}catch(s){return void v("INVALID_TYPE",s.message,n,t,a)}try{o.validateEnum(r.name,n,r.enum)}catch(s){return void v("ENUM_MISMATCH",s.message,n,t,a)}try{o.validateMaximum(r.name,n,r.maximum,r.type,r.exclusiveMaximum)}catch(s){return void v(r.exclusiveMaximum===!0?"MAXIMUM_EXCLUSIVE":"MAXIMUM",s.message,n,t,a)}try{o.validateMaxItems(r.name,n,r.maxItems)}catch(s){return void v("ARRAY_LENGTH_LONG",s.message,n,t,a)}try{o.validateMaxLength(r.name,n,r.maxLength)}catch(s){return void v("MAX_LENGTH",s.message,n,t,a)}try{o.validateMinimum(r.name,n,r.minimum,r.type,r.exclusiveMinimum)}catch(s){return void v("true"===r.exclusiveMinimum?"MINIMUM_EXCLUSIVE":"MINIMUM",s.message,n,t,a)}try{o.validateMinItems(r.name,n,r.minItems)}catch(s){return void v("ARRAY_LENGTH_SHORT",s.message,n,t,a)}try{o.validateMinLength(r.name,n,r.minLength)}catch(s){return void v("MIN_LENGTH",s.message,n,t,a)}try{o.validatePattern(r.name,n,r.pattern)}catch(s){return void v("PATTERN",s.message,n,t,a)}try{o.validateUniqueItems(r.name,n,r.uniqueItems)}catch(s){return void v("ARRAY_UNIQUE",s.message,n,t,a)}}},j=function(e){var n=[],t=[];return r.each(e.split("/"),function(e){"{"===e.charAt(0)&&(n.push(e.substring(1).split("}")[0]),e="{"+(n.length-1)+"}"),t.push(e)}),{path:t.join("/"),args:n}},w=function(e){var n,t,a=["string","number","boolean","integer","array"];switch(e){case"1.2":n="https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md",a=r.union(a,["void","File"]),t="https://github.com/wordnik/swagger-spec/tree/master/schemas/v1.2";break;case"2.0":n="https://github.com/wordnik/swagger-spec/blob/master/versions/2.0.md",a=r.union(a,["file"]),t="https://github.com/wordnik/swagger-spec/tree/master/schemas/v2.0";break;default:throw new Error(e+" is an unsupported Swagger specification version")}switch(this.docsUrl=n,this.primitives=a,this.schemasUrl=t,this.version=e,this.schemas={},this.validators={},e){case"1.2":this.schemas["apiDeclaration.json"]=require("../schemas/1.2/apiDeclaration.json"),this.schemas["authorizationObject.json"]=require("../schemas/1.2/authorizationObject.json"),this.schemas["dataType.json"]=require("../schemas/1.2/dataType.json"),this.schemas["dataTypeBase.json"]=require("../schemas/1.2/dataTypeBase.json"),this.schemas["infoObject.json"]=require("../schemas/1.2/infoObject.json"),this.schemas["modelsObject.json"]=require("../schemas/1.2/modelsObject.json"),this.schemas["oauth2GrantType.json"]=require("../schemas/1.2/oauth2GrantType.json"),this.schemas["operationObject.json"]=require("../schemas/1.2/operationObject.json"),this.schemas["parameterObject.json"]=require("../schemas/1.2/parameterObject.json"),this.schemas["resourceListing.json"]=require("../schemas/1.2/resourceListing.json"),this.schemas["resourceObject.json"]=require("../schemas/1.2/resourceObject.json"),this.validators["apiDeclaration.json"]=l(this,["dataTypeBase.json","modelsObject.json","oauth2GrantType.json","authorizationObject.json","parameterObject.json","operationObject.json","apiDeclaration.json"]),this.validators["resourceListing.json"]=l(this,["resourceObject.json","infoObject.json","oauth2GrantType.json","authorizationObject.json","resourceListing.json"]);break;case"2.0":this.schemas["schema.json"]=require("../schemas/2.0/schema.json"),this.validators["schema.json"]=l(this,["schema.json"])}},b=function(e,n){var t=e[n];return r.isUndefined(t)&&(t=e[n]={composed:{},name:void 0,parents:[],refs:[],schema:void 0}),t},I=function P(e,n,t,a,s,i){var o=b(n,a);switch(o.schema=t,o.name=a,o.path=s,e.version){case"1.2":o.name=s[s.length-1],r.each(t.properties,function(t,a){var o=s.concat("properties",a);t.$ref?b(n,t.$ref).refs.push(o.concat(["$ref"])):"array"===t.type&&t.items.$ref&&b(n,t.items.$ref).refs.push(o.concat(["items","$ref"])),r.isUndefined(t.defaultValue)||E(e,t,t.defaultValue,o.concat("defaultValue"),i.errors)}),r.each(r.uniq(t.subTypes),function(e,r){var t=b(n,e);t.parents.push(a),t.refs.push(s.concat("subTypes",r.toString()))});break;case"2.0":r.each(r.uniq(t.allOf),function(t,a){var c=s.concat("allOf",a.toString());r.isUndefined(t.$ref)?(P(e,n,t,f(c),c,i),o.parents.push(f(c))):(o.parents.push(p(t.$ref)),b(n,p(t.$ref)).refs.push(c.concat("$ref")))}),r.isUndefined(t.default)||E(e,t,t.defaultValue,s.concat("default"),i.errors),t.$ref?b(n,p(t.$ref)).refs.push(s.concat(["$ref"])):"array"===t.type&&(t.items.$ref?b(n,p(t.items.$ref)).refs.push(s.concat(["items","$ref"])):r.isUndefined(t.items.type)||-1!==e.primitives.indexOf(t.items.type)||r.each(t.items,function(r,t){var a=s.concat("items",t.toString());P(e,n,r,f(a),a,i)})),r.each(t.properties,function(t,a){var o=s.concat("properties",a);t.$ref?b(n,p(t.$ref)).refs.push(o.concat(["$ref"])):"array"===t.type&&(t.items.$ref?b(n,p(t.items.$ref)).refs.push(o.concat(["items","$ref"])):r.isUndefined(t.items.type)||-1!==e.primitives.indexOf(t.items.type)||r.each(t.items,function(r,t){var a=o.concat("items",t.toString());P(e,n,r,f(a),a,i)}))}),-1===f(s).indexOf("#/definitions/")&&o.refs.push(s)}},U=function(e,n,t){var i,o={},c={errors:[],warnings:[]},d={},u={},h=function(n,t){var a=i[n].schema;a&&(r.each(a.properties,function(a,s){var i=r.cloneDeep(a);t.properties[s]?v("CHILD_MODEL_REDECLARES_PROPERTY","Child model declares property already declared by ancestor: "+s,a,"1.2"===e.version?["models",n,"properties",s]:n.substring(2).split("/").concat("properties",s),c.errors):("1.2"===e.version&&(r.isUndefined(i.maximum)||(i.maximum=parseFloat(i.maximum)),r.isUndefined(i.minimum)||(i.minimum=parseFloat(i.minimum))),t.properties[s]=i)}),!r.isUndefined(a.required)&&r.isUndefined(t.required)&&(t.required=[]),r.each(a.required,function(e){-1===t.required.indexOf(e)&&t.required.push(e)}))},l=function(e,r){var n=!1;return Object.keys(r).filter(function(t){return t===e&&(n=!0),n&&r[t]})},g=function E(n,t,a,s,o){var d=i[n],u=d.schema;s[n]=!0,r.isUndefined(u)||(d.parents.length>1&&"1.2"===e.version?v("MULTIPLE_MODEL_INHERITANCE","Child model is sub type of multiple models: "+d.parents.join(" && "),u,["models",n],c.errors):r.each(d.parents,function(r){a[r]||(s[r]&&(t[n]=l(r,s),v("CYCLICAL_MODEL_INHERITANCE","Model has a circular inheritance: "+n+" -> "+t[n].join(" -> "),"1.2"===e.version?u.subTypes:u.allOf,"1.2"===e.version?["models",n,"subTypes"]:n.substring(2).split("/").concat("allOf"),c.errors)),t[n]||E(r,t,a,s,o)),t[n]||h(r,o)})),a[n]=!0,s[n]=!1},O=a.hash(JSON.stringify(n)),A=m[O];if(r.isUndefined(A)){switch(A=m[O]={metadata:{},results:c},i=A.metadata,e.version){case"1.2":r.reduce(n.models,function(r,n,t){return y(r,n.id,"MODEL_DEFINITION","Model",["models",t,"id"],c.errors),I(e,i,n,n.id,["models",t],c),r.concat(n.id)},[]);break;case"2.0":r.each(n.definitions,function(r,n){var t=["definitions",n];I(e,i,r,f(t),t,c)})}r.each(i,function(e,n){e.composed={title:"Composed "+n,type:"object",properties:{}},r.isUndefined(e.schema)||(g(n,o,d,u,e.composed),h(n,e.composed)),r.isUndefined(e.schema.required)||r.each(e.schema.required,function(n,a){r.isUndefined(e.composed.properties[n])&&v("MISSING_REQUIRED_MODEL_PROPERTY","Model requires property but it is not defined: "+n,n,e.path.concat(["required",a.toString()]),t.errors)})}),r.each(i,function(n){var t=s(n.composed).reduce(function(r){return"$ref"===this.key&&(r[f(this.path)]="1.2"===e.version?this.node:p(this.node)),r},{});r.each(t,function(e,t){var a=t.substring(2).split("/"),o=r.isUndefined(i[e])?void 0:r.cloneDeep(i[e].composed);r.isUndefined(o)||(delete o.id,delete o.title,s(n.composed).set(a.slice(0,a.length-1),o))})}),r.isUndefined(t)||r.each(c,function(e,r){t[r]=t[r].concat(e)})}return A},T=function(e,r,n){var t=e.validators[r],a=t.schema[r],s=t.validate(a,n),i={errors:[],warnings:[]};return s&&(i={errors:t.je(a,n,s,h),warnings:[]}),i},M=function(e,n,t){var a={errors:[],warnings:[]},s={},i={},o=[],c=[];switch(e.version){case"1.2":r.each(n.apis,function(e,r){y(o,e.path,"RESOURCE_PATH","Resource path",["apis",r.toString(),"path"],a.errors),-1===o.indexOf(e.path)&&o.push(e.path)}),0===a.errors.length&&(r.each(n.authorizations,function(e,n){s[n]=r.map(e.scopes,function(e){return e.scope})},{}),a.apiDeclarations=[],r.each(t,function(n,t){var d=a.apiDeclarations[t]={errors:[],warnings:[]},u={},h={},m=U(e,n,d).metadata,p=function(e,r){var n=b(m,e);n.refs.push(r)},f=function(e,n){var t;r.isUndefined(u[e])?(t=i[e],r.isUndefined(t)&&(t=i[e]=[])):(t=h[e],r.isUndefined(t)&&(t=h[e]=[])),-1===t.indexOf(n)&&t.push(n)};r.each(n.authorizations,function(e,n){u[n]=r.map(e.scopes,function(e){return e.scope})},{}),y(c,n.resourcePath,"RESOURCE_PATH","Resource path",["resourcePath"],d.errors),O(o,n.resourcePath,"RESOURCE_PATH","Resource path",["resourcePath"],d.errors),-1===c.indexOf(n.resourcePath)&&c.push(n.resourcePath),r.each(["consumes","produces"],function(e){A(n[e],"API_"+e.toUpperCase(),"API",[e],d.warnings)}),r.reduce(n.apis,function(n,t,a){var i=["apis",a.toString()],o=j(t.path),c=[];return n.indexOf(o.path)>-1&&v("DUPLICATE_API_PATH","API path (or equivalent) already defined: "+t.path,t.path,i.concat("path"),d.errors),r.reduce(t.operations,function(n,a,h){var m=i.concat(["operations",h.toString()]);return r.each(["consumes","produces"],function(e){A(a[e],"OPERATION_"+e.toUpperCase(),"Operation",m.concat(e),d.warnings)}),y(n,a.method,"OPERATION_METHOD","Operation method",m.concat("method"),d.errors),r.each(a.authorizations,function(e,n){O(r.uniq(Object.keys(u).concat(Object.keys(s))),n,"AUTHORIZATION","Authorization",m.concat(["authorizations",n]),d.errors),r.each(e,function(e,t){r.isUndefined(u[n])&&r.isUndefined(s[n])||O(r.uniq((u[n]||[]).concat(s[n]||[])),e.scope,"AUTHORIZATION_SCOPE","Authorization scope",m.concat(["authorizations",n,t.toString(),"scope"]),d.errors),f(n,e.scope)})}),r.reduce(a.parameters,function(n,t,a){return-1===e.primitives.indexOf(t.type)?p(t.type,m.concat(["parameters",a.toString(),"type"])):"array"===t.type&&t.items.$ref&&p(t.items.$ref,m.concat(["parameters",a.toString(),"items","$ref"])),y(n,t.name,"OPERATION_PARAMETER","Operation parameter",m.concat("parameters",a.toString(),"name"),d.errors),"path"===t.paramType&&(-1===o.args.indexOf(t.name)&&v("UNRESOLVABLE_API_PATH_PARAMETER","API path parameter could not be resolved: "+t.name,t.name,m.concat("parameters",a.toString(),"name"),d.errors),-1===c.indexOf(t.name)&&c.push(t.name)),r.isUndefined(t.defaultValue)||E(e,t,t.defaultValue,m.concat("parameters",a.toString(),"defaultValue"),d.errors),n.concat(t.name)},[]),r.each(r.difference(o.args,c),function(e){v("MISSING_API_PATH_PARAMETER","API requires path parameter but it is not defined: "+e,t.path,i.concat("path"),d.errors)}),r.reduce(a.responseMessages,function(e,r,n){return y(e,r.code,"RESPONSE_MESSAGE_CODE","Response message code",m.concat(["responseMessages",n.toString(),"code"]),d.errors),r.responseModel&&p(r.responseModel,m.concat(["responseMessages",n.toString(),"responseModel"])),e.concat(r.code)},[]),"array"===a.type&&a.items.$ref?p(a.items.$ref,m.concat(["items","$ref"])):-1===e.primitives.indexOf(a.type)&&p(a.type,m.concat(["type"])),n.concat(a.method)},[]),n.concat(o.path)},[]),r.each(m,function(e,n){r.isUndefined(e.schema)&&r.each(e.refs,function(e){v("UNRESOLVABLE_MODEL","Model could not be resolved: "+n,n,e,d.errors)}),0===e.refs.length&&g(e.schema,n,"MODEL","Model",["models",e.name],d.warnings)}),r.each(r.difference(Object.keys(u),Object.keys(h)),function(e){g(n.authorizations[e],e,"AUTHORIZATION","Authorization",["authorizations",e],d.warnings)}),r.each(u,function(e,t){var a=["authorizations",t],s=n.authorizations[t];r.each(r.difference(e,h[t]||[]),function(r){var n=e.indexOf(r);g(s.scopes[n],r,"AUTHORIZATION_SCOPE","Authorization scope",a.concat(["scopes",n.toString()]),d.warnings)})})}),r.each(r.difference(o,c),function(e){var t=r.map(n.apis,function(e){return e.path}).indexOf(e);g(n.apis[t].path,e,"RESOURCE_PATH","Resource path",["apis",t.toString(),"path"],a.errors)}),r.each(r.difference(Object.keys(s),Object.keys(i)),function(e){g(n.authorizations[e],e,"AUTHORIZATION","Authorization",["authorizations",e],a.warnings)}),r.each(i,function(e,t){var s=["authorizations",t];r.each(r.difference(e,i[t]),function(r){var i=e.indexOf(r);g(n.authorizations[t].scopes[i],r,"AUTHORIZATION_SCOPE","Authorization scope",s.concat(["scopes",i.toString()]),a.warnings)})}));break;case"2.0":if(r.each(["consumes","produces","schemes"],function(e){A(n[e],"API_"+e.toUpperCase(),"API",[e],a.warnings)}),0===a.errors.length&&0===a.warnings.length){var d=U(e,n,a).metadata;r.reduce(n.paths,function(n,t,s){var i=["paths",s],o=j(s),c=[];return n.indexOf(o.path)>-1&&v("DUPLICATE_API_PATH","API path (or equivalent) already defined: "+s,s,i,a.errors),r.each(t,function(n,s){var u=i.concat(s);return"parameters"===s?void r.reduce(t.parameters,function(n,t,s){var i=u.concat(s.toString());return y(n,t.name,"API_PARAMETER","API parameter",i.concat("name"),a.errors),"path"===t.in&&(-1===o.args.indexOf(t.name)&&v("UNRESOLVABLE_API_PATH_PARAMETER","API path parameter could not be resolved: "+t.name,t.name,i.concat("name"),a.errors),-1===c.indexOf(t.name)&&c.push(t.name)),r.isUndefined(t.schema)||I(e,d,t.schema,f(i.concat("schema")),i.concat("schema"),a),n.concat(t.name)},[]):(r.each(["consumes","produces","schemes"],function(e){A(n[e],"OPERATION_"+e.toUpperCase(),"Operation",u.concat(e),a.warnings)}),r.reduce(n.parameters,function(n,t,s){var i=u.concat("parameters",s.toString());return y(n,t.name,"OPERATION_PARAMETER","Operation parameter",i.concat("name"),a.errors),"path"===t.in&&(-1===o.args.indexOf(t.name)&&v("UNRESOLVABLE_API_PATH_PARAMETER","API path parameter could not be resolved: "+t.name,t.name,i.concat("name"),a.errors),-1===c.indexOf(t.name)&&c.push(t.name)),r.isUndefined(t.schema)||I(e,d,t.schema,f(i.concat("schema")),i.concat("schema"),a),n.concat(t.name)},[]),void r.each(n.responses,function(n,t){var a=u.concat("responses",t);r.isUndefined(n.schema)||I(e,d,n.schema,f(a.concat("schema")),a.concat("schema"),n)}))}),r.each(r.difference(o.args,c),function(e){v("MISSING_API_PATH_PARAMETER","API requires path parameter but it is not defined: "+e,s,i,a.errors)}),n.concat(o.path)},[]),r.each(d,function(e,n){r.isUndefined(e.schema)&&r.each(e.refs,function(e){v("UNRESOLVABLE_MODEL","Model could not be resolved: "+n,n,e,a.errors)}),0===e.refs.length&&g(e.schema,n,"MODEL","Model",n.substring(2).split("/"),a.warnings)})}}return a};w.prototype.validate=function(e,n){var t={errors:[],warnings:[]},a=!1;switch(this.version){case"1.2":if(r.isUndefined(e))throw new Error("resourceListing is required");if(!r.isPlainObject(e))throw new TypeError("resourceListing must be an object");if(r.isUndefined(n))throw new Error("apiDeclarations is required");if(!r.isArray(n))throw new TypeError("apiDeclarations must be an array");t=T(this,"resourceListing.json",e),t.errors.length>0&&(a=!0),a||(t.apiDeclarations=[],r.each(n,function(e,r){return t.apiDeclarations[r]=T(this,"apiDeclaration.json",e),t.apiDeclarations[r].errors.length>0?(a=!0,!1):void 0}.bind(this))),a||(t=M(this,e,n)),t=t.errors.length>0||t.warnings.length>0||r.reduce(t.apiDeclarations,function(e,n){return e+(r.isArray(n.errors)?n.errors.length:0)+(r.isArray(n.warnings)?n.warnings.length:0)},0)>0?t:void 0;break;case"2.0":if(r.isUndefined(e))throw new Error("swaggerObject is required");if(!r.isPlainObject(e))throw new TypeError("swaggerObject must be an object");t=T(this,"schema.json",e),t.errors.length>0&&(a=!0),a||(t=M(this,e)),t=t.errors.length>0||t.warnings.length>0?t:void 0}return t},w.prototype.composeModel=function(e,n){var t,a,s,i;switch(this.version){case"1.2":if(r.isUndefined(e))throw new Error("apiDeclaration is required");if(!r.isPlainObject(e))throw new TypeError("apiDeclaration must be an object");if(r.isUndefined(n))throw new Error("modelId is required");break;case"2.0":if(r.isUndefined(e))throw new Error("swaggerObject is required");if(!r.isPlainObject(e))throw new TypeError("swaggerObject must be an object");if(r.isUndefined(n))throw new Error("modelIdOrPath is required")}if(t=U(this,e),s=t.metadata,t.results.errors.length>0)throw i=new Error("The models are invalid and model composition is not possible"),i.errors=t.results.errors,i.warnings=t.results.warnings,i;return a=s["1.2"===this.version?n:p(n)],r.isUndefined(a)?void 0:a.composed},w.prototype.validateModel=function(e,a,s){var i,o,m=this.composeModel(e,a);if(r.isUndefined(m))throw Error("Unable to compose model so validation is not possible");return o=n(u),o.addFormat("uri",function(){return!0}),o.addSchema(d,c),o.je=t(o),i=o.validate(m,s),i=i?{errors:o.je(m,s,i,h)}:void 0},module.exports.v1=module.exports.v1_2=new w("1.2"),module.exports.v2=module.exports.v2_0=new w("2.0")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"../schemas/1.2/apiDeclaration.json":5,"../schemas/1.2/authorizationObject.json":6,"../schemas/1.2/dataType.json":7,"../schemas/1.2/dataTypeBase.json":8,"../schemas/1.2/infoObject.json":9,"../schemas/1.2/modelsObject.json":10,"../schemas/1.2/oauth2GrantType.json":11,"../schemas/1.2/operationObject.json":12,"../schemas/1.2/parameterObject.json":13,"../schemas/1.2/resourceListing.json":14,"../schemas/1.2/resourceObject.json":15,"../schemas/2.0/schema.json":16,"../schemas/json-schema-draft-04.json":17,"./helpers":2,"./validators":3,"jjve":4}],2:[function(require,module,exports){
(function(e){"use strict";var n="undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null,i={};module.exports.getSpec=function(e){var o=i[e];if(n.isUndefined(o))switch(e){case"1.2":o=require("../lib/specs").v1_2;break;case"2.0":o=require("../lib/specs").v2_0}return o},module.exports.refToJsonPointer=function(e){return"#"!==e.charAt(0)&&(e="#/definitions/"+e),e},module.exports.toJsonPointer=function(e){return"#/"+e.map(function(e){return e.replace(/\//g,"~1")}).join("/")}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"../lib/specs":undefined}],3:[function(require,module,exports){
(function(e){"use strict";var n="undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null,i=require("./helpers"),t=/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,a=/^([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]+)?(z|([+-][0-9]{2}:[0-9]{2}))$/,o=function(e,n){var i=new Error("Parameter ("+e+") "+n);throw i.failedValidation=!0,i},d=function(e){var i,a,o;return n.isString(e)||(e=e.toString()),a=t.exec(e),null===a?!1:(i=a[3],o=a[2],"01">o||o>"12"||"01">i||i>"31"?!1:!0)},r=function(e){var i,t,o,r,s,l,u;return n.isString(e)||(e=e.toString()),l=e.toLowerCase().split("t"),t=l[0],o=l.length>1?l[1]:void 0,d(t)?(r=a.exec(o),null===r?!1:(i=r[1],s=r[2],u=r[3],i>"23"||s>"59"||u>"59"?!1:!0)):!1};module.exports.validateContentType=function(e,i,t){var a=t.headers["content-type"]||"application/octet-stream",o=n.union(i,e);if(a=a.split(";")[0],o.length>0&&-1!==["POST","PUT"].indexOf(t.method)&&-1===o.indexOf(a))throw new Error("Invalid content type ("+a+").  These are valid: "+o.join(", "))},module.exports.validateEnum=function(e,i,t){n.isUndefined(t)||n.isUndefined(i)||-1!==t.indexOf(i)||o(e,"is not an allowable value ("+t.join(", ")+"): "+i)},module.exports.validateMaximum=function(e,i,t,a,d){var r,s;n.isUndefined(d)&&(d=!1),"integer"===a?s=parseInt(i,10):"number"===a&&(s=parseFloat(i)),n.isUndefined(t)||(r=parseFloat(t),d&&s>=r?o(e,"is greater than or equal to the configured maximum ("+t+"): "+i):s>r&&o(e,"is greater than the configured maximum ("+t+"): "+i))},module.exports.validateMaxItems=function(e,i,t){!n.isUndefined(t)&&i.length>t&&o(e,"contains more items than allowed: "+t)},module.exports.validateMaxLength=function(e,i,t){!n.isUndefined(t)&&i.length>t&&o(e,"is longer than allowed: "+t)},module.exports.validateMinimum=function(e,i,t,a,d){var r,s;n.isUndefined(d)&&(d=!1),"integer"===a?s=parseInt(i,10):"number"===a&&(s=parseFloat(i)),n.isUndefined(t)||(r=parseFloat(t),d&&r>=s?o(e,"is less than or equal to the configured minimum ("+t+"): "+i):r>s&&o(e,"is less than the configured minimum ("+t+"): "+i))},module.exports.validateMinItems=function(e,i,t){!n.isUndefined(t)&&i.length<t&&o(e,"contains fewer items than allowed: "+t)},module.exports.validateMinLength=function(e,i,t){!n.isUndefined(t)&&i.length<t&&o(e,"is shorter than allowed: "+t)},module.exports.validateModel=function(e,t,a,d,r){var s=i.getSpec(a),l=function(i){var t=s.validateModel(d,r,i);if(!n.isUndefined(t))try{o(e,"is not a valid "+r+" model")}catch(a){throw a.errors=t.errors,a}};n.isArray(t)?n.each(t,function(e){l(e)}):l(t)},module.exports.validatePattern=function(e,i,t){!n.isUndefined(t)&&n.isNull(i.match(new RegExp(t)))&&o(e,"does not match required pattern: "+t)},module.exports.validateRequiredness=function(e,i,t){!n.isUndefined(t)&&t===!0&&n.isUndefined(i)&&o(e,"is required")},module.exports.validateTypeAndFormat=function s(e,i,t,a,l){var u=!0;if(n.isArray(i))n.each(i,function(n,i){s(e,n,t,a,!0)||o(e,"at index "+i+" is not a valid "+t+": "+n)});else switch(t){case"boolean":u=n.isBoolean(i)||-1!==["false","true"].indexOf(i);break;case"integer":u=!n.isNaN(parseInt(i,10));break;case"number":u=!n.isNaN(parseFloat(i));break;case"string":if(!n.isUndefined(a))switch(a){case"date":u=d(i);break;case"date-time":u=r(i)}}return l?u:void(u||o(e,"is not a valid "+(n.isUndefined(a)?"":a+" ")+t+": "+i))},module.exports.validateUniqueItems=function(e,i,t){n.isUndefined(t)||n.uniq(i).length===i.length||o(e,"does not allow duplicate values: "+i.join(", "))}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"./helpers":2}],4:[function(require,module,exports){
(function(){"use strict";function e(s){var i=[],n=Object.keys(s.validation),r=n.every(function(e){return"object"!=typeof s.validation[e]||t(s.validation[e])});return n.forEach(r?function(e){var a,n;try{switch(e){case"type":var r=typeof s.data;"number"===r&&(""+s.data).match(/^\d+$/)?r="integer":"object"===r&&Array.isArray(s.data)&&(r="array"),a={code:"INVALID_TYPE",message:"Invalid type: "+r+" should be "+(t(s.validation[e])?"one of ":"")+s.validation[e]};break;case"required":n=s.ns,a={code:"OBJECT_REQUIRED",message:"Missing required property: "+n[n.length-1]};break;case"minimum":a={code:"MINIMUM",message:"Value "+s.data+" is less than minimum "+s.schema.minimum};break;case"maximum":a={code:"MAXIMUM",message:"Value "+s.data+" is greater than maximum "+s.schema.maximum};break;case"multipleOf":a={code:"MULTIPLE_OF",message:"Value "+s.data+" is not a multiple of "+s.schema.multipleOf};break;case"pattern":a={code:"PATTERN",message:"String does not match pattern: "+s.schema.pattern};break;case"minLength":a={code:"MIN_LENGTH",message:"String is too short ("+s.data.length+" chars), minimum "+s.schema.minLength};break;case"maxLength":a={code:"MAX_LENGTH",message:"String is too long ("+s.data.length+" chars), maximum "+s.schema.maxLength};break;case"minItems":a={code:"ARRAY_LENGTH_SHORT",message:"Array is too short ("+s.data.length+"), minimum "+s.schema.minItems};break;case"maxItems":a={code:"ARRAY_LENGTH_LONG",message:"Array is too long ("+s.data.length+"), maximum "+s.schema.maxItems};break;case"uniqueItems":a={code:"ARRAY_UNIQUE",message:"Array items are not unique"};break;case"minProperties":a={code:"OBJECT_PROPERTIES_MINIMUM",message:"Too few properties defined ("+Object.keys(s.data).length+"), minimum "+s.schema.minProperties};break;case"maxProperties":a={code:"OBJECT_PROPERTIES_MAXIMUM",message:"Too many properties defined ("+Object.keys(s.data).length+"), maximum "+s.schema.maxProperties};break;case"enum":a={code:"ENUM_MISMATCH",message:"No enum match ("+s.data+"), expects: "+s.schema["enum"].join(", ")};break;case"not":a={code:"NOT_PASSED",message:'Data matches schema from "not"'};break;case"additional":n=s.ns,a={code:"ADDITIONAL_PROPERTIES",message:"Additional properties not allowed: "+n[n.length-1]}}}catch(o){}if(!a){a={code:"FAILED",message:"Validation error: "+e};try{"boolean"!=typeof s.validation[e]&&(a.message=" ("+s.validation[e]+")")}catch(o){}}a.code="VALIDATION_"+a.code,void 0!==s.data&&(a.data=s.data),a.path=s.ns,i.push(a)}:function(t){var n;s.schema.$ref&&(s.schema=s.schema.$ref.match(/#\/definitions\//)?s.definitions[s.schema.$ref.slice(14)]:s.schema.$ref,"string"==typeof s.schema&&(s.schema=s.env.resolveRef(null,s.schema),s.schema&&(s.schema=s.schema[0]))),s.schema&&s.schema.type&&(a(s.schema,"object")&&(s.schema.properties&&s.schema.properties[t]&&(n=s.schema.properties[t]),!n&&s.schema.patternProperties&&Object.keys(s.schema.patternProperties).some(function(e){return t.match(new RegExp(e))?(n=s.schema.patternProperties[e],!0):void 0}),!n&&s.schema.hasOwnProperty("additionalProperties")&&(n="boolean"==typeof s.schema.additionalProperties?{}:s.schema.additionalProperties)),a(s.schema,"array")&&(n=s.schema.items));var r={env:s.env,schema:n||{},ns:s.ns.concat(t)};try{r.data=s.data[t]}catch(o){}try{r.validation=s.validation[t].schema?s.validation[t].schema:s.validation[t]}catch(o){r.validation={}}try{r.definitions=n.definitions||s.definitions}catch(o){r.definitions=s.definitions}i=i.concat(e(r))}),i}function a(e,a){return"string"==typeof e.type?e.type===a:t(e.type)?-1!==e.type.indexOf(a):!1}function t(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}function s(e){var a=e.hasOwnProperty("root")?e.root:"$",t=e.hasOwnProperty("sep")?e.sep:".";return function(e){var s=a;return e.path.forEach(function(e){s+=e.match(/^\d+$/)?"["+e+"]":e.match(/^[A-Z_$][0-9A-Z_$]*$/i)?t+e:"["+JSON.stringify(e)+"]"}),e.path=s,e}}function i(a){return function(t,i,n,r){if(!n||!n.validation)return[];r=r||{},"string"==typeof t&&(t=a.schema[t]);var o=e({env:a,schema:t,data:i,validation:n.validation,ns:[],definitions:t.definitions||{}});return o.length&&r.formatPath!==!1?o.map(s(r)):o}}"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=i:"function"==typeof define&&define.amd?define(function(){return i}):this.jjve=i}).call(this);
},{}],5:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/apiDeclaration.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "swaggerVersion", "basePath", "apis" ],
    "properties": {
        "swaggerVersion": { "enum": [ "1.2" ] },
        "apiVersion": { "type": "string" },
        "basePath": {
            "type": "string",
            "format": "uri",
            "pattern": "^https?://"
        },
        "resourcePath": {
            "type": "string",
            "format": "uri",
            "pattern": "^/"
        },
        "apis": {
            "type": "array",
            "items": { "$ref": "#/definitions/apiObject" }
        },
        "models": {
            "type": "object",
            "additionalProperties": {
                "$ref": "modelsObject.json#"
            }
        },
        "produces": { "$ref": "#/definitions/mimeTypeArray" },
        "consumes": { "$ref": "#/definitions/mimeTypeArray" },
        "authorizations": { "$ref": "authorizationObject.json#" }
    },
    "additionalProperties": false,
    "definitions": {
        "apiObject": {
            "type": "object",
            "required": [ "path", "operations" ],
            "properties": {
                "path": {
                    "type": "string",
                    "format": "uri-template",
                    "pattern": "^/"
                },
                "description": { "type": "string" },
                "operations": {
                    "type": "array",
                    "items": { "$ref": "operationObject.json#" }
                }
            },
            "additionalProperties": false
        },
        "mimeTypeArray": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "mime-type"
            }
        }
    }
}

},{}],6:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/authorizationObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "additionalProperties": {
        "oneOf": [
            {
                "$ref": "#/definitions/basicAuth"
            },
            {
                "$ref": "#/definitions/apiKey"
            },
            {
                "$ref": "#/definitions/oauth2"
            }
        ]
    },
    "definitions": {
        "basicAuth": {
            "required": [ "type" ],
            "properties": {
                "type": { "enum": [ "basicAuth" ] }
            },
            "additionalProperties": false
        },
        "apiKey": {
            "required": [ "type", "passAs", "keyname" ],
            "properties": {
                "type": { "enum": [ "apiKey" ] },
                "passAs": { "enum": [ "header", "query" ] },
                "keyname": { "type": "string" }
            },
            "additionalProperties": false
        },
        "oauth2": {
            "type": "object",
            "required": [ "type", "grantTypes" ],
            "properties": {
                "type": { "enum": [ "oauth2" ] },
                "scopes": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/oauth2Scope" }
                },
                "grantTypes": { "$ref": "oauth2GrantType.json#" }
            },
            "additionalProperties": false
        },
        "oauth2Scope": {
            "type": "object",
            "required": [ "scope" ],
            "properties": {
                "scope": { "type": "string" },
                "description": { "type": "string" }
            },
            "additionalProperties": false
        }
    }
}


},{}],7:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/dataType.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Data type as described by the specification (version 1.2)",
    "type": "object",
    "oneOf": [
        { "$ref": "#/definitions/refType" },
        { "$ref": "#/definitions/voidType" },
        { "$ref": "#/definitions/primitiveType" },
        { "$ref": "#/definitions/modelType" },
        { "$ref": "#/definitions/arrayType" }
    ],
    "definitions": {
        "refType": {
            "required": [ "$ref" ],
            "properties": {
                "$ref": { "type": "string" }
            },
            "additionalProperties": false
        },
        "voidType": {
            "enum": [ { "type": "void" } ]
        },
        "modelType": {
            "required": [ "type" ],
            "properties": {
                "type": {
                    "type": "string",
                    "not": {
                        "enum": [ "boolean", "integer", "number", "string", "array" ]
                    }
                }
            },
            "additionalProperties": false
        },
        "primitiveType": {
            "required": [ "type" ],
            "properties": {
                "type": {
                    "enum": [ "boolean", "integer", "number", "string" ]
                },
                "format": { "type": "string" },
                "defaultValue": {
                    "not": { "type": [ "array", "object", "null" ] }
                },
                "enum": {
                    "type": "array",
                    "items": { "type": "string" },
                    "minItems": 1,
                    "uniqueItems": true
                },
                "minimum": { "type": "string" },
                "maximum": { "type": "string" }
            },
            "additionalProperties": false,
            "dependencies": {
                "format": {
                    "oneOf": [
                        {
                            "properties": {
                                "type": { "enum": [ "integer" ] },
                                "format": { "enum": [ "int32", "int64" ] }
                            }
                        },
                        {
                            "properties": {
                                "type": { "enum": [ "number" ] },
                                "format": { "enum": [ "float", "double" ] }
                            }
                        },
                        {
                            "properties": {
                                "type": { "enum": [ "string" ] },
                                "format": {
                                    "enum": [ "byte", "date", "date-time" ]
                                }
                            }
                        }
                    ]
                },
                "enum": {
                    "properties": {
                        "type": { "enum": [ "string" ] }
                    }
                },
                "minimum": {
                    "properties": {
                        "type": { "enum": [ "integer", "number" ] }
                    }
                },
                "maximum": {
                    "properties": {
                        "type": { "enum": [ "integer", "number" ] }
                    }
                }
            }
        },
        "arrayType": {
            "required": [ "type", "items" ],
            "properties": {
                "type": { "enum": [ "array" ] },
                "items": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/itemsObject" }
                },
                "uniqueItems": { "type": "boolean" }
            },
            "additionalProperties": false
        },
        "itemsObject": {
            "oneOf": [
                {
                    "$ref": "#/definitions/refType"
                },
                {
                    "allOf": [
                        {
                            "$ref": "#/definitions/primitiveType"
                        },
                        {
                            "properties": {
                                "type": {},
                                "format": {}
                            },
                            "additionalProperties": false
                        }
                    ]
                }
            ]
        }
    }
}
},{}],8:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/dataTypeBase.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Data type fields (section 4.3.3)",
    "type": "object",
    "oneOf": [
        { "required": [ "type" ] },
        { "required": [ "$ref" ] }
    ],
    "properties": {
        "type": { "type": "string" },
        "$ref": { "type": "string" },
        "format": { "type": "string" },
        "defaultValue": {
            "not": { "type": [ "array", "object", "null" ] }
        },
        "enum": {
            "type": "array",
            "items": { "type": "string" },
            "uniqueItems": true,
            "minItems": 1
        },
        "minimum": { "type": "string" },
        "maximum": { "type": "string" },
        "items": { "$ref": "#/definitions/itemsObject" },
        "uniqueItems": { "type": "boolean" }
    },
    "dependencies": {
        "format": {
            "oneOf": [
                {
                    "properties": {
                        "type": { "enum": [ "integer" ] },
                        "format": { "enum": [ "int32", "int64" ] }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "number" ] },
                        "format": { "enum": [ "float", "double" ] }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "string" ] },
                        "format": {
                            "enum": [ "byte", "date", "date-time" ]
                        }
                    }
                }
            ]
        }
    },
    "definitions": {
        "itemsObject": {
            "oneOf": [
                {
                    "type": "object",
                    "required": [ "$ref" ],
                    "properties": {
                        "$ref": { "type": "string" }
                    },
                    "additionalProperties": false
                },
                {
                    "allOf": [
                        { "$ref": "#" },
                        {
                            "required": [ "type" ],
                            "properties": {
                                "type": {},
                                "format": {}
                            },
                            "additionalProperties": false
                        }
                    ]
                }
            ]
        }
    }
}

},{}],9:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/infoObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "info object (section 5.1.3)",
    "type": "object",
    "required": [ "title", "description" ],
    "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" },
        "termsOfServiceUrl": { "type": "string", "format": "uri" },
        "contact": { "type": "string", "format": "email" },
        "license": { "type": "string" },
        "licenseUrl": { "type": "string", "format": "uri" }
    },
    "additionalProperties": false
}
},{}],10:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/modelsObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "id", "properties" ],
    "properties": {
        "id": { "type": "string" },
        "description": { "type": "string" },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#/definitions/propertyObject" }
        },
        "subTypes": {
            "type": "array",
            "items": { "type": "string" },
            "uniqueItems": true
        },
        "discriminator": { "type": "string" }
    },
    "dependencies": {
        "subTypes": [ "discriminator" ]
    },
    "definitions": {
        "propertyObject": {
            "allOf": [
                {
                    "not": { "$ref": "#" }
                },
                {
                    "$ref": "dataTypeBase.json#"
                }
            ]
        }
    }
}


},{}],11:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/oauth2GrantType.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "minProperties": 1,
    "properties": {
        "implicit": { "$ref": "#/definitions/implicit" },
        "authorization_code": { "$ref": "#/definitions/authorizationCode" }
    },
    "definitions": {
        "implicit": {
            "type": "object",
            "required": [ "loginEndpoint" ],
            "properties": {
                "loginEndpoint": { "$ref": "#/definitions/loginEndpoint" },
                "tokenName": { "type": "string" }
            },
            "additionalProperties": false
        },
        "authorizationCode": {
            "type": "object",
            "required": [ "tokenEndpoint", "tokenRequestEndpoint" ],
            "properties": {
                "tokenEndpoint": { "$ref": "#/definitions/tokenEndpoint" },
                "tokenRequestEndpoint": { "$ref": "#/definitions/tokenRequestEndpoint" }
            },
            "additionalProperties": false
        },
        "loginEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" }
            },
            "additionalProperties": false
        },
        "tokenEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" },
                "tokenName": { "type": "string" }
            },
            "additionalProperties": false
        },
        "tokenRequestEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" },
                "clientIdName": { "type": "string" },
                "clientSecretName": { "type": "string" }
            },
            "additionalProperties": false
        }
    }
}
},{}],12:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/operationObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "allOf": [
        { "$ref": "dataTypeBase.json#" },
        {
            "required": [ "method", "nickname", "parameters" ],
            "properties": {
                "method": { "enum": [ "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS" ] },
                "summary": { "type": "string", "maxLength": 120 },
                "notes": { "type": "string" },
                "nickname": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9_]+$"
                },
                "authorizations": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "array",
                        "items": {
                            "$ref": "authorizationObject.json#/definitions/oauth2Scope"
                        }
                    }
                },
                "parameters": {
                    "type": "array",
                    "items": { "$ref": "parameterObject.json#" }
                },
                "responseMessages": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/responseMessageObject"}
                },
                "produces": { "$ref": "#/definitions/mimeTypeArray" },
                "consumes": { "$ref": "#/definitions/mimeTypeArray" },
                "deprecated": { "enum": [ "true", "false" ] }
            }
        }
    ],
    "definitions": {
        "responseMessageObject": {
            "type": "object",
            "required": [ "code", "message" ],
            "properties": {
                "code": { "$ref": "#/definitions/rfc2616section10" },
                "message": { "type": "string" },
                "responseModel": { "type": "string" }
            }
        },
        "rfc2616section10": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600,
            "exclusiveMaximum": true
        },
        "mimeTypeArray": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "mime-type"
            }
        }
    }
}

},{}],13:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/parameterObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "allOf": [
        { "$ref": "dataTypeBase.json#" },
        {
            "required": [ "paramType", "name" ],
            "properties": {
                "paramType": {
                    "enum": [ "path", "query", "body", "header", "form" ]
                },
                "name": { "type": "string" },
                "description": { "type": "string" },
                "required": { "type": "boolean" },
                "allowMultiple": { "type": "boolean" }
            }
        },
        {
            "description": "type File requires special paramType and consumes",
            "oneOf": [
                {
                    "properties": {
                        "type": { "not": { "enum": [ "File" ] } }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "File" ] },
                        "paramType": { "enum": [ "form" ] },
                        "consumes": { "enum": [ "multipart/form-data" ] }
                    }
                }
            ]
        }
    ]
}

},{}],14:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/resourceListing.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "swaggerVersion", "apis" ],
    "properties": {
        "swaggerVersion": { "enum": [ "1.2" ] },
        "apis": {
            "type": "array",
            "items": { "$ref": "resourceObject.json#" }
        },
        "apiVersion": { "type": "string" },
        "info": { "$ref": "infoObject.json#" },
        "authorizations": { "$ref": "authorizationObject.json#" }
    }
}

},{}],15:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/resourceObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "path" ],
    "properties": {
        "path": { "type": "string", "format": "uri" },
        "description": { "type": "string" }
    },
    "additionalProperties": false
}
},{}],16:[function(require,module,exports){
module.exports={
  "title": "A JSON Schema for Swagger 2.0 API.",
  "id": "http://swagger.io/v2/schema.json#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "required": [
    "swagger",
    "info",
    "paths"
  ],
  "additionalProperties": false,
  "patternProperties": {
    "^x-": {
      "$ref": "#/definitions/vendorExtension"
    }
  },
  "properties": {
    "swagger": {
      "type": "string",
      "enum": [
        "2.0"
      ],
      "description": "The Swagger version of this document."
    },
    "info": {
      "$ref": "#/definitions/info"
    },
    "host": {
      "type": "string",
      "format": "uri",
      "pattern": "^[^{}/ :\\\\]+(?::\\d+)?$",
      "description": "The fully qualified URI to the host of the API."
    },
    "basePath": {
      "type": "string",
      "pattern": "^/",
      "description": "The base path to the API. Example: '/api'."
    },
    "schemes": {
      "$ref": "#/definitions/schemesList"
    },
    "consumes": {
      "description": "A list of MIME types accepted by the API.",
      "$ref": "#/definitions/mediaTypeList"
    },
    "produces": {
      "description": "A list of MIME types the API can produce.",
      "$ref": "#/definitions/mediaTypeList"
    },
    "paths": {
      "$ref": "#/definitions/paths"
    },
    "definitions": {
      "$ref": "#/definitions/definitions"
    },
    "parameters": {
      "$ref": "#/definitions/parameterDefinitions"
    },
    "responses": {
      "$ref": "#/definitions/responseDefinitions"
    },
    "security": {
      "$ref": "#/definitions/security"
    },
    "securityDefinitions": {
      "$ref": "#/definitions/securityDefinitions"
    },
    "tags": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/tag"
      },
      "uniqueItems": true
    },
    "externalDocs": {
      "$ref": "#/definitions/externalDocs"
    }
  },
  "definitions": {
    "info": {
      "type": "object",
      "description": "General information about the API.",
      "required": [
        "version",
        "title"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "title": {
          "type": "string",
          "description": "A unique and precise title of the API."
        },
        "version": {
          "type": "string",
          "description": "A semantic version number of the API."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the API. Should be different from the title.  Github-flavored markdown is allowed."
        },
        "termsOfService": {
          "type": "string",
          "description": "The terms of service for the API."
        },
        "contact": {
          "$ref": "#/definitions/contact"
        },
        "license": {
          "$ref": "#/definitions/license"
        }
      }
    },
    "contact": {
      "type": "object",
      "description": "Contact information for the owners of the API.",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string",
          "description": "The identifying name of the contact person/organization."
        },
        "url": {
          "type": "string",
          "description": "The URL pointing to the contact information.",
          "format": "uri"
        },
        "email": {
          "type": "string",
          "description": "The email address of the contact person/organization.",
          "format": "email"
        }
      }
    },
    "license": {
      "type": "object",
      "required": [
        "name"
      ],
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the license type. It's encouraged to use an OSI compatible license."
        },
        "url": {
          "type": "string",
          "description": "The URL pointing to the license.",
          "format": "uri"
        }
      }
    },
    "paths": {
      "type": "object",
      "description": "Relative paths to the individual endpoints. They must be relative to the 'basePath'.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        },
        "^/": {
          "$ref": "#/definitions/pathItem"
        }
      },
      "additionalProperties": false
    },
    "definitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/schema"
      },
      "description": "One or more JSON objects describing the schemas being consumed and produced by the API."
    },
    "parameterDefinitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/parameter"
      },
      "description": "One or more JSON representations for parameters"
    },
    "responseDefinitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/response"
      },
      "description": "One or more JSON representations for parameters"
    },
    "externalDocs": {
      "type": "object",
      "additionalProperties": false,
      "description": "information about external documentation",
      "required": [
        "url"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri"
        }
      }
    },
    "examples": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9-]+/[a-z0-9\\-+]+$": {}
      },
      "additionalProperties": false
    },
    "mimeType": {
      "type": "string",
      "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
      "description": "The MIME type of the HTTP message."
    },
    "operation": {
      "type": "object",
      "required": [
        "responses"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        },
        "summary": {
          "type": "string",
          "description": "A brief summary of the operation."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the operation, github-flavored markdown is allowed."
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        },
        "operationId": {
          "type": "string",
          "description": "A friendly name of the operation"
        },
        "produces": {
          "description": "A list of MIME types the API can produce.",
          "$ref": "#/definitions/mediaTypeList"
        },
        "consumes": {
          "description": "A list of MIME types the API can consume.",
          "$ref": "#/definitions/mediaTypeList"
        },
        "parameters": {
          "$ref": "#/definitions/parametersList"
        },
        "responses": {
          "$ref": "#/definitions/responses"
        },
        "schemes": {
          "$ref": "#/definitions/schemesList"
        },
        "deprecated": {
          "type": "boolean",
          "default": false
        },
        "security": {
          "$ref": "#/definitions/security"
        }
      }
    },
    "pathItem": {
      "type": "object",
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": {
          "type": "string"
        },
        "get": {
          "$ref": "#/definitions/operation"
        },
        "put": {
          "$ref": "#/definitions/operation"
        },
        "post": {
          "$ref": "#/definitions/operation"
        },
        "delete": {
          "$ref": "#/definitions/operation"
        },
        "options": {
          "$ref": "#/definitions/operation"
        },
        "head": {
          "$ref": "#/definitions/operation"
        },
        "patch": {
          "$ref": "#/definitions/operation"
        },
        "parameters": {
          "$ref": "#/definitions/parametersList"
        }
      }
    },
    "responses": {
      "type": "object",
      "description": "Response objects names can either be any valid HTTP status code or 'default'.",
      "minProperties": 1,
      "additionalProperties": false,
      "patternProperties": {
        "^([0-9]{3})$|^(default)$": {
          "$ref": "#/definitions/responseValue"
        },
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "not": {
        "type": "object",
        "additionalProperties": false,
        "patternProperties": {
          "^x-": {
            "$ref": "#/definitions/vendorExtension"
          }
        }
      }
    },
    "responseValue": {
      "oneOf": [
        {
          "$ref": "#/definitions/response"
        },
        {
          "$ref": "#/definitions/jsonReference"
        }
      ]
    },
    "response": {
      "type": "object",
      "required": [
        "description"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "schema": {
          "$ref": "#/definitions/schema"
        },
        "headers": {
          "$ref": "#/definitions/headers"
        },
        "examples": {
          "$ref": "#/definitions/examples"
        }
      },
      "additionalProperties": false
    },
    "headers": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/header"
      }
    },
    "header": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "integer",
            "boolean",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "vendorExtension": {
      "description": "Any property starting with x- is valid.",
      "additionalProperties": true,
      "additionalItems": true
    },
    "bodyParameter": {
      "type": "object",
      "required": [
        "name",
        "in",
        "schema"
      ],
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "body"
          ]
        },
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "schema": {
          "$ref": "#/definitions/schema"
        }
      },
      "additionalProperties": false
    },
    "headerParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "header"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "queryParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "query"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormatWithMulti"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "formDataParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "formData"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array",
            "file"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormatWithMulti"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "pathParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "enum": [
            true
          ],
          "description": "Determines whether or not this parameter is required or optional."
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "path"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "nonBodyParameter": {
      "type": "object",
      "required": [
        "name",
        "in",
        "type"
      ],
      "oneOf": [
        {
          "$ref": "#/definitions/headerParameterSubSchema"
        },
        {
          "$ref": "#/definitions/formDataParameterSubSchema"
        },
        {
          "$ref": "#/definitions/queryParameterSubSchema"
        },
        {
          "$ref": "#/definitions/pathParameterSubSchema"
        }
      ]
    },
    "parameter": {
      "oneOf": [
        {
          "$ref": "#/definitions/bodyParameter"
        },
        {
          "$ref": "#/definitions/nonBodyParameter"
        }
      ]
    },
    "schema": {
      "type": "object",
      "description": "A deterministic version of a JSON Schema object.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": {
          "type": "string"
        },
        "format": {
          "type": "string"
        },
        "title": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/title"
        },
        "description": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/description"
        },
        "default": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/default"
        },
        "multipleOf": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/multipleOf"
        },
        "maximum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minLength": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "pattern": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/pattern"
        },
        "maxItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "uniqueItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/uniqueItems"
        },
        "maxProperties": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minProperties": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "required": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/stringArray"
        },
        "enum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/enum"
        },
        "type": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/type"
        },
        "items": {
          "anyOf": [
            {
              "$ref": "#/definitions/schema"
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/schema"
              }
            }
          ],
          "default": {}
        },
        "allOf": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/schema"
          }
        },
        "properties": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/schema"
          },
          "default": {}
        },
        "discriminator": {
          "type": "string"
        },
        "readOnly": {
          "type": "boolean",
          "default": false
        },
        "xml": {
          "$ref": "#/definitions/xml"
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        },
        "example": {}
      }
    },
    "primitivesItems": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "integer",
            "boolean",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "security": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/securityRequirement"
      },
      "uniqueItems": true
    },
    "securityRequirement": {
      "type": "object",
      "additionalProperties": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "uniqueItems": true
      }
    },
    "xml": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "namespace": {
          "type": "string"
        },
        "prefix": {
          "type": "string"
        },
        "attribute": {
          "type": "boolean",
          "default": false
        },
        "wrapped": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "tag": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "securityDefinitions": {
      "type": "object",
      "additionalProperties": {
        "oneOf": [
          {
            "$ref": "#/definitions/basicAuthenticationSecurity"
          },
          {
            "$ref": "#/definitions/apiKeySecurity"
          },
          {
            "$ref": "#/definitions/oauth2ImplicitSecurity"
          },
          {
            "$ref": "#/definitions/oauth2PasswordSecurity"
          },
          {
            "$ref": "#/definitions/oauth2ApplicationSecurity"
          },
          {
            "$ref": "#/definitions/oauth2AccessCodeSecurity"
          }
        ]
      }
    },
    "basicAuthenticationSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "basic"
          ]
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "apiKeySecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "name",
        "in"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "apiKey"
          ]
        },
        "name": {
          "type": "string"
        },
        "in": {
          "type": "string",
          "enum": [
            "header",
            "query"
          ]
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2ImplicitSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "authorizationUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "implicit"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "authorizationUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2PasswordSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "password"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2ApplicationSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "application"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2AccessCodeSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "authorizationUrl",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "accessCode"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "authorizationUrl": {
          "type": "string",
          "format": "uri"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2Scopes": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "mediaTypeList": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/mimeType"
      },
      "uniqueItems": true
    },
    "parametersList": {
      "type": "array",
      "description": "The parameters needed to send a valid API call.",
      "minItems": 1,
      "additionalItems": false,
      "items": {
        "oneOf": [
          {
            "$ref": "#/definitions/parameter"
          },
          {
            "$ref": "#/definitions/jsonReference"
          }
        ]
      },
      "uniqueItems": true
    },
    "schemesList": {
      "type": "array",
      "description": "The transfer protocol of the API.",
      "items": {
        "type": "string",
        "enum": [
          "http",
          "https",
          "ws",
          "wss"
        ]
      },
      "uniqueItems": true
    },
    "collectionFormat": {
      "type": "string",
      "enum": [
        "csv",
        "ssv",
        "tsv",
        "pipes"
      ],
      "default": "csv"
    },
    "collectionFormatWithMulti": {
      "type": "string",
      "enum": [
        "csv",
        "ssv",
        "tsv",
        "pipes",
        "multi"
      ],
      "default": "csv"
    },
    "title": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/title"
    },
    "description": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/description"
    },
    "default": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/default"
    },
    "multipleOf": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/multipleOf"
    },
    "maximum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/maximum"
    },
    "exclusiveMaximum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"
    },
    "minimum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/minimum"
    },
    "exclusiveMinimum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"
    },
    "maxLength": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
    },
    "minLength": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
    },
    "pattern": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/pattern"
    },
    "maxItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
    },
    "minItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
    },
    "uniqueItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/uniqueItems"
    },
    "enum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/enum"
    },
    "jsonReference": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "$ref": {
          "type": "string"
        }
      }
    }
  }
}

},{}],17:[function(require,module,exports){
module.exports={
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "maximum": {
            "type": "number"
        },
        "exclusiveMaximum": {
            "type": "boolean",
            "default": false
        },
        "minimum": {
            "type": "number"
        },
        "exclusiveMinimum": {
            "type": "boolean",
            "default": false
        },
        "maxLength": { "$ref": "#/definitions/positiveInteger" },
        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "pattern": {
            "type": "string",
            "format": "regex"
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": { "$ref": "#/definitions/positiveInteger" },
        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "uniqueItems": {
            "type": "boolean",
            "default": false
        },
        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "#/definitions/stringArray" },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ]
    },
    "default": {}
}

},{}]},{},[1])(1)
});