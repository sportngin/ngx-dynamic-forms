import { NgModuleRef }      from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { FormEventManager }             from '@siplay/ng-dynamic-forms';
import { ReactiveFormsHmrSynchronizer } from '@siplay/ng-project-util/hmr';

import 'rxjs/add/operator/toPromise';

export class DynamicFormsHmrSynchronizer extends ReactiveFormsHmrSynchronizer {

    private formEventManager: FormEventManager;

    private _ready: Promise<any>;
    public get ready(): Promise<any> {
        return this._ready;
    }

    protected get forms(): FormGroup[] {
        if (!this.formEventManager) {
            return null;
        }
        return this.formEventManager.forms;
    }

    constructor(
        appModuleRef: NgModuleRef<any>,
        moduleRef: NgModuleRef<any>,
    ) {
        super(appModuleRef, moduleRef);
        this.formEventManager = moduleRef.injector.get(FormEventManager, null);
        if (this.formEventManager) {
            this._ready = new Promise(resolve => {
                const sub = this.formEventManager.controlsReady.subscribe(() => {
                    resolve();
                    sub.unsubscribe();
                });
            });
        } else {
            console.log('no formEventManager');
            this._active = null;
            this._ready = Promise.resolve();
            this.appModuleRef = null;
            this.moduleRef = null;
        }
    }

}
