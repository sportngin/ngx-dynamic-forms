import { Component, EventEmitter, Injector, Input, OnInit, Output, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData } from './element.data';
import { FormComponentHost }    from '../form.component.host';
import { HostedElement }        from '../hosted.element';
import { ModelControl }         from '../model/control/model.control';
import { RootPageControl }      from '../model/control/page.control';

@Component({
    selector: 'form-page-root',
    templateUrl: './form.page.root.pug'
})
export class FormPageRootComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() formGroup: FormGroup;
    @Input() control: RootPageControl;

    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    private _currentPage: number = 0;

    get currentPage(): number {
        return this._currentPage;
    }
    set currentPage(currentPage: number) {
        if (currentPage !== this._currentPage) {
            this._currentPage = currentPage;
            this.pageChanged.next(this._currentPage);
            if (this.control.updatePage) {
                this.control.updatePage(this._currentPage);
            }
        }
    }

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(elementData, injector, (injector as any).view.component.host);
    }

    ngOnInit(): void {
        this.control.startPage.subscribe(startPage => {
            if (typeof startPage === 'number') {
                this._currentPage = startPage;
            } else if (!isNaN(startPage)) {
                this._currentPage = parseInt(startPage, 10);
            } else {
                this._currentPage = 0;
            }
        });
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