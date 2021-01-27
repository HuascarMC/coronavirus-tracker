import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    private errorHandler(error: HttpErrorResponse) {
        return throwError(error.message);
    }

    fetchLatLng(country: string) {
        return this.http
            .get(`http://localhost:3000/geocoder?country=${country}`)
            .pipe(catchError((error: any) => this.errorHandler(error)));
    }

    fetchPomber() {
        return this.http
            .get("http://localhost:3000/covid/pomber")
            .pipe(catchError((error: any) => this.errorHandler(error)));
    }

    fetchCov19() {
        return this.http
            .get("http://localhost:3000/covid/report")
            .pipe(catchError((error: any) => this.errorHandler(error)));
    }

    fetchCov19Trend() {
        return this.http
            .get("http://localhost:3000/covid/trend")
            .pipe(catchError((error: any) => this.errorHandler(error)));
    }
}
