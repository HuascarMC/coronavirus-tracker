import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
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
            .get("https://pomber.github.io/covid19/timeseries.json")
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }
}
