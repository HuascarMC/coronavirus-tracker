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
        setTimeout(() => this.updateCountry("Dominican Republic"), 400);
    }

    fetchLatLng(): any {
        this.boardService
            .fetchLatLng(this.country)
            .subscribe((response: any) => {
                if (response.status && response.status.length > 0) {
                    this.latitude = response.results[0].geometry.location.lat;
                    this.longitude = response.results[0].geometry.location.lng;
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
