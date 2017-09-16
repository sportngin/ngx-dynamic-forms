import { TemplatedMember } from './templated.member';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export interface ArrayMember extends TemplatedMember {

    renderHeaderRow: boolean;
    canEditItem: ArrayItemPermission;
    canAddItem: boolean;
    canRemoveItem: ArrayItemPermission;
    getPermission(hasPermission: ArrayItemPermission, value: any): boolean;
}

