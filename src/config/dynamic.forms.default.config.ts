import { DynamicFormsConfig }       from './dynamic.forms.config';

import { BUILT_IN_BEHAVIORS }       from '../behavior/behaviors';

import { ElementType }              from '../model/element';
import { MemberType }               from '../model/member';

import {
    ButtonComponent, DynamicMemberComponent, LayoutComponent, FormPageRootComponent
} from '../component/element';

import {
    CheckboxFieldComponent, ColorPickerComponent, DatePickerComponent, DropdownFieldComponent,
    FormPageComponent, GroupFieldComponent, TextFieldComponent, ListFieldComponent, PasswordFieldComponent
} from '../component/member';

export const DEFAULT_CONFIG: DynamicFormsConfig = {
    behaviors: BUILT_IN_BEHAVIORS,
    mappings: {
        elements: [
            { type: ElementType.button,     component: ButtonComponent },
            { type: ElementType.input,      component: DynamicMemberComponent },
            { type: ElementType.layout,     component: LayoutComponent },
            { type: ElementType.page,       component: FormPageComponent },
            { type: ElementType.pageRoot,   component: FormPageRootComponent }
        ],
        members: [
            { type: MemberType.checkbox,    component: CheckboxFieldComponent },
            { type: MemberType.color,       component: ColorPickerComponent },
            { type: MemberType.date,        component: DatePickerComponent },
            { type: MemberType.dropdown,    component: DropdownFieldComponent },
            { type: MemberType.group,       component: GroupFieldComponent },
            { type: MemberType.hidden,      component: TextFieldComponent },
            { type: MemberType.list,        component: ListFieldComponent },
            { type: MemberType.password,    component: PasswordFieldComponent },
            { type: MemberType.text,        component: TextFieldComponent }
        ]
    }
};