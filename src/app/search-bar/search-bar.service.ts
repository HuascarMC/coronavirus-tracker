import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorUtils } from '../utils/error.utils';

@Injectable({
    providedIn: 'root'
})
export class SearchBarService {
    constructor(private http: HttpClient) {}

    // fetchCountries() {
    //     return this.http
    //         .get<any>("../../assets/countries.json")
    //         .toPromise()
    //         .then((res) => <any[]>res.data)
    //         .then((data) => {
    //             return data;
    //         });
    // }

    fetchCountries() {
        return this.http
            .get('http://localhost:3000/covid/pomber')
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }
}
