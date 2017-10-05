import { LabelDisplayOptions }  from './label.display.options';
import { TemplatedMember }      from './templated.member';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export interface ArrayMember extends TemplatedMember {

    /**
     * Determines how labels are rendered within the control.
     */
    itemLabelOptions: LabelDisplayOptions

    /**
     * Determines whether an item can be edited by the user.
     */
    canEditItem: ArrayItemPermission;

    /**
     * Determines whether items can be added by the user.
     */
    canAddItem: boolean;

    /**
     * Determines whether an item can be removed by the user.
     */
    canRemoveItem: ArrayItemPermission;

    /**
     * Evaluates the {@link ArrayItemPermission} to determine whether the user has the requested permission.
     */
    getPermission(hasPermission: ArrayItemPermission, value: any): boolean;
}

