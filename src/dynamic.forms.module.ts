import { CommonModule }                     from '@angular/common';
import { ModuleWithProviders, NgModule }    from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { DynamicFormComponent }     from './dynamic.form.component';
import { FormControlTypeMappings }  from './form.control.type';
import { FormPageComponent }        from './form.page.component';
import { FormPageRootComponent }    from './form.page.root.component';
import { LayoutComponent }          from './layout.component';
import { PositionPipe }             from './position.pipe';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { CheckboxFieldComponent }   from './fields/checkbox.field.component';
import { ColorPickerComponent }     from './fields/color.picker.component';
import { DatePickerComponent }      from './fields/date.picker.component';
import { DropdownFieldComponent }   from './fields/dropdown.field.component';
import { DynamicFieldComponent }    from './fields/dynamic.field.component';
import { InputSelectorComponent }   from './fields/input.selector.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { ListFieldEntryDirective }  from './fields/list.field.entry.directive';
import { PasswordFieldComponent }   from './fields/password.field.component';
import { TextFieldComponent }       from './fields/text.field.component';

@NgModule({
    declarations:   [
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFieldComponent,
        DynamicFormComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InputSelectorComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
        PasswordFieldComponent,
        PositionPipe,
        TextFieldComponent
    ],
    exports: [
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFieldComponent,
        DynamicFormComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InputSelectorComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
        PasswordFieldComponent,
        PositionPipe,
        TextFieldComponent
    ],
    entryComponents: [
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        GroupFieldComponent,
        ListFieldComponent,
        PasswordFieldComponent,
        TextFieldComponent
    ],
    imports:        [
        ColorPickerModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers:      [
        FormControlTypeMappings
    ]
})
export class DynamicFormsModule {

    static withConfig(userConfig: DynamicFormsConfig): ModuleWithProviders {
        return {
            ngModule: DynamicFormsModule,
            providers: [
                { provide: DYNAMIC_FORMS_CONFIG, useValue: userConfig }
            ]
        }
    }

}