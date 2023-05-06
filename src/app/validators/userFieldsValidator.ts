import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/user/users.service';

export function uniqueValueValidator(userService: UsersService, field: string) {
    return (control: AbstractControl) => {
        let realValue = control.value.charAt(0).toUpperCase()+ control.value.slice(1).toLowerCase();
        return userService.checkIfValueExists(field, (realValue)).pipe(
            map(exists => exists ? { uniqueValue: true } : null)
        );
    };
}