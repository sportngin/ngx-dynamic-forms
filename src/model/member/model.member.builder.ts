import { ElementTipOptions }    from '../element/element.tip.options';
import { ModelElementBuilder }  from '../element/model.element.builder';
import { ModelMember }          from './model.member';

export interface ModelMemberBuilder<T extends ModelMemberBuilder<T>> extends ModelMember, ModelElementBuilder<T> {
    addLabel: (label: string) => T;
    addValidationMessage(errorKey: string, text: string, options?: ElementTipOptions): T;
    setDisplaysValidation: (displaysValidation: boolean) => T;
}