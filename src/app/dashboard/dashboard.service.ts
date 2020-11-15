import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    fetchLatLng(country: string) {
        return this.http.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=AIzaSyAlEYeGSCg2-NVgpk1TpIzAXTMAJXDwY_M`
        );
    }

    fetchPomber() {
        return this.http
            .get("https://pomber.github.io/covid19/timeseries.json")
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }

    fetchCov19() {
        return this.http
            .get("https://cov19.cc/report.json?v=" + Math.random())
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }

    fetchCov19Trend() {
        return this.http
            .get("https://cov19.cc/trend.json")
            .pipe(catchError((error: any) => Observable.throw(error.error)));
    }
}
