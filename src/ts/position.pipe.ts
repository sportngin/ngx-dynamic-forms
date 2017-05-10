import { Pipe, PipeTransform } from '@angular/core';

import { filter } from 'lodash';

import { ControlPosition } from './model/control.position';

@Pipe({
    name: 'position'
})
export class PositionPipe implements PipeTransform {

    transform<T extends { position: ControlPosition }>(value: T[], position: ControlPosition): any {
        return filter(value, item => item.position === position);
    }

}