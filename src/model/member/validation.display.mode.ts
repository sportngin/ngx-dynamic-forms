export enum ValidationDisplayMode {
    none = 0,
    valid = 1,
    invalid = 2,
    both = ValidationDisplayMode.valid | ValidationDisplayMode.invalid
}