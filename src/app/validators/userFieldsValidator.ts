import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/user/users.service';

export function uniqueValueValidator(userService: UsersService, errorIfExists:boolean) {
    return (control: AbstractControl) => {
        let realValue = control.value.charAt(0).toUpperCase()+ control.value.slice(1).toLowerCase();
        return userService.checkIfValueExists(realValue).pipe(
            map(exists => ((exists && errorIfExists) || (!exists && !errorIfExists)) ? { uniqueValue: true } : null)
        );
    };
}