import { Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

import { ELEMENT_TIP, ModelElementTip } from '../../model/element/model.element.tip';
import { FormElementComponent } from '../form.element.component';
import { ElementData }          from '../element.data';

@Component({
    selector: 'element-tip"',
    templateUrl: './tip.component.pug',
    styleUrls: ['./tip.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('tipType', [
            transition('void => tool-tip', animate('350ms ease-out', keyframes([
                style({ transform: 'translateY(1rem) scale(0.5)', 'z-index': -1 }),
                style({ transform: 'translateY(-0.5rem) scale(0.5)', 'z-index': -1 }),
                style({ transform: 'translateY(0.35rem) scale(1.1)', 'z-index': 2 }),
                style({ transform: 'translateY(0) scale(1)', 'z-index': 2 }),
            ]))),
            transition('* => void', [animate('1500ms ease-out',
                style({ opacity: 0 })
            )])
        ])
    ]
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