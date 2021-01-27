import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "./dashboard.service";

import { MapComponent } from "./map/map.component";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    @ViewChild("map") map: MapComponent;
    pomberData: any;
    covidData: any;
    covidCountryData: any;
    covidTrendData: any;
    country: string;
    latitude: number;
    longitude: number;

    constructor(private boardService: DashboardService) {}

    ngOnInit(): void {
        this.fetchCovidWorldData();
        this.fetchCovidTrendData();
        this.fetchPomberData();
        setTimeout(() => {
            if (this.covidCountryData && this.covidCountryData.regions) {
                this.updateCountry("Dominican Republic");
            }
        }, 400);
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
        this.boardService.fetchPomber().subscribe((response) => {
            this.pomberData = response;
        });
    }

    fetchCovidWorldData(): any {
        this.boardService.fetchCov19().subscribe((response) => {
            this.covidData = response;
        });
    }

    fetchCovidTrendData(): any {
        this.boardService.fetchCov19Trend().subscribe((response) => {
            this.covidTrendData = response;
        });
    }

    updateCountry(event) {
        event = event === "us" || event === "US" ? "United States" : event;
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
        return this.country.replace(/\s/g, "").toLowerCase();
    }
}
