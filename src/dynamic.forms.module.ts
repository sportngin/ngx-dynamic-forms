import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { BehaviorService } from './behavior';

import { ComponentManager, DynamicFormComponent, PlaceholderComponent, ValidatorDisplay } from './component';

import {
    configFactory, DEFAULT_CONFIG, DYNAMIC_FORMS_CONFIG, DYNAMIC_FORMS_DEFAULT_CONFIG,
    DYNAMIC_FORMS_USER_CONFIG, DynamicFormsConfig, ElementTypeMappings, MemberTypeMappings
} from './config';

import {
    ButtonComponent, DynamicMemberComponent, MemberDisplayComponent, MemberLabelComponent,
    FormPageRootComponent, LayoutComponent, TipComponent
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