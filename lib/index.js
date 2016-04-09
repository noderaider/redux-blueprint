'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateBlueprintsWith = exports.translateBlueprintTypesWith = exports.createBlueprint = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _chai = require('chai');

var _reduxActions = require('redux-actions');

/**
 * Creates an action blueprint. Allows delayed assignment of action type which is useful for library designers requiring namespaced action types.
 * @example <caption>Create an action blueprint then translate it to get its action creator at a later time.</caption>
 * const createActionType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
 * let blueprint = createBlueprint('MOUSE_EVENT', (x, y) => ({x, y}), eventType => ({ eventType }))
 * let actionCreator = blueprint(createActionType)
 * @param  {String}   blueprintType  The name of the action (will be constructed at later time to get action type.)
 * @param  {Function} payloadCreator Function that accepts action args and returns a FSA action payload.
 * @param  {Function} metaCreator    Function that accepts action args and returns a FSA meta payload.
 * @return {Function}                An action blueprint function that accepts an action type creator function as param to return an action creator.
 */
var createBlueprint = exports.createBlueprint = function createBlueprint(blueprintType) {
  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? function (args) {
    return args;
  } : arguments[1];
  var metaCreator = arguments.length <= 2 || arguments[2] === undefined ? function (args) {
    return args;
  } : arguments[2];
  return function (translateBlueprintType) {
    return (0, _reduxActions.createAction)(translateBlueprintType(blueprintType), function (args) {
      return payloadCreator(args);
    }, function (args) {
      return metaCreator(args);
    });
  };
};

/**
 * Creates a translator that turns blueprint types into action types.
 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
 * @return {blueprintTypeTranslator}          Function that accepts array or object of blueprint type values and returns action types.
 */
var translateBlueprintTypesWith = exports.translateBlueprintTypesWith = function translateBlueprintTypesWith(translateBlueprintType) {
  return function (blueprintTypes) {
    _chai.assert.ok(blueprintTypes, 'blueprint types are required');
    if (Array.isArray(blueprintTypes)) return blueprintTypes.map(function (x) {
      return translateBlueprintType(x);
    });
    (0, _chai.assert)((typeof blueprintTypes === 'undefined' ? 'undefined' : _typeof(blueprintTypes)) === 'object', 'blueprint types must be array or object');
    return Object.keys(blueprintTypes).reduce(function (actionTypes, x) {
      actionTypes[x] = translateBlueprintType(blueprintTypes[x]);
      return actionTypes;
    }, {});
  };
};

/**
 * Creates a translator that turns blueprints into redux-actions FSA actionCreators
 * @example <caption>Creates a function that can translate an array or object literal with blueprint values to actions.</caption>
 * const translateBlueprintType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
 * const translateBlueprints = translateBlueprintsWith(translateBlueprintType)
 * let startBlueprint = createBlueprint('START')
 * let endBlueprint = createBlueprint('END')
 * let { startAction, endAction } = translateBlueprints({ startAction: startBlueprint, endAction: endBlueprint })
 * dispatch(startAction())
 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
 * @return {blueprintTranslator}              Function that accepts array or object of blueprint values and returns redux-actions FSA actionCreators.
 */
var translateBlueprintsWith = exports.translateBlueprintsWith = function translateBlueprintsWith(translateBlueprintType) {
  return function (blueprints) {
    _chai.assert.ok(blueprints, 'blueprints are required');
    if (Array.isArray(blueprints)) return blueprints.map(function (x) {
      return blueprint(translateBlueprintType);
    });
    (0, _chai.assert)((typeof blueprints === 'undefined' ? 'undefined' : _typeof(blueprints)) === 'object', 'blueprints must be array or object');
    return Object.keys(blueprints).reduce(function (actionCreators, x) {
      actionCreators[x] = blueprints[x](translateBlueprintType);
      return actionCreators;
    }, {});
  };
};