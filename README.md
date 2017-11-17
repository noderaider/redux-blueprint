# redux-blueprint

Redux abstractions for actions.

[![NPM](https://nodei.co/npm/redux-blueprint.png?stars=true&downloads=true)](https://nodei.co/npm/redux-blueprint/)


`npm i -S redux-blueprint`

## Definitions

`Action Blueprint: A function that accepts an action type creator and returns an action creator.`

`Action Type Creator: A function that accepts an action name and returns an action type.`

## Usage

```ts

```

## Reason

When writing a redux library, it is not always a great idea to hardcode every action type as a constant. This would lead to libraries only supporting singleton implementations. If one redux library uses another one, and the action types are not namespaced, the reducers will collide and it will all blow up.

This library allows *blueprints* to be generated that can be later resolved to redux-actions action creators at app run time.

The name for redux-actions createAction function should technically be createActionCreator. The technical name for createBlueprint would have been createActionCreatorCreator.