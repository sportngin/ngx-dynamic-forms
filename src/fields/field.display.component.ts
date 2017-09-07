import { Component, Inject, Injector } from '@angular/core';

import { ElementData }    from '../elements/element.data';
import { HostedElement }                from '../hosted.element';

@Component({
    selector: 'field-display',
    templateUrl: 'field.display.component.pug'
})
export class FieldDisplayComponent extends HostedElement {

    get displayValue(): string {
        if (!this.control.name) {
            return null;
        }
        let formControl = this.form.controls[this.control.name];
        if (!formControl) {
            return null;
        }
        if (formControl['displayValue']) {
            return formControl['displayValue'];
        }
        return this.form.value[this.control.name];
    }

    constructor(
        elementData: ElementData,
        injector: Injector) {
        super(elementData, injector);
    }

}