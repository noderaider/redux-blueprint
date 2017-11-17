import * as reduxBlueprint from "../";

describe("createBlueprint", () => {
    test("doesn't bomb", () => {
        const createActionType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`;
        let blueprint = reduxBlueprint.createBlueprint("MOUSE_EVENT", (x, y) => ({x, y}), eventType => ({ eventType }));
        let actionCreator = blueprint(createActionType);
        expect(actionCreator).toBeDefined();
    });
});