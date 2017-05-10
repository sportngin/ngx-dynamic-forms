import { Component, Host, Injector, Input, OnInit } from '@angular/core';
import { FormGroup }                                from '@angular/forms';

import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { PageControl }          from './model/control/page.control';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: 'form-page',
    templateUrl: './form.page.pug.html'
})
export class FormPageComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() formGroup: FormGroup;
    @Input() control: PageControl;

    currentPage: number = 0;

    isRootPage: boolean;

    constructor(
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(injector, (injector as any).view.component.host);
    }

    ngOnInit(): void {
        this.isRootPage = this.control.pageIndex === null;
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