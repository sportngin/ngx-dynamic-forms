import { Inject, Injectable, Optional } from '@angular/core';

import { CheckboxFieldComponent }   from './fields/checkbox.field.component';
import { ColorPickerComponent }     from './fields/color.picker.component';
import { DatePickerComponent }      from './fields/date.picker.component';
import { DropdownFieldComponent }   from './fields/dropdown.field.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { PasswordFieldComponent }   from './fields/password.field.component';
import { TextFieldComponent }       from './fields/text.field.component';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

export enum FormControlType {
    checkbox,
    color,
    date,
    dropdown,
    group,
    hidden,
    list,
    password,
    text
}

@Injectable()
export class FormControlTypeMappings {

    private mappings: { [type: string]: any } = {};

    constructor(@Optional() @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig) {
        // default mappings
        this.addMapping(FormControlType.checkbox, CheckboxFieldComponent);
        this.addMapping(FormControlType.color, ColorPickerComponent);
        this.addMapping(FormControlType.date, DatePickerComponent);
        this.addMapping(FormControlType.dropdown, DropdownFieldComponent);
        this.addMapping(FormControlType.group, GroupFieldComponent);
        this.addMapping(FormControlType.hidden, TextFieldComponent);
        this.addMapping(FormControlType.list, ListFieldComponent);
        this.addMapping(FormControlType.password, PasswordFieldComponent);
        this.addMapping(FormControlType.text, TextFieldComponent);

        if (config) {
            config.mappings.forEach(mapping => this.addMapping(mapping.type, mapping.component));
        }
    }

    public addMapping(type: FormControlType | string, component: any) {
        this.mappings[type] = component;
    }

    public getComponentType(type: FormControlType | string): any {
        return this.mappings[type];
    }

}