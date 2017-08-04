import { Routes } from '@angular/router';

import { TestFieldsHomeComponent }  from './test.fields.home.component';
import { FormTestComponent }        from './form/form.test.component';
import { PageTestComponent }        from './page/page.test.component';

import { CheckboxTestComponent }    from './checkbox/checkbox.test.component';
import { ColorPickerTestComponent } from './colorpicker/color.picker.test.component';
import { DatePickerTestComponent }  from './datepicker/date.picker.test.component';
import { DropdownTestComponent }    from './dropdown/dropdown.test.component';
import { ListTestComponent }        from './list/list.test.component';
import { PasswordTestComponent }    from './password/password.test.component';

export const fieldsChildRoutes: Routes = [
    { path: '',             component: TestFieldsHomeComponent },
    { path: 'form',         component: FormTestComponent },
    { path: 'paged',        component: PageTestComponent },

    { path: 'checkbox',     component: CheckboxTestComponent },
    { path: 'colorpicker',  component: ColorPickerTestComponent },
    { path: 'datepicker',   component: DatePickerTestComponent },
    { path: 'dropdown',     component: DropdownTestComponent },
    { path: 'list',         component: ListTestComponent },
    { path: 'password',     component: PasswordTestComponent }
];