import { ValidatorFn }          from '@angular/forms';

import { FormControlType }      from '../../form.control.type';
import { ModelElementTypes }    from '../model.element';
import { ModelMemberBase }      from './model.member';

export class SelectionMember extends ModelMemberBase {

    constructor(name: string, validators?: ValidatorFn | ValidatorFn[], data?: {}, dependentControls?: string[]) {
        super(ModelElementTypes.control, FormControlType.dropdown, name, validators, data);

        this.dependentControls = dependentControls;
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