import { NO_ERRORS_SCHEMA }                 from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as moment from 'moment';

import { FORM_COMPONENT_HOST_PROVIDERS } from '../../../test/fixtures';

import { DatePickerComponent }  from './date.picker.component';

describe('DatePickerComponent', () => {

    let comp: DatePickerComponent;
    let fixture: ComponentFixture<DatePickerComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ DatePickerComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                FORM_COMPONENT_HOST_PROVIDERS
            ]
        })
        /**
         * Compile template and css
         */
            .compileComponents();
    }));

    /**
     * Synchronous beforeEach
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        comp    = fixture.componentInstance;

        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });

    it('', () => {

        comp.dateForm.setValue({
            year: 2011,
            month: 0,
            day: 0
        });

        fixture.detectChanges();

        expect(comp.formControl.value).toBe(moment(new Date(2011, 0, 1)));

    });

});