import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorUtils } from '../utils/error.utils';
import { Endpoints } from 'src/assets/endpoints.config';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    fetchLatLng(country: string) {
        return this.http
            .get(Endpoints.GEOCODER + `?country=${country}`)
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchPomber() {
        return this.http
            .get(Endpoints.POMBER)
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchCov19() {
        return this.http
            .get(Endpoints.REPORT)
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }

    fetchCov19Trend() {
        return this.http
            .get(Endpoints.TREND)
            .pipe(catchError((error: any) => ErrorUtils.Handle(error)));
    }
}
