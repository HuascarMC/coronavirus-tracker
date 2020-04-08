import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    data: any;
    country: string;

    constructor(private boardService: DashboardService) {}

    ngOnInit(): void {
        this.fetchData();
        this.country = "Dominican Republic";
    }

    fetchData(): any {
        this.boardService.fetch().subscribe((response) => {
            this.data = response;
        });
    }

    updateCountry(event) {
        this.country = event;
    }
}
