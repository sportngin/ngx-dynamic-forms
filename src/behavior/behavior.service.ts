import { ClassProvider, Injectable, Injector } from '@angular/core';

import { Behavior, BehaviorType, BehaviorFnAccessor, BehaviorFn, BUILT_IN_BEHAVIORS, behavior } from './behaviors';
import { AbstractControl } from '@angular/forms';

let behaviors: { [key: string]: Behavior } = {};

export class BehaviorServiceConfig implements ClassProvider {

    public with<T>(type: BehaviorType | string, accessor: BehaviorFnAccessor<T>): BehaviorServiceConfig {
        behaviors[type] = behavior<T>(type, accessor);
        return this;
    }

    public readonly provide = BehaviorService;
    public readonly useClass = BehaviorService;

}

@Injectable()
export class BehaviorService {

    constructor() {
        BUILT_IN_BEHAVIORS.forEach(behavior => {
            behaviors[behavior.type] = behavior;
        });
    }

    public static with<T>(type: BehaviorType | string, accessor: BehaviorFnAccessor<T>): BehaviorServiceConfig {
        return new BehaviorServiceConfig().with<T>(type, accessor);
    }

    public getBehaviorHandler(injector: Injector, type: BehaviorType | string, optional: boolean): BehaviorFn {
        let behavior = behaviors[type];

        if (!behavior) {
            if (!optional) {
                console.error('No handler has been configured for behavior type', type);
            }
            return;
        }

        let handler = injector.get(behavior.token, optional ? Injector.NULL : Injector.THROW_IF_NOT_FOUND);

        if (handler === Injector.NULL) {
            return null;
        }

        return (form: AbstractControl, ...args: string[]) => behavior.accessor(handler).call(handler, form, ...args);
    }

}