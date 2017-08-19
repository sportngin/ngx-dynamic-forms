// import {
//     Component, ComponentFactoryResolver, ComponentRef, Injector, Input, ViewEncapsulation
// } from '@angular/core';
//
// import { chain } from 'lodash';
//
// import { ComponentInfo }            from '../component.info';
// import { ControlSelectorComponent } from '../control.selector.component';
// import { ElementType }              from '../element.type';
// import { ElementTypeMappings }      from '../element.type.mappings';
// import { FieldType }                from '../field.type';
// import { FieldDisplayComponent }    from '../fields/field.display.component';
// import { ControlPosition }          from '../model/control.position';
// import { ELEMENT_HELPER }           from '../model/model.element';
// import { MODEL_CONTROL_PROVIDER, ModelMemberControl } from '../model/control/model.control';
// import { HelperComponent }          from './helper.component';
//
// @Component({
//     selector: 'form-element',
//     templateUrl: './element.selector.component.pug',
//     styleUrls: ['./element.selector.component.scss'],
//     encapsulation: ViewEncapsulation.None
// })
// export class ElementSelectorComponent extends ControlSelectorComponent {
//
//     @Input() displayOnly: boolean;
//
//     constructor(
//         injector: Injector
//     ) {
//         super(null, MODEL_CONTROL_PROVIDER, injector);
//     }
//
//     protected getControlComponentType(): any {
//
//     }
//
//     protected getElementData(): { [key: string]: any; } {
//         return {
//             form: this.form,
//             control: this.control,
//             displayOnly: this.displayOnly
//         };
//     }
//
//     protected createComponents(): ComponentInfo[] {
//         return [
//             ...this.createHelpers(this.coControlPosition.before),
//             ...this.createControlComponent(),
//             ...this.createHelpers(ControlPosition.after)
//         ];
//     }
// }