import { NO_ERRORS_SCHEMA }             from '@angular/core';
import { ComponentFixture, TestBed }    from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { By }                           from '@angular/platform-browser';

import { expect } from 'chai';

import { FORM_COMPONENT_HOST_PROVIDERS } from '../../../test/fixtures';

import { FormControlType }      from '../form.control.type';
import { Model }                from '../model/model';
import { ModelHelper }          from '../model/model.helper';
import { ColorPickerComponent } from './color.picker.component';

describe('ColorPickerComponent', () => {

    let formControl: AbstractControl;
    let comp:       ColorPickerComponent;
    let fixture:    ComponentFixture<ColorPickerComponent>;
    let de;

    beforeEach(() => {
        let member = Model.defaultValueMember('color', '#f00', FormControlType.color);
        let control = ModelHelper.modelElementToModelControl(member);
        let fb = new FormBuilder();
        formControl = ModelHelper.modelMemberToFormControl(fb, member);
        TestBed.configureTestingModule({
            declarations: [ ColorPickerComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                FormBuilder,
                FORM_COMPONENT_HOST_PROVIDERS,
                { provide: 'control', useValue: control },
                { provide: 'formControl', useValue: formControl }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorPickerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('input'));
        fixture.detectChanges()
    });

    it('prepopulates the field with a default value if provided', () => {

        de.nativeElement.click();
        expect(formControl.value).to.equal('#f00');
        expect(de.styles['background-color']).to.equal('#f00');

    });

});