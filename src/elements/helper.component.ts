import { Component, Inject, Injector, OnInit } from '@angular/core';

import { HostedElement } from '../hosted.element';
import { ELEMENT_HELPER, ElementHelper } from '../model/model.element';
import { ELEMENT_DATA, ElementData } from './element.data';

@Component({
    selector: 'p [element-helper]',
    templateUrl: './helper.component.pug'
})
export class HelperComponent extends HostedElement implements OnInit {

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        @Inject(ELEMENT_HELPER) public helper: ElementHelper,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    public ngOnInit(): void {
        this.addCssClass(...this.helper.cssClasses);
    }

    protected get checkedControl(): ElementHelper {
        return this.helper;
    }

}