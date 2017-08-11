import { Inject, Injectable, Optional } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { CheckboxFieldComponent }   from './fields/checkbox.field.component';
import { ColorPickerComponent }     from './fields/color.picker.component';
import { DatePickerComponent }      from './fields/date.picker.component';
import { DropdownFieldComponent }   from './fields/dropdown.field.component';
import { GroupFieldComponent }      from './fields/group.field.component';
import { ListFieldComponent }       from './fields/list.field.component';
import { PasswordFieldComponent }   from './fields/password.field.component';
import { TextFieldComponent }       from './fields/text.field.component';

import { FieldType }            from './field.type';
import { TypeMappingService }   from './type.mapping.service';

const CONFIG_KEY: string = 'fields';

@Injectable()
export class FieldTypeMappings extends TypeMappingService<FieldType> {

    constructor(@Optional() @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig) {
        super(config);

        if (config) {
            config.fields.forEach(mapping => this.addMapping(mapping.type, mapping.component));
        }
    }

    protected get configKey(): string {
        return CONFIG_KEY;
    }

    protected addStaticMappings(): void {
        this.addMapping(FieldType.checkbox, CheckboxFieldComponent);
        this.addMapping(FieldType.color, ColorPickerComponent);
        this.addMapping(FieldType.date, DatePickerComponent);
        this.addMapping(FieldType.dropdown, DropdownFieldComponent);
        this.addMapping(FieldType.group, GroupFieldComponent);
        this.addMapping(FieldType.hidden, TextFieldComponent);
        this.addMapping(FieldType.list, ListFieldComponent);
        this.addMapping(FieldType.password, PasswordFieldComponent);
        this.addMapping(FieldType.text, TextFieldComponent);
    }

}