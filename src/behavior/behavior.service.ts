import { Inject, Injectable, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from '../config/dynamic.forms.config';
import { Behavior, BehaviorFn } from './behavior';
import { BehaviorType }         from './behavior.type';

let behaviors: { [key: string]: Behavior } = {};

@Injectable()
export class BehaviorService {

    constructor(@Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig) {
        config.behaviors.forEach(behavior => {
            behaviors[behavior.type] = behavior;
        });
    }

    private getBehavior(type: BehaviorType | string, optional: boolean): Behavior {
        let behavior = behaviors[type];

        if (!behavior) {
            if (!optional) {
                console.error('No handler has been configured for behavior type', type);
            }
            return null;
        }
        return behavior;
    }

    private getBehaviorHandlerFn(behavior: Behavior, handler: any): BehaviorFn {
        return (form: AbstractControl, ...args: string[]) => behavior.accessor(handler).call(handler, form, ...args);
    }

    public getBehaviorHandler(injector: Injector, type: BehaviorType | string, optional: boolean): BehaviorFn {

        let behavior = this.getBehavior(type, optional);
        if (!behavior) {
            return null;
        }
        let handler = injector.get(behavior.token, optional ? Injector.NULL : Injector.THROW_IF_NOT_FOUND);

        if (handler === Injector.NULL) {
            return null;
        }

        return this.getBehaviorHandlerFn(behavior, handler);
    }

    public getHandler(type: BehaviorType | string, handler: any, optional: boolean): BehaviorFn {
        let behavior = this.getBehavior(type, optional);
        return this.getBehaviorHandlerFn(behavior, handler);
    }

}