import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { HttpUtils } from '../utils/http.utils';
import { DashboardService } from './dashboard.service';

import { MapComponent } from './map/map.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @ViewChild('map') map: MapComponent;
    pomberData: any;
    covidData: any;
    covidCountryData: any;
    covidTrendData: any;
    country: string;
    latitude: number;
    longitude: number;

    constructor(private boardService: DashboardService) {}

    ngOnInit(): void {
        this.getData();
    }

    private async getData() {
        this.covidData = await this.fetchCovidWorldData();
        this.covidTrendData = await this.fetchCovidTrendData();
        await this.fetchPomberData().then((data) => {
            this.pomberData = data;
            if (this.covidData && this.covidData.regions) {
                this.updateCountry('Dominican Republic');
            }
        });
    }

    fetchLatLng(): any {
        this.boardService
            .fetchLatLng(this.country)
            .subscribe((response: any) => {
                if (response && response.length > 0) {
                    response = response[0];
                    this.latitude = response.latitude;
                    this.longitude = response.longitude;
                }
            });
    }

    fetchPomberData(): any {
        return this.boardService.fetchPomber().toPromise();
    }

    fetchCovidWorldData(): any {
        return this.boardService.fetchCov19().toPromise();
    }

    fetchCovidTrendData(): any {
        return this.boardService.fetchCov19Trend().toPromise();
    }

    updateCountry(event) {
        event = event === 'us' || event === 'US' ? 'United States' : event;
        this.country = event;
        this.covidCountryData = this.covidData.regions.world.list.find(
            (country) => country.country === this.country
        );
        this.fetchLatLng();
        if (this.map) {
            this.map.ngOnChanges();
        }
    }

    getCountryFormatForTrend() {
        return this.country.replace(/\s/g, '').toLowerCase();
    }
}
