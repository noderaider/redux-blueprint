import { assert } from 'chai'
import { createAction } from 'redux-actions'
/**
 * Configures a Flux Standard Action creator injected with the libraries dispatcher and context.
 * @example <caption>Exports a Flux Standard Action creator that takes a handler injected with the libraries dispatcher and context.
 * export const createSomeUserAction = configureDispatcherAction((dispatcher, context) => dispatcher.action.execute('create-some-user-action'))
 * @param  {function} handler: (context, dispatcher) => { ... }
 */
//export const createActionDispatcher = context => handler => store => handler(dispatcher(dispatch, getState), context)


/** Allows the user of lib to define custom redux actions that an action creator retrieved from at a later time via a type map. */
export const createActionBlueprint = (actionName, payloadCreator = args => args, metaCreator = args => args) => createActionType => {
  //console.warn('CREATING ACTION BLUEPRINT', actionName, payloadCreator, metaCreator)
  return createAction(createActionType(actionName), args => payloadCreator(args), args => metaCreator(args))

}

/** Creates a translator that turns actionBlueprints into actionCreators */
export const createBlueprintsTranslator = createActionType => actionBlueprints => {
  assert.ok(actionBlueprints, 'actionBlueprints are required')
  if(Array.isArray(actionBlueprints))
    return actionBlueprints.map(x => actionBlueprints(createActionType))
  assert(typeof actionBlueprints === 'object', 'actionBlueprints must be array or object')
  return Object.keys(actionBlueprints).reduce((actionCreators, x) => {
    actionCreators[x] = actionBlueprints[x](createActionType)
    return actionCreators
  }, {})
}

//export const createDelayableActionBlueprint = (actionName, payloadCreator, metaCreator) => delay => createActionBlueprint(actionName, payloadCreator, meta => Object.assign(metaCreator(meta), { delay }))

// metaCreator(meta) === Object.assign(meta, { delay })
// delayableActionBlueprint(delay) === actionBlueprint

// actionBlueprint(createActionType) === actionCreator

// actionDefinition === { type, payloadCreactor, ?metaCreator }
