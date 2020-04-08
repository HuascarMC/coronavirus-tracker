import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    data: any;

    constructor(private boardService: DashboardService) {}

    ngOnInit(): void {
        this.data = this.boardService.fetch().subscribe((response) => {});
    }
}
