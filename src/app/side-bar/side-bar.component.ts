import { Component, OnInit } from "@angular/core";
import { SideBarService } from "./side-bar.service";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
    totals: any;
    constructor(private sideBarService: SideBarService) {}

    ngOnInit(): void {
        this.fetchTotals();
    }

    fetchTotals() {
        this.sideBarService.fetchTotal().subscribe((data) => {
            this.totals = data;
        });
    }
}
