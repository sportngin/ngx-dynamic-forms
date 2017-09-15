import { ElementTipOptions }        from '../element/element.tip.options';
import { ModelControlBuilder }      from '../element/model.control.builder';
import { ModelMember }              from './model.member';
import { ValidationDisplayMode }    from './validation.display.mode';

export interface ModelMemberBuilder<T extends ModelMemberBuilder<T>> extends ModelMember, ModelControlBuilder<T> {
    addLabel: (label: string) => T;
    addValidationMessage(errorKey: string, text: string, options?: ElementTipOptions): T;
    setValidationDisplay: (displaysValidation: ValidationDisplayMode) => T;
}