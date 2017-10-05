import { Model }        from '../model';
import { ModelMember }  from './model.member';

export interface TemplatedMember extends ModelMember {

    template: Model;
    itemCssClasses: string[];

}

