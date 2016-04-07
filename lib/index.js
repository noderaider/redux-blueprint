'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlueprintsTranslator = exports.createBlueprint = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _chai = require('chai');

var _reduxActions = require('redux-actions');

/**
 * Creates an action blueprint. Allows delayed assignment of action type which is useful for library designers requiring namespaced action types.
 * @example <caption>Create an action blueprint then translate it to get its action creator at a later time.</caption>
 * const createActionType = actionName => `SOME_REDUX_LIB_${actionName}`
 * let blueprint = createBlueprint('MOUSE_EVENT', (x, y) => ({x, y}), eventType => ({ eventType }))
 * let actionCreator = blueprint(createActionType)
 * @param  {String}   actionName     The name of the action (will be constructed at later time to get action type.)
 * @param  {Function} payloadCreator Function that accepts action args and returns a FSA action payload.
 * @param  {Function} metaCreator    Function that accepts action args and returns a FSA meta payload.
 * @return {Function}                An action blueprint function that accepts an action type creator function as param to return an action creator.
 */
var createBlueprint = exports.createBlueprint = function createBlueprint(actionName) {
  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? function (args) {
    return args;
  } : arguments[1];
  var metaCreator = arguments.length <= 2 || arguments[2] === undefined ? function (args) {
    return args;
  } : arguments[2];
  return function (createActionType) {
    return (0, _reduxActions.createAction)(createActionType(actionName), function (args) {
      return payloadCreator(args);
    }, function (args) {
      return metaCreator(args);
    });
  };
};

/**
 * Creates a translator that turns actionBlueprints into redux-actions FSA actionCreators
 * @param  {Function} createActionType    Function that accepts an action name and returns an action type
 * @return {actionCreator}                An redux-actions FSA action creator
 */
var createBlueprintsTranslator = exports.createBlueprintsTranslator = function createBlueprintsTranslator(createActionType) {
  return function (blueprints) {
    _chai.assert.ok(blueprints, 'blueprints are required');
    if (Array.isArray(blueprints)) return blueprints.map(function (x) {
      return blueprint(createActionType);
    });
    (0, _chai.assert)((typeof blueprints === 'undefined' ? 'undefined' : _typeof(blueprints)) === 'object', 'blueprints must be array or object');
    return Object.keys(blueprints).reduce(function (actionCreators, x) {
      actionCreators[x] = blueprints[x](createActionType);
      return actionCreators;
    }, {});
  };
};