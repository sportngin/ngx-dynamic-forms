import { Component, Host, Injector, Input } from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { RootPageControl }      from './model/control/page.control';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: 'form-page-root',
    templateUrl: './form.page.root.pug'
})
export class FormPageRootComponent extends HostedElement {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() formGroup: FormGroup;
    @Input() control: RootPageControl;

    currentPage: number = 0;

    constructor(
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(injector, (injector as any).view.component.host);

        console.log('FormPageRootComponent', this);
    }

    nextPage(): void {
        if (this.currentPage < this.childControls.length - 1) {
            this.currentPage++;
        }
    }

    prevPage(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }
}