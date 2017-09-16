import { Validators } from '@angular/forms';

import { ButtonAction, ButtonClass, ElementPosition, MemberType, Model } from '@siplay/ng-dynamic-forms';

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
                Model.layout('.col-3', Model.defaultValueMember('default', 'default', MemberType.text).addLabel('Default')),
                Model.layout('.col-3',
                    Model.selectionMember('selectSomething')
                        .addData('data', [{ id: 1, name: 'option 1' }, { id: 2, name: 'option 2' }])
                        .addData('itemLabel', 'name')
                        .addData('itemValue', 'id')
                        .addLabel('Select')
                ),
                Model.layout('.col-2.ngdf-list-editable.ngdf-list-button-container.flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonAction.removeItem, ButtonClass.danger)
                            .addListItemControlConditions({ key: 'remove' })
                            .addCssClass('fa', 'fa-trash-o')
                    )
                ),
                Model.layout('.col-2.ngdf-list-editor.ngdf-list-button-container.ngdf-list-flex-right',
                    Model.layout('.float-right',
                        Model.button(ButtonAction.resetItem, ButtonClass.warning)
                            .addListItemControlConditions({ key: 'reset' })
                            .addCssClass('fa', 'fa-undo'),
                        Model.button(ButtonAction.saveItem, ButtonClass.primary, null, true)
                            .addListItemControlConditions({ key: 'save' })
                            .addCssClass('fa', 'fa-check')
                    )
                )
            ),
            Model.layout('.row.ngdf-list-editor.entry-row-2.clearfix',
                Model.layout('.col-11',
                    Model.layout('.float-right',
                        Model.button(ButtonAction.saveItem, ButtonClass.primary, '+ Add Another', true)
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
                .rendersHeaderRow(true)
                .addLabel('List')
                .addSiblingTip(`Here's a tip`, '.alert.alert-info', ElementPosition.before)
                .addItemCssClass('item-css-class', 'class-one class-two', '.class-three.class-four', 'class-five')
        );
    }
}