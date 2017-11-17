/// <reference types="redux-actions" />

export interface PayloadCreator {
    (...args: any[]): any;
}

export interface MetaCreator {
    (...args: any[]): any;
}

export interface Blueprints {
    [name: string]: Blueprint;
}

export interface Blueprint {
    (translateBlueprintType: TranslateBlueprintType): ActionCreator;
}

export interface TranslateBlueprintType {
    (blueprintType: string): string;
}

export interface ActionCreator {
    (...args: any[]): ReduxActions.ActionMeta<any, any>;
}