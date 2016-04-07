import { assert } from 'chai'
import { createAction } from 'redux-actions'

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
export const createBlueprint = (actionName, payloadCreator = args => args, metaCreator = args => args) => createActionType => {
  return createAction(createActionType(actionName), args => payloadCreator(args), args => metaCreator(args))
}


/**
 * Creates a translator that turns actionBlueprints into redux-actions FSA actionCreators
 * @param  {Function} createActionType    Function that accepts an action name and returns an action type
 * @return {actionCreator}                An redux-actions FSA action creator
 */
export const createBlueprintsTranslator = createActionType => blueprints => {
  assert.ok(blueprints, 'blueprints are required')
  if(Array.isArray(blueprints))
    return blueprints.map(x => blueprint(createActionType))
  assert(typeof blueprints === 'object', 'blueprints must be array or object')
  return Object.keys(blueprints).reduce((actionCreators, x) => {
    actionCreators[x] = blueprints[x](createActionType)
    return actionCreators
  }, {})
}
