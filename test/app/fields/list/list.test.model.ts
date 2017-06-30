import { Validators } from '@angular/forms';

import { ButtonActions, BUTTON_CLASSES, FormControlType, Model } from '@siplay/ng-dynamic-forms';

export class ListTestModelItem extends Model {

    constructor() {
        super(
            Model.layout('.row.entry-row-1',
                Model.hiddenMember('cantTouchThis'),
                Model.layout('.col-4',
                    Model.layout('.cant-touch-this.alert.alert-info.info-icon',
                        Model.layout('.fa.fa-info')
                    )
                        .addAttributes({ title: 'this one cannot be edited' })
                        .addConditions({ key: 'cant-touch-this' }),
                    Model.textMember('name', Validators.required).addLabel('Name')
                ),
                Model.layout('.col-3', Model.defaultValueMember('default', 'default', FormControlType.text).addLabel('Default')),
                Model.layout('.col-3',
                    Model.selectionMember('selectSomething')
                        .addData('data', [{ id: 1, name: 'option 1' }, { id: 2, name: 'option 2' }])
                        .addData('itemLabel', 'name')
                        .addData('itemValue', 'id')
                        .addLabel('Select')
                ),
                Model.layout('.col-2.ngdf-list-editable.ngdf-list-button-container.flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.removeItem, BUTTON_CLASSES.danger)
                            .addListItemControlConditions({ key: 'remove' })
                            .addCssClass('fa', 'fa-trash-o')
                    )
                ),
                Model.layout('.col-2.ngdf-list-editor.ngdf-list-button-container.ngdf-list-flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.resetItem, BUTTON_CLASSES.warning)
                            .addListItemControlConditions({ key: 'reset' })
                            .addCssClass('fa', 'fa-undo'),
                        Model.button(ButtonActions.saveItem, BUTTON_CLASSES.primary, null, null, true)
                            .addListItemControlConditions({ key: 'save' })
                            .addCssClass('fa', 'fa-check')
                    )
                )
            ),
            Model.layout('.row.ngdf-list-editor.entry-row-2',
                Model.layout('.col-11',
                    Model.layout('.float-right',
                        Model.button(ButtonActions.saveItem, BUTTON_CLASSES.primary, '+ Add Another', null, true)
                            .addListItemControlConditions({ key: 'add' })
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