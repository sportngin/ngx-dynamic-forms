import { TemplatedMember } from './templated.member';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export interface ArrayMember extends TemplatedMember {

    /**
     * Determines whether the control renders a header row instead of per-member labels
     */
    renderHeaderRow: boolean;

    /**
     * When {@link renderHeaderRow} is set to {@link true}, determines whether the control renders per-member control labels in addition to the header row
     */
    keepControlLabels: boolean;

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

