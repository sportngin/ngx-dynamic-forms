import { LayoutMember }     from '../member/layout.member';
import { ModelHelper }      from '../model.helper';
import { ModelControlBase } from './model.control';

export class LayoutControl extends ModelControlBase<LayoutMember> {
    constructor(container: LayoutMember) {
        super(container);

        this.childControls = ModelHelper.createModelControls(container.members);

    }
}