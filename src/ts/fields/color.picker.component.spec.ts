import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color.picker.component';
import { FORM_COMPONENT_HOST_PROVIDERS } from '../../../test/fixtures';

describe('ColorPickerComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ColorPickerComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                FORM_COMPONENT_HOST_PROVIDERS,
                { provide: 'control', useValue: { disabled: false } }
            ]
        })
            .compileComponents();
    })

    it('prepopulates the field with a default value if provided', () => {



    });

});