import { Component, OnInit, Input } from "@angular/core";
import { SideBarService } from "./side-bar.service";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
    @Input() data;
    @Input() altData;
    @Input() countryPopulationData;

    confirmed: number;
    deaths: number;
    recovered: number;

    constructor(private sideBarService: SideBarService) {}

    ngOnInit(): void {
        this.confirmed = 0;
        this.deaths = 0;
        this.recovered = 0;

        if (this.data) {
            this.getTotals();
        } else {
            this.getAltTotals();
        }
    }

    ngOnChanges() {
        this.ngOnInit();
    }

    getTotals() {
        this.confirmed += this.data.regions.world.totals.confirmed;
        this.deaths += this.data.regions.world.totals.deaths;
        this.recovered += this.data.regions.world.totals.recovered;
    }

    getAltTotals() {
        for (let c in this.altData) {
            this.confirmed += this.altData[c].slice(-1)[0].confirmed;
            this.deaths += this.altData[c].slice(-1)[0].deaths;
            this.recovered += this.altData[c].slice(-1)[0].recovered;
        }
    }

    getDeathRatio() {
        return this.countryPopulationData &&
            this.countryPopulationData.deaths_ratio
            ? this.countryPopulationData.deaths_ratio
            : "Not available";
    }
}
