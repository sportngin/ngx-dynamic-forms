import { DynamicFormsConfig } from './dynamic.forms.config';

import { BUILT_IN_BEHAVIORS } from '../behavior/behaviors';

import { ElementTipAlignment } from '../model';
import { ElementType, ElementToolTipOptions, ElementSiblingTipOptions } from '../model/element';
import { MemberType, ValidationDisplayMode } from '../model/member';

import {
    ButtonComponent, DynamicMemberComponent, LayoutComponent, FormPageRootComponent, InlineElementComponent,
    TipComponent
} from '../component/element';

import {
    CheckboxFieldComponent, ColorPickerComponent, DatePickerComponent, DropdownFieldComponent,
    FormPageComponent, GroupFieldComponent, TextFieldComponent, ListFieldComponent, PasswordFieldComponent
} from '../component/member';

import { PlaceholderComponent } from '../component/placeholder.component';

export const DEFAULT_CONFIG: DynamicFormsConfig = {
    behaviors: BUILT_IN_BEHAVIORS,
    defaultOptions: {
        'member':       { validationDisplay: ValidationDisplayMode.both },
        'member-validation-message': new ElementToolTipOptions({
            cssClasses: ['element-tip-danger'],
            alignment: ElementTipAlignment.right
        }),
        'sibling-tip':  new ElementSiblingTipOptions(),
        'tool-tip':     new ElementToolTipOptions(),
        'button-submit': {
            disableWhenInvalid: true
        }
    },
    mappings: {
        elements: [
            { type: ElementType.button,     component: ButtonComponent },
            { type: ElementType.inline,     component: InlineElementComponent },
            { type: ElementType.input,      component: DynamicMemberComponent },
            { type: ElementType.layout,     component: LayoutComponent },
            { type: ElementType.page,       component: FormPageComponent },
            { type: ElementType.pageRoot,   component: FormPageRootComponent },
            { type: ElementType.placeholder, component: PlaceholderComponent },
            { type: ElementType.tip,        component: TipComponent }
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