import { Routes } from '@angular/router';

import { TestFieldsHomeComponent }  from './test.fields.home.component';
import { CheckboxTestComponent }    from './checkbox/checkbox.test.component';
import { ColorPickerTestComponent } from './colorpicker/color.picker.test.component';
import { DatePickerTestComponent }  from './datepicker/date.picker.test.component';
import { DropdownTestComponent }    from './dropdown/dropdown.test.component';

export const fieldsChildRoutes: Routes = [
    { path: '',             component: TestFieldsHomeComponent },
    { path: 'checkbox',     component: CheckboxTestComponent },
    { path: 'colorpicker',  component: ColorPickerTestComponent },
    { path: 'datepicker',   component: DatePickerTestComponent },
    { path: 'dropdown',     component: DropdownTestComponent }
];