import { FormControlType }      from '../../form.control.type';
import { ControlPositions }     from '../control.position';
import { ModelElementTypes }    from '../model.element';
import { ModelMemberBase }      from './model.member';

export class CheckboxMember extends ModelMemberBase {

    constructor(name: string, checked?: boolean | (() => boolean)) {
        super(ModelElementTypes.control, FormControlType.checkbox, name);

        this.checked = checked;
        this.labelPosition = ControlPositions.after;
    }

    public checked: boolean | (() => boolean);

}