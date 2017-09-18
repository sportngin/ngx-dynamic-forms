export enum ElementAbsolutePosition {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right'
}

const ALL_VALUES = [
    ElementAbsolutePosition.top,
    ElementAbsolutePosition.bottom,
    ElementAbsolutePosition.left,
    ElementAbsolutePosition.right
]

export function isAbsolutePosition(value: any): boolean {
    if (!value) {
        return false;
    }
    return ALL_VALUES.indexOf(value) >= 0;
}