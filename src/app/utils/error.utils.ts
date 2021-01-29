import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export namespace ErrorUtils {
    export function Handle(error: HttpErrorResponse) {
        return throwError(error.message);
    }
}
