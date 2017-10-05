import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { behaviorProvider, BehaviorType, IsRenderedHandler, PageNextHandler, PagePrevHandler } from '../../behavior';
import { ButtonControl, RootPageElement }   from '../../model/element';
import { PageMember }                       from '../../model/member';

import { ComponentInfo }        from '../component.info';
import { ElementData }          from '../element.data';
import { ParentComponent }      from '../parent.component';

@Component({
    selector: 'form-page-root',
    templateUrl: './form.page.root.component.pug',
    viewProviders: [
        behaviorProvider(FormPageRootComponent, BehaviorType.isRendered),
        behaviorProvider(FormPageRootComponent, BehaviorType.pageNext),
        behaviorProvider(FormPageRootComponent, BehaviorType.pagePrev)
    ]
})
export class FormPageRootComponent extends ParentComponent<RootPageElement> implements OnInit, IsRenderedHandler, PageNextHandler, PagePrevHandler {

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
            this.focusFirstInput();
            if (this.element.updatePage) {
                this.element.updatePage(this._currentPage);
            }
        }
    }

    private prevButton: ComponentInfo;
    private nextButton: ComponentInfo;

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

    public onPageNext(): void {
        this.nextPage();
    }

    public onPagePrev(): void {
        this.prevPage();
    }

    private createButtonComponent(button: ButtonControl): ComponentInfo {
        let componentType = this.getComponentType(button);
        return this.createComponent(button, componentType, [
            { provide: ElementData, useValue: this.getElementData(button) }
        ]);
    }

    public createChildComponents(): ComponentInfo[] {
        return [
            this.prevButton = this.createButtonComponent(this.element.prevButton),
            this.nextButton = this.createButtonComponent(this.element.nextButton)
        ];
    }

    public isChildRendered(form: AbstractControl, key?: string): boolean {
        switch (key) {
            case 'prev': return this.currentPage > 0;
            case 'next': return this.currentPage < this.children.length - 1;
        }
        return true;
    }
}