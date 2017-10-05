import { Model } from '@siplay/ng-dynamic-forms';

export class DropdownTestModel extends Model {

    constructor() {
        super(
            Model.selectionMember('dropdown',
                [{
                    id: 1,
                    name: 'option 1'
                }, {
                    id: 2,
                    name: 'option 2'
                }, {
                    id: 3,
                    name: 'option 3'
                }],
                'name',
                'id')
                .addLabel('Dropdown'),

            Model.selectionMember('anotherDropdown',
                [{
                    id: 'a',
                    name: 'option a'
                }, {
                    id: 'b',
                    name: 'option b'
                }, {
                    id: 'c',
                    name: 'option c'
                }],
                'name',
                'id')
                .addLabel('anotherDropdown'),

            Model.selectionMember('dependentDropdown',
                (dropdownValue: number, anotherDropdownValue: string) => {
                    if (!dropdownValue || !anotherDropdownValue) {
                        return null;
                    }
                    return [{
                        id: `${dropdownValue}${anotherDropdownValue}.i`,
                        name: `option ${dropdownValue}${anotherDropdownValue}.i`
                    }, {
                        id: `${dropdownValue}${anotherDropdownValue}.ii`,
                        name: `option ${dropdownValue}${anotherDropdownValue}.ii`
                    }, {
                        id: `${dropdownValue}${anotherDropdownValue}.iii`,
                        name: `option ${dropdownValue}${anotherDropdownValue}.iii`
                    }];
                },
                'name',
                'id')
                .addDependentControls('dropdown', 'anotherDropdown')
                .addLabel('Dependent Dropdown'),

            Model.selectionMember('placeholderDropdown',
                [{
                    id: 1,
                    name: 'option 1'
                }, {
                    id: 2,
                    name: 'option 2'
                }, {
                    id: 3,
                    name: 'option 3'
                }],
                'name',
                'id')
                .addPlaceholderText('Select something!')
                .addLabel('Placeholder Dropdown'),

            Model.selectionMember('blankPlaceholderDropdown',
                [{
                    id: 1,
                    name: 'option 1'
                }, {
                    id: 2,
                    name: 'option 2'
                }, {
                    id: 3,
                    name: 'option 3'
                }],
                'name',
                'id')
                .addPlaceholderText()
                .addLabel('Blank Placeholder Dropdown')

        );
    }
}