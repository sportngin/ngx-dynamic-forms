import { Observable } from 'rxjs/Observable';

import { FormText }                 from '../form.text';
import { PageMember }               from '../member/page.member';
import { ButtonAction }             from './button.action';
import { ButtonClass }              from './button.class';
import { ButtonControl }            from './button.control';
import { ButtonControlBase }        from './button.control.base';
import { ButtonControlBuilder }     from './button.control.builder';
import { ButtonType }               from './button.type';
import { ContainerControlBase }     from './container.control.base';
import { ElementType }              from './element.type';
import { RootPageElementBuilder }   from './root.page.element.builder';

export class RootPageElement extends ContainerControlBase<RootPageElement> implements RootPageElementBuilder<RootPageElement> {

    constructor(
        public startPage: Observable<number>,
        public updatePage: (pageIndex: number) => void,
        pages: PageMember[]
    ) {
        super(ElementType.pageRoot, pages);

        pages.forEach((page, pageIndex) => page.pageIndex = pageIndex);

        this.setNextButton('Next', ButtonClass.primary);
        this.setPrevButton('Prev', ButtonClass.secondary);
    }

    private createButton(buttonAction: string, buttonClass?: ButtonClass | string, text?: FormText, disableWhenInvalid?: boolean) {
        let button = new ButtonControlBase(ButtonType.button, buttonAction, text, disableWhenInvalid);
        if (buttonClass) {
            if (buttonClass.match(/^\.btn-/)) {
                button.addCssClass('.btn');

            }
            button.addCssClass(buttonClass);
        }
        return button;
    }

    private configButton(button: ButtonControl, buttonConfig: (button: ButtonControlBuilder) => ButtonControlBuilder): RootPageElement {
        if (buttonConfig) {
            buttonConfig(button as ButtonControlBuilder);
        }
        return this;
    }

    public configPrevButton(buttonConfig: (button: ButtonControlBuilder) => ButtonControlBuilder): RootPageElement {
        return this.configButton(this.prevButton, buttonConfig);
    }

    public configNextButton(buttonConfig: (button: ButtonControlBuilder) => ButtonControlBuilder): RootPageElement {
        return this.configButton(this.nextButton, buttonConfig);
    }

    public setPrevButton(text: FormText, buttonClass?: ButtonClass | string): RootPageElement {
        this.prevButton = this.createButton(ButtonAction.pagePrev, buttonClass, text)
            .addConditions({ key: 'prev', required: true });
        return this;
    }

    public setNextButton(text: FormText, buttonClass?: ButtonClass | string, buttonConfig?: (button: ButtonControlBuilder) => ButtonControlBuilder): RootPageElement {
        let button = this.createButton(ButtonAction.pageNext, buttonClass, text, true)
            .addConditions({ key: 'next', required: true });
        if (buttonConfig) {
            buttonConfig(button);
        }
        this.nextButton = button;
        return this;
    }

    public children: PageMember[];

    public prevButton: ButtonControl;
    public nextButton: ButtonControl;

}