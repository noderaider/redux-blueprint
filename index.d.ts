/// <reference types="redux-actions" />

export as namespace ReduxBlueprint;

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

export function createBlueprint(blueprintType: string, payloadCreator?: ReduxBlueprint.PayloadCreator, metaCreator?: ReduxBlueprint.MetaCreator): ReduxBlueprint.Blueprint;
export function translateBlueprintTypesWith(translateBlueprintType: ReduxBlueprint.TranslateBlueprintType): any;
export function translateBlueprintsWith(translateBlueprintType: ReduxBlueprint.TranslateBlueprintType): any;