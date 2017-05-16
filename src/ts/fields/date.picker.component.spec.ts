import { DebugElement, NO_ERRORS_SCHEMA }   from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';

import * as moment from 'moment';

import { FORM_COMPONENT_HOST_PROVIDERS } from '../../../test/fixtures';

import { DatePickerComponent }  from './date.picker.component';

const month = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11
};

describe('DatePickerComponent', () => {

    let comp:       DatePickerComponent;
    let fixture:    ComponentFixture<DatePickerComponent>;
    let yearDe:     DebugElement;
    let monthDe:    DebugElement;
    let dayDe:      DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ DatePickerComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                FORM_COMPONENT_HOST_PROVIDERS,
                { provide: 'control', useValue: {} }
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
        yearDe  = fixture.debugElement.query(By.css('select:nth-child(1)'));
        monthDe = fixture.debugElement.query(By.css('select:nth-child(2)'));
        dayDe   = fixture.debugElement.query(By.css('select:nth-child(3)'));

        expect(fixture.debugElement).not.toBeNull();
        expect(yearDe).not.toBeNull('year debug element was null');
        expect(monthDe).not.toBeNull('month debug element was null');
        expect(dayDe).not.toBeNull('day debug element was null');

        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });

    it('provides an array of month objects with the name and zero-based index of each month', () => {

        expect(comp.months).toBeDefined();
        expect(comp.months).not.toBeNull();
        expect(comp.months[0].value).toBe(month.january);
        expect(comp.months[0].name).toBe('January');

    });

    it('populates the year select element with the current year back 100 years', () => {

        let currentYear = new Date().getFullYear();
        expect(yearDe.children.length).toBe(100);
        expect(yearDe.children[0].nativeElement.value).toBe(currentYear.toString());
        expect(yearDe.children[99].nativeElement.value).toBe((currentYear - 99).toString());

    });

    function testDate(year, month, day) {
        let input = { year, month, day };
        let expected = moment(new Date(year, month, day));
        if (!expected.isValid()) {
            throw new Error('Attempted to test invalid date');
        }
        comp.dateForm.setValue(input);

        fixture.detectChanges();
        comp.checkForm();

        expect(comp.formControl.value.toString()).toEqual(expected.toString());
    }

    it('converts the date form input to the correct date value', () => {

        testDate(2011, month.january, 1);
        testDate(2011, month.december, 31);
        testDate(2010, month.april, 29);

    });

});