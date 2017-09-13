import { ModelElementBuilder }  from '../element/model.element.builder';
import { ModelElementTipType }  from '../element/model.element.tip.type';
import { ElementPosition }      from '../element.position';
import { ToolTipPosition }      from '../tool.tip.position';
import { ModelMember }          from './model.member';

export interface ModelMemberBuilder<T extends ModelMemberBuilder<T>> extends ModelMember, ModelElementBuilder<T> {
    addLabel: (label: string) => T;
    addValidationMessage: (key: string, text: string, cssClass?: string, tipType?: ModelElementTipType, position?: ElementPosition | ToolTipPosition) => T;
    setDisplaysValidation: (displaysValidation: boolean) => T;
}