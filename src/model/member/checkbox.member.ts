import { FormControlType }      from '../../form.control.type';
import { ControlPosition }      from '../control.position';
import { ModelElementType }     from '../model.element';
import { ModelMemberBase }      from './model.member';

export class CheckboxMember extends ModelMemberBase<CheckboxMember> {

    constructor(name: string, checked?: boolean | (() => boolean)) {
        super(ModelElementType.control, FormControlType.checkbox, name);

        this.checked = checked;
        this.labelPosition = ControlPosition.after;
    }

    public checked: boolean | (() => boolean);

}