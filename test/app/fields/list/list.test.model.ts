import { Validators } from '@angular/forms';

import { ButtonActions, BUTTON_CLASSES, FormControlType, Model } from '@siplay/ng-dynamic-forms';

export class ListTestModelItem extends Model {

    constructor() {
        super(
            Model.layout('.row.entry-row-1',
                Model.hiddenMember('cantTouchThis'),
                Model.layout('.col-4', Model.textMember('name', Validators.required).addLabel('Name')),
                Model.layout('.col-2', Model.defaultValueMember('default', 'default', FormControlType.text).addLabel('default')),
                Model.layout('.col-2',
                    Model.selectionMember('selectSomething')
                        .addData('data', [{ id: 1, name: 'option 1' }, { id: 2, name: 'option 2' }])
                        .addData('itemLabel', 'name')
                        .addData('itemValue', 'id')
                ),
                Model.layout('.col-4.ngdf-list-editable.ngdf-list-button-container.flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.removeItem, BUTTON_CLASSES.danger)
                            .addCssClass('fa', 'fa-trash-o'))
                            .addConditions({ key: 'remove' })
                ),
                Model.layout('.col-4.ngdf-list-editor.ngdf-list-button-container.ngdf-list-flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.resetItem, BUTTON_CLASSES.warning)
                            .addCssClass('fa', 'fa-undo')
                            .addConditions({ key: 'reset' }),
                        Model.button(ButtonActions.saveItem, BUTTON_CLASSES.primary, null, null, true)
                            .addCssClass('fa', 'fa-check')
                            .addConditions({ key: 'save' })
                    )
                )
            ),
            Model.layout('.row.ngdf-list-editor.entry-row-2',
                Model.layout('.col-11',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.saveItem, BUTTON_CLASSES.primary, '+ Add Another', null, true)
                            .addConditions({ key: 'add' })
                    )
                )
            )
        );
    }

}

export class ListTestModel extends Model {

    constructor() {
        super(
            Model.arrayMember('list', new ListTestModelItem())
                .allowEditItem(value => !value.cantTouchThis)
                .allowRemoveItem(value => !value.cantTouchThis)
                .addLabel('List')

        );
    }
}