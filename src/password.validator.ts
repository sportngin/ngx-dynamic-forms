import { FormControl } from '@angular/forms';

import { chain, filter } from 'lodash';

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

        let missingRequirements = filter(this.requirements, req => !req.pattern.test(c.value));

        if (!missingRequirements.length) {
            return null;
        }

        return {
            validatePassword: {
                valid: false,
                missing: chain(missingRequirements)
                    .map(error => [error.description, true])
                    .fromPairs()
                    .value()
            }
        };
    }

    public static validator(requirements: PasswordRequirement[]) {
        let validator = new PasswordValidator(requirements);
        return (c: FormControl) => validator.validate(c);
    }

}