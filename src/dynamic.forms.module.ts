import { CommonModule }                     from '@angular/common';
import { ModuleWithProviders, NgModule }    from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { BehaviorService }      from './behavior/behavior.service';
import { DynamicFormComponent } from './dynamic.form.component';
import { ElementTypeMappings }  from './element.type.mappings';
import { FieldTypeMappings }    from './field.type.mappings';
import { PositionPipe }         from './position.pipe';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { ButtonComponent }          from './elements/button.component';
import { ButtonTypeMappings }       from './elements/button.type';
import { ElementSelectorComponent } from './elements/element.selector.component';
import { FormPageComponent }        from './elements/form.page.component';
import { FormPageRootComponent }    from './elements/form.page.root.component';
import { LayoutComponent }          from './elements/layout.component';
import { SubmitButtonComponent }    from './elements/submit.button.component';

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
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFieldComponent,
        DynamicFormComponent,
        ElementSelectorComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InputSelectorComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
        PasswordFieldComponent,
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
        DynamicFieldComponent,
        DynamicFormComponent,
        ElementSelectorComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InputSelectorComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
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
        GroupFieldComponent,
        InputSelectorComponent,
        LayoutComponent,
        ListFieldComponent,
        PasswordFieldComponent,
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
        ElementTypeMappings,
        FieldTypeMappings
    ]
})
export class DynamicFormsModule {

    static withConfig(userConfig: DynamicFormsConfig): ModuleWithProviders {
        return {
            ngModule: DynamicFormsModule,
            providers: [
                { provide: DYNAMIC_FORMS_CONFIG, useValue: userConfig }
            ]
        };
    }

}