import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    fetch() {
        return this.http
            .get("https://pomber.github.io/covid19/timeseries.json")
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }
}
