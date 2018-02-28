import { EventEmitter, Injectable } from '@angular/core';
import { Initialized } from './initialized';

@Injectable()
export class FormEventManager {

    private registered: number = 0;
    private initialized: number = 0;

    public readonly ready: EventEmitter<number> = new EventEmitter();

    public register(component: Initialized) {
        this.registered++;
        const sub = component.initialized.subscribe(() => {
            this.onInitialized();
            sub.unsubscribe();
        })
    }

    private onInitialized() {
        this.initialized++;
        if (this.initialized === this.registered) {
            console.log('[FormEventManager] ready', this.initialized);
            this.ready.next(this.initialized);
        }
    }

}
