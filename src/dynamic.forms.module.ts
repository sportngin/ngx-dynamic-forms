import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { BehaviorService } from './behavior';

import {
    ComponentManager, DynamicFormComponent, FormEventManager, PlaceholderComponent, ValidatorDisplay
} from './component';

import {
    configFactory, DYNAMIC_FORMS_CONFIG, DYNAMIC_FORMS_DEFAULT_CONFIG,
    DYNAMIC_FORMS_USER_CONFIG, DynamicFormsConfig, ElementTypeMappings, MemberTypeMappings
} from './config';

// this must be imported separately instead of using the index module to avoid circular dependencies
import { DEFAULT_CONFIG } from './config/dynamic.forms.default.config';

import {
    ButtonComponent, DynamicMemberComponent, InlineElementComponent, MemberDisplayComponent,
    MemberLabelComponent, FormPageRootComponent, LayoutComponent, TipComponent
} from './component/element';

import {
    CheckboxFieldComponent, ColorPickerComponent, DatePickerComponent, DropdownFieldComponent,
    PasswordFieldComponent, FormPageComponent, GroupFieldComponent, ListFieldComponent,
    ListFieldEntryComponent, ListFieldEntryDirective, ListFieldEntryEditableComponent,
    ListFieldHeaderComponent, TextFieldComponent
} from './component/member';

@NgModule({
    declarations:   [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFormComponent,
        DynamicMemberComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InlineElementComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryComponent,
        ListFieldEntryDirective,
        ListFieldEntryEditableComponent,
        ListFieldHeaderComponent,
        MemberDisplayComponent,
        MemberLabelComponent,
        PasswordFieldComponent,
        PlaceholderComponent,
        TextFieldComponent,
        TipComponent
    ],
    exports: [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicFormComponent,
        DynamicMemberComponent,
        MemberDisplayComponent,
        MemberLabelComponent,
        FormPageComponent,
        FormPageRootComponent,
        GroupFieldComponent,
        InlineElementComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryDirective,
        ListFieldEntryEditableComponent,
        ListFieldHeaderComponent,
        PasswordFieldComponent,
        TextFieldComponent,
        TipComponent
    ],
    entryComponents: [
        ButtonComponent,
        CheckboxFieldComponent,
        ColorPickerComponent,
        DatePickerComponent,
        DropdownFieldComponent,
        DynamicMemberComponent,
        MemberDisplayComponent,
        MemberLabelComponent,
        FormPageRootComponent,
        FormPageComponent,
        GroupFieldComponent,
        InlineElementComponent,
        LayoutComponent,
        ListFieldComponent,
        ListFieldEntryComponent,
        ListFieldHeaderComponent,
        PasswordFieldComponent,
        PlaceholderComponent,
        TextFieldComponent,
        TipComponent
    ],
    imports:        [
        ColorPickerModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers:      [
        BehaviorService,
        ComponentManager,
        ElementTypeMappings,
        FormEventManager,
        MemberTypeMappings,
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
