/// <reference types="redux-actions" />

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
    (translateBlueprintType: TranslateBlueprintType): ActionCreator;
}

interface TranslateBlueprintType {
    (blueprintType: string): string;
}

interface ActionCreator {
    (...args: any[]): ReduxActions.ActionMeta<any, any>;
}