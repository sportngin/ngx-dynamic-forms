import { Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { ELEMENT_TIP, ModelElementTip } from '../../model/element/model.element.tip';
import { FormElementComponent } from '../form.element.component';
import { ElementData }          from '../element.data';

@Component({
    selector: 'element-tip',
    templateUrl: './tip.component.pug',
    styleUrls: ['./tip.component.scss'],
    encapsulation: ViewEncapsulation.None
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
        this.addCssClass(`element-${this.tip.tipType}`);
        this.addCssClass(`element-tip-${this.tip.position}`);
        this.addCssClass(`element-tip-align-${this.tip.alignment}`);
    }

    public get checkedElement(): ModelElementTip {
        return this.tip;
    }

}