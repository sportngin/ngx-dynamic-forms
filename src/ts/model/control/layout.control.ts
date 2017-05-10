import { LayoutMember }     from '../member/layout.member';
import { toControlGroup }   from '../model';
import { ModelControlBase } from './model.control';

export class LayoutControl extends ModelControlBase<LayoutMember> {
    constructor(container: LayoutMember) {
        super(container);

        this.childControls = toControlGroup(container.members);

    }
}