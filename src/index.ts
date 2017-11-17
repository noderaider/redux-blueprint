import * as invariant from "invariant";
import { createAction } from "redux-actions";

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
export function createBlueprint(blueprintType: string, payloadCreator: ReduxBlueprint.PayloadCreator = args => args, metaCreator: ReduxBlueprint.MetaCreator = args => args): ReduxBlueprint.Blueprint {
    return (translateBlueprintType: ReduxBlueprint.TranslateBlueprintType) => {
        return createAction(translateBlueprintType(blueprintType), args => payloadCreator(args), args => metaCreator(args));
    };
}

/**
 * Creates a translator that turns blueprint types into action types.
 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
 * @return {blueprintTypeTranslator}          Function that accepts an object of blueprint type values and returns action types.
 */
export function translateBlueprintTypesWith(translateBlueprintType: ReduxBlueprint.TranslateBlueprintType) {
    return blueprintTypes => {
        invariant(blueprintTypes, "blueprint types are required");
        invariant(typeof blueprintTypes === "object", "blueprint types must be array or object");
        return Object.keys(blueprintTypes).reduce((actionTypes, x) => {
            actionTypes[x] = translateBlueprintType(blueprintTypes[x]);
            return actionTypes;
        }, {});
    };
}

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
export function translateBlueprintsWith(translateBlueprintType: ReduxBlueprint.TranslateBlueprintType) {
    return (blueprints: ReduxBlueprint.Blueprints) => {
        invariant(blueprints, "blueprints are required");
        invariant(typeof blueprints === "object", "blueprints must be array or object");
        return Object.keys(blueprints).reduce((actionCreators, x) => {
            actionCreators[x] = blueprints[x](translateBlueprintType);
            return actionCreators;
        }, {});
    };
}