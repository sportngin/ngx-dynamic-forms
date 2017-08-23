import { CommonModule }                     from '@angular/common';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { BehaviorService }      from './behavior/behavior.service';
import { ControlManager }       from './control.manager';
import { DynamicFormComponent } from './dynamic.form.component';
import { ElementTypeMappings }  from './element.type.mappings';
import { HelperComponent }      from './elements/helper.component';
import { FieldTypeMappings }    from './field.type.mappings';
import { PlaceholderComponent } from './placeholder.component';
import { PositionPipe }         from './position.pipe';
import { ValidatorDisplay }     from './validator.display';

import {
    DYNAMIC_FORMS_CONFIG, DYNAMIC_FORMS_DEFAULT_CONFIG, DYNAMIC_FORMS_USER_CONFIG,
    DynamicFormsConfig, configFactory
} from './dynamic.forms.config';
import { DEFAULT_CONFIG } from './dynamic.forms.default.config';

import { ButtonComponent }          from './elements/button.component';
import { ButtonTypeMappings }       from './elements/button.type';
import { FormPageComponent }        from './elements/form.page.component';
import { FormPageRootComponent }    from './elements/form.page.root.component';
import { LayoutComponent }          from './elements/layout.component';
import { SubmitButtonComponent }    from './elements/submit.button.component';

import { CheckboxFieldComponent }   from './fields/checkbox.field.component';
import { ColorPickerComponent }     from './fields/color.picker.component';
import { DatePickerComponent }      from './fields/date.picker.component';
import { DropdownFieldComponent }   from './fields/dropdown.field.component';
import { DynamicInputComponent }    from './fields/dynamic.input.component';
import { FieldDisplayComponent }    from './fields/field.display.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { ListFieldEntryComponent }  from './fields/list.field.entry.component';
import { ListFieldEntryDirective }  from './fields/list.field.entry.directive';
import { ListFieldEntryEditableComponent } from './fields/list.field.entry.editable.component';
import { PasswordFieldComponent }   from './fields/password.field.component';
import { TextFieldComponent }       from './fields/text.field.component';

@NgModule({
    declarations:   [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFormComponent,
        DynamicInputComponent,
        FieldDisplayComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        HelperComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryComponent,
        ListFieldEntryDirective,
        ListFieldEntryEditableComponent,
        PasswordFieldComponent,
        PlaceholderComponent,
        PositionPipe,
        SubmitButtonComponent,
        TextFieldComponent
    ],
    exports: [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFormComponent,
        DynamicInputComponent,
        FieldDisplayComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        HelperComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
        ListFieldEntryEditableComponent,
        PasswordFieldComponent,
        PositionPipe,
        SubmitButtonComponent,
        TextFieldComponent
    ],
    entryComponents: [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicInputComponent,
        FieldDisplayComponent,
        FormPageRootComponent,
        FormPageComponent,
        GroupFieldComponent,
        HelperComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryComponent,
        PasswordFieldComponent,
        PlaceholderComponent,
        SubmitButtonComponent,
        TextFieldComponent
    ],
    imports:        [
        ColorPickerModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers:      [
        BehaviorService,
        ButtonTypeMappings,
        ControlManager,
        ElementTypeMappings,
        FieldTypeMappings,
        ValidatorDisplay,
        {
            provide: DYNAMIC_FORMS_DEFAULT_CONFIG, useValue: DEFAULT_CONFIG
        },
        {
            provide: DYNAMIC_FORMS_CONFIG, useFactory: configFactory, deps: [DYNAMIC_FORMS_DEFAULT_CONFIG, [new Optional(), DYNAMIC_FORMS_USER_CONFIG]]
        }
    ]
})
export class DynamicFormsModule {

    static withConfig(userConfig: DynamicFormsConfig): ModuleWithProviders {
        return {
            ngModule: DynamicFormsModule,
            providers: [
                { provide: DYNAMIC_FORMS_USER_CONFIG, useValue: userConfig }
            ]
        };
    }

}