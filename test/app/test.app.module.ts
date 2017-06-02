import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs/add/operator/map';

import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { BrowserModule }        from '@angular/platform-browser';

import { DynamicFormsModule }   from 'ng-dynamic-forms';

import { TestAppComponent }             from './test.app.component';
import { routing, routingProviders }    from './test.app.routing';

import { TestHomeComponent }        from './test.home.component';

import { TestFieldsComponent }      from './fields/test.fields.component';
import { TestFieldsHomeComponent }  from './fields/test.fields.home.component';
import { CheckboxTestComponent }    from './fields/checkbox/checkbox.test.component';
import { ColorPickerTestComponent } from './fields/colorpicker/color.picker.test.component';
import { DatePickerTestComponent }  from './fields/datepicker/date.picker.test.component';
import { DropdownTestComponent }    from './fields/dropdown/dropdown.test.component';

@NgModule({
    bootstrap:      [ TestAppComponent ],
    declarations:   [
        TestAppComponent,
        TestHomeComponent,

        TestFieldsComponent,
        TestFieldsHomeComponent,
        CheckboxTestComponent,
        ColorPickerTestComponent,
        DatePickerTestComponent,
        DropdownTestComponent
    ],
    imports:        [
        BrowserModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        routing
    ],
    providers:      [
        routingProviders
    ]
})
export class TestAppModule { }