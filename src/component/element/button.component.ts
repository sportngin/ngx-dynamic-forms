import { AfterViewInit, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';

import { ButtonControl }            from '../../model/element';
import { ElementSiblingPosition }   from '../../model/element.sibling.position';
import { ElementData }              from '../element.data';
import { FormControlComponent }     from '../form.control.component';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.pug'
})
export class ButtonComponent extends FormControlComponent<ButtonControl> implements AfterViewInit {

    @ViewChild('prependText', { read: ViewContainerRef }) prependTextContainer: ViewContainerRef;
    @ViewChild('appendText', { read: ViewContainerRef }) appendTextContainer: ViewContainerRef;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    private _htmlElement: HTMLElement;
    protected get htmlElement() {
        if (!this._htmlElement) {
            this._htmlElement = this.elementRef.nativeElement.querySelector('button,input[type="submit"]')
        }
        return this._htmlElement;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        console.log('textSiblings?', this.element.textSiblings);
        if (this.element.textSiblings) {
            this.insertComponents([
                ...this.controlManager.createSiblings(this.getControlContainer(this.prependTextContainer), this.element.textSiblings, false, ElementSiblingPosition.before),
                ...this.controlManager.createSiblings(this.getControlContainer(this.appendTextContainer), this.element.textSiblings, false, ElementSiblingPosition.after)
            ]);
        }
    }

}