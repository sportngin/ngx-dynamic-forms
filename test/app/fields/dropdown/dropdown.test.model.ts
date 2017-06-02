import { Model } from 'ng-dynamic-forms';

export class DropdownTestModel extends Model {

    constructor() {
        super(
            Model.selectionMember('dropdown')
                .addLabel('Dropdown')
                .addData('data', [{
                    id: 1,
                    name: 'option 1'
                }, {
                    id: 2,
                    name: 'option 2'
                }, {
                    id: 3,
                    name: 'option 3'
                }])
                .addData('itemLabel', 'name')
                .addData('itemValue', 'id'),

            Model.selectionMember('anotherDropdown')
                .addLabel('anotherDropdown')
                .addData('data', [{
                    id: 'a',
                    name: 'option a'
                }, {
                    id: 'b',
                    name: 'option b'
                }, {
                    id: 'c',
                    name: 'option c'
                }])
                .addData('itemLabel', 'name')
                .addData('itemValue', 'id'),

            Model.selectionMember('dependentDropdown')
                .addDependentControls('dropdown', 'anotherDropdown')
                .addData('data', (dropdownValue: number, anotherDropdownValue: string) => {
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
                })
                .addData('itemLabel', 'name')
                .addData('itemValue', 'id')
                .addLabel('Dependent Dropdown')

        );
    }
}