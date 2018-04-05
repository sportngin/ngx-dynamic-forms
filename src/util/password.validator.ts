import { FormControl } from '@angular/forms';

import { fromPairs } from 'lodash-es';

export interface PasswordRequirement {

    description: string,
    pattern: RegExp

}

export class PasswordValidator {

    constructor(requirements: PasswordRequirement[] = null) {
        this.requirements = requirements;
    }

    requirements: Array<PasswordRequirement>;

    public validate(c: FormControl): any {

        if (!c.value) {
            return null;
        }

        let missingRequirements = this.requirements.filter(req => !req.pattern.test(c.value));

        if (!missingRequirements.length) {
            return null;
        }

        return {
            validatePassword: {
                valid: false,
                missing: fromPairs(missingRequirements.map(error => [error.description, true]))
            }
        };
    }

    public static validator(requirements: PasswordRequirement[]) {
        let validator = new PasswordValidator(requirements);
        return (c: FormControl) => validator.validate(c);
    }

}