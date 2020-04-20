import { Component, OnInit, Input } from "@angular/core";
import { SideBarService } from "./side-bar.service";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
    @Input() data;

    confirmed: number;
    deaths: number;
    recovered: number;

    constructor(private sideBarService: SideBarService) {}

    ngOnInit(): void {
        this.confirmed = 0;
        this.deaths = 0;
        this.recovered = 0;
        this.getTotals();
    }

    getTotals() {
        for (let c in this.data) {
            this.confirmed += this.data[c].slice(-1)[0].confirmed;
            this.deaths += this.data[c].slice(-1)[0].deaths;
            this.recovered += this.data[c].slice(-1)[0].recovered;
        }
    }
}
