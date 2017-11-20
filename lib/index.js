"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invariant = require("invariant");
var redux_actions_1 = require("redux-actions");
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
function createBlueprint(blueprintType, payloadCreator, metaCreator) {
    if (payloadCreator === void 0) { payloadCreator = function (args) { return args; }; }
    if (metaCreator === void 0) { metaCreator = function (args) { return args; }; }
    return function (translateBlueprintType) {
        return redux_actions_1.createAction(translateBlueprintType(blueprintType), function (args) { return payloadCreator(args); }, function (args) { return metaCreator(args); });
    };
}
exports.createBlueprint = createBlueprint;
/**
 * Creates a translator that turns blueprint types into action types.
 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
 * @return {blueprintTypeTranslator}          Function that accepts an object of blueprint type values and returns action types.
 */
function translateBlueprintTypesWith(translateBlueprintType) {
    return function (blueprintTypes) {
        invariant(blueprintTypes, "blueprint types are required");
        invariant(typeof blueprintTypes === "object", "blueprint types must be array or object");
        return Object.keys(blueprintTypes).reduce(function (actionTypes, x) {
            actionTypes[x] = translateBlueprintType(blueprintTypes[x]);
            return actionTypes;
        }, {});
    };
}
exports.translateBlueprintTypesWith = translateBlueprintTypesWith;
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
 * @return {blueprintTranslator}              Function that accepts an object of blueprint values and returns redux-actions FSA actionCreators.
 */
function translateBlueprintsWith(translateBlueprintType) {
    return function (blueprints) {
        invariant(blueprints, "blueprints are required");
        invariant(typeof blueprints === "object", "blueprints must be array or object");
        return Object.keys(blueprints).reduce(function (actionCreators, x) {
            actionCreators[x] = blueprints[x](translateBlueprintType);
            return actionCreators;
        }, {});
    };
}
exports.translateBlueprintsWith = translateBlueprintsWith;
