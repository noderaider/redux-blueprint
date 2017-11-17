/// <reference types="redux-actions" />

declare namespace ReduxBlueprint {
    interface PayloadCreator {
        (...args: any[]): any;
    }

    interface MetaCreator {
        (...args: any[]): any;
    }

    interface Blueprints {
        [name: string]: Blueprint;
    }

    interface Blueprint {
        (translateBlueprintType: ReduxBlueprint.TranslateBlueprintType): ActionCreator;
    }

    interface TranslateBlueprintType {
        (blueprintType: string): string;
    }

    interface ActionCreator {
        (...args: any[]): ReduxActions.ActionMeta<any, any>;
    }
}