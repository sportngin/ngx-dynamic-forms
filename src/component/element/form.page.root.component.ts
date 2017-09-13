import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

import { RootPageElement }      from '../../model/element';
import { PageMember }           from '../../model/member';
import { ElementData }          from '../element.data';
import { FormControlComponent } from '../form.control.component';

@Component({
    selector: 'form-page-root',
    templateUrl: './form.page.root.component.pug'
})
export class FormPageRootComponent extends FormControlComponent<RootPageElement> implements OnInit {

    get children(): PageMember[] { return this.element ? this.element.children : null; }

    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    private _currentPage: number = 0;

    get currentPage(): number {
        return this._currentPage;
    }
    set currentPage(currentPage: number) {
        if (currentPage !== this._currentPage) {
            this._currentPage = currentPage;
            this.pageChanged.next(this._currentPage);
            if (this.element.updatePage) {
                this.element.updatePage(this._currentPage);
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
        this.element.startPage.subscribe(startPage => {
            if (typeof startPage === 'number') {
                this._currentPage = startPage;
            } else if (!isNaN(startPage)) {
                this._currentPage = parseInt(startPage, 10);
            } else {
                this._currentPage = 0;
            }
        });
    }

    isPageValid(pageIndex: number): boolean {
        let pageControl = this.children[pageIndex];
        let pageForm = this.form.controls[pageControl.name];
        return pageForm.valid;
    }

    nextPage(): void {
        if (!this.isPageValid(this.currentPage)) {
            return;
        }
        if (this.currentPage < this.children.length - 1) {
            this.currentPage++;
        }
    }

    prevPage(): void {
        if (!this.isPageValid(this.currentPage)) {
            return;
        }
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }
}