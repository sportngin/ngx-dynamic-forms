import { DebugElement, NO_ERRORS_SCHEMA }   from '@angular/core';
import { ComponentFixture, TestBed }        from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';

import { expect } from 'chai';

import * as moment from 'moment';

import { FORM_COMPONENT_HOST_PROVIDERS } from '../../test/fixtures';

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

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [ DatePickerComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                FORM_COMPONENT_HOST_PROVIDERS,
                { provide: 'control', useValue: { disabled: false } }
            ]
        })
            .compileComponents();
    });

    /**
     * Synchronous beforeEach
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        comp    = fixture.componentInstance;
        yearDe  = fixture.debugElement.query(By.css('select:nth-child(1)'));
        monthDe = fixture.debugElement.query(By.css('select:nth-child(2)'));
        dayDe   = fixture.debugElement.query(By.css('select:nth-child(3)'));

        expect(fixture.debugElement).not.to.be.null;
        expect(yearDe).not.to.be.null;
        expect(monthDe).not.to.be.null;
        expect(dayDe).not.to.be.null;

        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });

    it('provides an array of month objects with the name and zero-based index of each month', () => {

        expect(comp.months).not.to.be.undefined;
        expect(comp.months).not.to.be.null;
        expect(comp.months[0].value).to.equal(month.january);
        expect(comp.months[0].name).to.equal('January');

    });

    it('populates the year select element with the current year back 100 years', () => {

        let currentYear = new Date().getFullYear();
        expect(yearDe.children.length).to.equal(100);
        expect(yearDe.children[0].nativeElement.value).to.equal(currentYear.toString());
        expect(yearDe.children[99].nativeElement.value).to.equal((currentYear - 99).toString());

    });

    it('leaves the month and day elements initially unpopulated', () => {

        // expect(monthDe.children.length).to.equal(0, 'Month selector was populated');
        expect(dayDe.children.length).to.equal(0, 'Day selector was populated');

    });

    function testDate(year, month, day) {
        let input = { year, month, day };
        let expected = moment(new Date(year, month, day));
        if (!expected.isValid()) {
            throw new Error('Attempted to test invalid date');
        }
        comp.dateForm.setValue(input);

        expect(comp.formControl.value.toString()).to.equal(expected.toString());
    }

    it('converts the date form input to the correct date value', () => {

        testDate(2011, month.january, 1);
        testDate(2011, month.december, 31);
        testDate(2010, month.april, 29);

    });

    it('defaults to the nearest valid date a month is selected which does not have the same number of days as the month previously selected', () => {

        testDate(2011, month.july, 31);
        comp.dateForm.controls.month.setValue(month.june);

        expect(comp.formControl.value.toString()).to.equal(moment([2011, month.june, 30]).toString());

    });

});