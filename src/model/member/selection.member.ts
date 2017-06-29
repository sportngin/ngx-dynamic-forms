import { ValidatorFn } from '@angular/forms';

import { find } from 'lodash';

import { FormControlType }      from '../../form.control.type';
import { DisplayValueMember }   from './display.value.member';

export class SelectionMember extends DisplayValueMember {

    constructor(name: string, validators?: ValidatorFn | ValidatorFn[], data?: {}, dependentControls?: string[]) {
        super(FormControlType.dropdown, name, validators, data);

        this.dependentControls = dependentControls;
    }

    protected getDisplayValue(value: any): string {
        let selectionData = this.data['data'];
        let itemLabelKey = this.data['itemLabel'];
        let itemValueKey = this.data['itemValue'];
        let item = find(selectionData, (item: any) => item[itemValueKey] === value);
        return item ? item[itemLabelKey] : null;
    }

    public dependentControls: string[];

    public addDependentControls(...controlNames: string[]) {
        if (!this.dependentControls) {
            this.dependentControls = [];
        }
        this.dependentControls.push(...controlNames);
        return this;
    }

}