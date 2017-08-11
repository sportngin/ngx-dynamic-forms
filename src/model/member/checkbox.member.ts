import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { ControlPosition }  from '../control.position';
import { ModelMemberBase }  from './model.member';

export class CheckboxMember extends ModelMemberBase<CheckboxMember> {

    constructor(name: string, checked?: boolean | (() => boolean)) {
        super(ElementType.input, FieldType.checkbox, name);

        this.checked = checked;
        this.labelPosition = ControlPosition.after;
    }

    public checked: boolean | (() => boolean);

}