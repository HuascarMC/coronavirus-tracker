import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SideBarService {
    constructor(private http: HttpClient) {}

    fetchTotal() {
        return this.http
            .get("https://coronavirus-tracker-api.herokuapp.com/v2/latest")
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }
}
