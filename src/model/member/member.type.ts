export enum MemberType {
    checkbox = 'checkbox',
    color = 'color',
    date = 'date',
    dropdown = 'dropdown',
    group = 'group',
    hidden = 'hidden',
    list = 'list',
    password = 'password',
    text = 'text'
}

export const TEMPLATED_MEMBER_TYPES: (MemberType | string)[] = [MemberType.group, MemberType.list];