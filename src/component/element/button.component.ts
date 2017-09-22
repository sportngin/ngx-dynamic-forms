import { AfterViewInit, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ButtonAction, ButtonControl }  from '../../model/element';
import { ElementSiblingPosition }       from '../../model/element.sibling.position';
import { ElementData }                  from '../element.data';
import { FormControlComponent }         from '../form.control.component';

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

    public handleBehavior(behaviorAndArgs: string, form: AbstractControl, defaultValue?: any): any {
        if (behaviorAndArgs === ButtonAction.submit) {
            // form submit events are handled directly by the form's onSubmit binding
            // we don't need to handle it separately here - it would duplicate any processing
            return false;
        }
        return super.handleBehavior(behaviorAndArgs, form, defaultValue);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.element.textSiblings) {
            this.insertComponents([
                ...this.controlManager.createSiblings(this.getControlContainer(this.prependTextContainer), this.element.textSiblings, false, ElementSiblingPosition.before),
                ...this.controlManager.createSiblings(this.getControlContainer(this.appendTextContainer), this.element.textSiblings, false, ElementSiblingPosition.after)
            ]);
        }
    }

}