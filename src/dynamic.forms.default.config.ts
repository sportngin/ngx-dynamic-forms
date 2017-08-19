import { DynamicFormsConfig }       from './dynamic.forms.config';

import { ElementType }              from './element.type';
import { ButtonComponent }          from './elements/button.component';
import { ButtonType }               from './elements/button.type';
import { FormPageComponent }        from './elements/form.page.component';
import { FormPageRootComponent }    from './elements/form.page.root.component';
import { LayoutComponent }          from './elements/layout.component';
import { SubmitButtonComponent }    from './elements/submit.button.component';

import { FieldType }                from './field.type';
import { CheckboxFieldComponent }   from './fields/checkbox.field.component';
import { ColorPickerComponent }     from './fields/color.picker.component';
import { DatePickerComponent }      from './fields/date.picker.component';
import { DropdownFieldComponent }   from './fields/dropdown.field.component';
import { DynamicInputComponent }    from './fields/dynamic.input.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { PasswordFieldComponent }   from './fields/password.field.component';
import { TextFieldComponent }       from './fields/text.field.component';

export const DEFAULT_CONFIG: DynamicFormsConfig = {
    buttons: [
        { type: ButtonType.button, component: ButtonComponent },
        { type: ButtonType.submit, component: SubmitButtonComponent },
    ],
    elements: [
        { type: ElementType.button,     component: ButtonComponent },
        { type: ElementType.input,      component: DynamicInputComponent },
        { type: ElementType.layout,     component: LayoutComponent },
        { type: ElementType.page,       component: FormPageComponent },
        { type: ElementType.pageRoot,   component: FormPageRootComponent }
    ],
    fields: [
        { type: FieldType.checkbox, component: CheckboxFieldComponent },
        { type: FieldType.color,    component: ColorPickerComponent },
        { type: FieldType.date,     component: DatePickerComponent },
        { type: FieldType.dropdown, component: DropdownFieldComponent },
        { type: FieldType.group,    component: GroupFieldComponent },
        { type: FieldType.hidden,   component: TextFieldComponent },
        { type: FieldType.list,     component: ListFieldComponent },
        { type: FieldType.password, component: PasswordFieldComponent },
        { type: FieldType.text,     component: TextFieldComponent },
    ]
};