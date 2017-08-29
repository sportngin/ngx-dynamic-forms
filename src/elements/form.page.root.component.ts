import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

import { HostedElement }    from '../hosted.element';
import { ModelControl }     from '../model/control/model.control';
import { RootPageControl }  from '../model/control/page.control';
import { ElementData }      from './element.data';

@Component({
    selector: 'form-page-root',
    templateUrl: './form.page.root.component.pug'
})
export class FormPageRootComponent extends HostedElement<RootPageControl> implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

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
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
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