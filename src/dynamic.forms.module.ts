import { CommonModule }                     from '@angular/common';
import { ModuleWithProviders, NgModule }    from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { BehaviorService }      from './behavior/behavior.service';
import { DynamicFormComponent } from './dynamic.form.component';
import { ElementTypeMappings }  from './element.type.mappings';
import { HelperComponent }      from './elements/helper.component';
import { FieldTypeMappings }    from './field.type.mappings';
import { PlaceholderComponent } from './placeholder.component';
import { PositionPipe }         from './position.pipe';
import { ValidatorDisplay }     from './validator.display';

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
import { DynamicInputComponent }    from './fields/dynamic.input.component';
import { FieldDisplayComponent }    from './fields/field.display.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { ListFieldEntryComponent }  from './fields/list.field.entry.component';
import { ListFieldEntryDirective }  from './fields/list.field.entry.directive';
import { ListFieldEntryDisplayComponent } from './fields/list.field.entry.display.component';
import { ListFieldEntryEditorComponent } from './fields/list.field.entry.editor.component';
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
        ElementSelectorComponent,
        FieldDisplayComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        HelperComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryComponent,
        ListFieldEntryDirective,
        ListFieldEntryDisplayComponent,
        ListFieldEntryEditorComponent,
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
        ElementSelectorComponent,
        FieldDisplayComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        HelperComponent,
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
        DynamicInputComponent,
        FieldDisplayComponent,
        FormPageRootComponent,
        FormPageComponent,
        GroupFieldComponent,
        HelperComponent,
        LayoutComponent,
        ListFieldComponent,
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
        ElementTypeMappings,
        FieldTypeMappings,
        ValidatorDisplay
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