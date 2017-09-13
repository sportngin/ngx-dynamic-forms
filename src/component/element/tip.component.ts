import { Component, Inject, Injector, OnInit } from '@angular/core';

import { ELEMENT_TIP, ModelElementTip } from '../../model/element/model.element.tip';
import { FormElementComponent } from '../form.element.component';
import { ElementData }          from '../element.data';

@Component({
    selector: 'p [element-tip]',
    templateUrl: './tip.component.pug'
})
export class TipComponent extends FormElementComponent implements OnInit {

    constructor(
        elementData: ElementData,
        @Inject(ELEMENT_TIP) public tip: ModelElementTip,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    public ngOnInit(): void {
        this.addCssClass(...this.tip.cssClasses);
    }

    public get checkedElement(): ModelElementTip {
        return this.tip;
    }

}