import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';

import { ELEMENT_HELPER, ElementHelper } from '../model/model.element';

@Component({
    selector: 'p [element-helper]',
    templateUrl: './helper.component.pug'
})
export class HelperComponent {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    constructor(
        @Inject(ELEMENT_HELPER) public helper: ElementHelper
    ) {

    }

}