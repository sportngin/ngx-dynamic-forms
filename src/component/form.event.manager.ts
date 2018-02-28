import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Initialized } from './initialized';

@Injectable()
export class FormEventManager {

    private registered: number = 0;
    private initialized: number = 0;

    public readonly ready: EventEmitter<number> = new EventEmitter();
    public readonly formInit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor() {
        console.log('[FormEventManager] ctr');
    }

    public registerControl(component: Initialized) {
        this.registered++;
        const sub = component.initialized.subscribe(() => {
            this.onInitialized();
            sub.unsubscribe();
        })
    }

    public registerForm(form: FormGroup) {
        console.log('[FormEventManager] registerForm', form);
        this.formInit.next(form);
    }

    private onInitialized() {
        this.initialized++;
        if (this.initialized === this.registered) {
            console.log('[FormEventManager] ready', this.initialized);
            this.ready.next(this.initialized);
        }
    }

}
