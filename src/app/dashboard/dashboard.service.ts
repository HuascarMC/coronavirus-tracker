import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { ErrorUtils } from '../utils/error.utils';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    fetchLatLng(country: string) {
        return this.http
            .get(
                `https://covid19-proxy-nodejs.herokuapp.com/geocoder?country=${country}`
            )
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchPomber() {
        return this.http
            .get('https://covid19-proxy-nodejs.herokuapp.com/covid/pomber')
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchCov19() {
        return this.http
            .get('https://covid19-proxy-nodejs.herokuapp.com/covid/report')
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchCov19Trend() {
        return this.http
            .get('https://covid19-proxy-nodejs.herokuapp.com/covid/trend')
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }
}
