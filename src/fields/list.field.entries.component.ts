import { Component, Inject, Injector } from '@angular/core';

import { chain, extend } from 'lodash';

import { ParentComponent, TEMPLATE } from '../parent.component';
import { ELEMENT_DATA } from '../elements/element.data';
import { ArrayControl } from '../model/control/array.control';
import { ComponentInfo } from '../component.info';
import { ListFieldEntryComponent } from './list.field.entry.component';
import { FIELD_DATA, FieldData } from './element.data';

@Component({
    selector: '[list-field-entries]',
    template: TEMPLATE
})
export class ListFieldEntriesComponent extends ParentComponent<ArrayControl> {

    constructor(
        @Inject(FIELD_DATA) fieldData: FieldData,
        injector: Injector
    ) {
        super(fieldData, injector);
    }

    protected createComponents(): ComponentInfo[] {
        console.log('ListFieldEntriesComponent.createComponents');
        return chain(this.form[this.control.name].controls)
            .map(entryForm => {
                let providers = [
                    { provide: ELEMENT_DATA, useValue: extend({}, this.elementData, { formControl: entryForm }) }
                ];
                return this.createComponent(this.control, ListFieldEntryComponent, providers, false);
            })
            .flatten()
            .value() as ComponentInfo[];
    }
}