import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { BehaviorType }     from './behavior.type';

export type BehaviorFn = (form: AbstractControl, ...args: string[]) => any;

export type BehaviorFnAccessor<T> = (handler: T) => BehaviorFn;

export interface Behavior {

    type: BehaviorType | string,
    token: InjectionToken<any>;
    accessor: BehaviorFnAccessor<any>

}

export function behavior<T>(type: BehaviorType | string, token: InjectionToken<T>, accessor: BehaviorFnAccessor<T>): Behavior {
    return { type, token, accessor };
}