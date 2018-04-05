import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup }                from '@angular/forms';

import { Initialized } from './initialized';

@Injectable()
export class FormEventManager {

    private controlsRegistered: number = 0;
    private controlsInitialized: number = 0;

    public readonly controlsReady: EventEmitter<number> = new EventEmitter();
    public readonly forms: FormGroup[] = [];

    public registerControl(component: Initialized) {
        this.controlsRegistered++;
        const sub = component.initialized.subscribe(() => {
            this.onInitialized();
            sub.unsubscribe();
        })
    }

    public registerForm(form: FormGroup) {
        this.forms.push(form);
    }

    private onInitialized() {
        this.controlsInitialized++;
        if (this.controlsInitialized === this.controlsRegistered) {
            this.controlsReady.next(this.controlsInitialized);
        }
    }

}
