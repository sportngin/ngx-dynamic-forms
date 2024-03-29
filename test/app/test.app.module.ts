import { CommonModule } from '@angular/common';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DynamicFormsModule } from '@siplay/ng-dynamic-forms';

import 'rxjs/add/operator/map';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/zone';

import { CheckboxTestComponent }    from './fields/checkbox/checkbox.test.component';
import { ColorPickerTestComponent } from './fields/colorpicker/color.picker.test.component';
import { ColorPreviewComponent }    from './fields/colorpicker/color.preview.component';
import { DatePickerTestComponent }  from './fields/datepicker/date.picker.test.component';
import { DropdownTestComponent }    from './fields/dropdown/dropdown.test.component';
import { FormTestComponent }        from './fields/form/form.test.component';
import { PageTestComponent }        from './fields/page/page.test.component';
import { ListTestComponent }        from './fields/list/list.test.component';
import { PasswordTestComponent }    from './fields/password/password.test.component';

import { TestFieldsComponent }      from './fields/test.fields.component';
import { TestFieldsHomeComponent }  from './fields/test.fields.home.component';

import { PrivacyFieldComponent }    from './privacy.field.component';
import { SUBMIT_ERROR_BEHAVIOR }    from './submit.error.behavior';

import { TestAppComponent }         from './test.app.component';
import { routing, routingProviders } from './test.app.routing';

import { TestHomeComponent }        from './test.home.component';

@NgModule({
    bootstrap:      [ TestAppComponent ],
    entryComponents: [
        ColorPreviewComponent,
        PrivacyFieldComponent
    ],
    declarations:   [
        TestAppComponent,
        TestHomeComponent,

        ColorPreviewComponent,
        PrivacyFieldComponent,

        TestFieldsComponent,
        TestFieldsHomeComponent,
        FormTestComponent,
        PageTestComponent,
        CheckboxTestComponent,
        ColorPickerTestComponent,
        DatePickerTestComponent,
        DropdownTestComponent,
        ListTestComponent,
        PasswordTestComponent
    ],
    imports:        [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DynamicFormsModule.withConfig({
            behaviors: [
                SUBMIT_ERROR_BEHAVIOR
            ],
            mappings: {
                members: [
                    { type: 'color-preview', component: ColorPreviewComponent },
                    { type: 'privacy', component: PrivacyFieldComponent }
                ]
            }
        }),
        routing
    ],
    providers:      [
        routingProviders
    ]
})
export class TestAppModule { }
