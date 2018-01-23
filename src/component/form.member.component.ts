import { AfterViewInit, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { first } from 'lodash-es';

import { ModelMember }          from '../model/member';
import { FormControlComponent } from './form.control.component';
import { MemberData }           from './member.data';
import { ValidatorDisplay }     from './validator.display';

const INPUT_TAGS = ['input', 'select', 'textarea'];

export abstract class FormMemberComponent<
    TModelMember extends ModelMember = ModelMember,
    TControl extends AbstractControl = FormControl
    > extends FormControlComponent<TModelMember> implements OnInit, AfterViewInit {

    public get formControl(): TControl {
        return this.elementData.formControl as TControl;
    }

    public get validatorSuccess(): boolean {
        return this.validatorDisplay && this.validatorDisplay.isSuccess(this.formControl);
    }

    public get validatorError(): boolean {
        return this.validatorDisplay && this.validatorDisplay.isError(this.formControl);
    }

    private validatorDisplay: ValidatorDisplay;

    constructor(
        public elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);
        this.validatorDisplay = injector.get(ValidatorDisplay);

        let ogNgOnInit = this.ngOnInit.bind(this);
        this.ngOnInit = () => {
            this.init();
            ogNgOnInit();
        }
    }

    protected get htmlElement(): NodeSelector {
        return this.getFirstInput();
    }

    private findElement(tagName: string): HTMLElement {
        return first(this.elementRef.nativeElement.getElementsByTagName(tagName));
    }

    init(): void {
        let input;
        for (let i = 0; i < INPUT_TAGS.length; i++) {
            input = this.findElement(INPUT_TAGS[i]);
            if (input) {
                break;
            }
        }
        if (!input) {
            return;
        }
        this.renderer.setAttribute(input, 'id', this.elementData.elementId);
    }

    ngOnInit(): void {}
}
