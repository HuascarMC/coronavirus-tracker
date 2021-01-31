import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingMaskComponent } from '../loading-mask/loading-mask.component';
import { DashboardService } from './dashboard.service';
import { MapComponent } from './map/map.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('map') map: MapComponent;
    @ViewChild('loadingMask') loadingMask: LoadingMaskComponent;

    pomberData: any;
    covidData: any;
    covidCountryData: any;
    covidTrendData: any;
    country: string;
    latitude: number;
    longitude: number;

    constructor(private boardService: DashboardService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.getData();
    }

    private async getData() {
        this.loadingMask.show();
        this.covidData = await this.fetchCovidWorldData();
        this.covidTrendData = await this.fetchCovidTrendData();
        await this.fetchPomberData().then((data) => {
            this.pomberData = data;
            if (this.covidData && this.covidData.regions) {
                this.updateCountry('Dominican Republic');
                setTimeout(() => this.loadingMask.hide(), 1500);
            }
        });
    }

    fetchLatLng(): void {
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

    fetchPomberData(): Promise<any> {
        return this.boardService.fetchPomber().toPromise();
    }

    fetchCovidWorldData(): Promise<any> {
        return this.boardService.fetchCov19().toPromise();
    }

    fetchCovidTrendData(): Promise<any> {
        return this.boardService.fetchCov19Trend().toPromise();
    }

    updateCountry(event): void {
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

    getCountryFormatForTrend(): string {
        return this.country.replace(/\s/g, '').toLowerCase();
    }
}
