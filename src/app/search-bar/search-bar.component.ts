import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
    @Output() searchSubmit = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    search(event) {
        const country = new FormData(event.target).get("country");
        this.searchSubmit.emit(this.toTitleCase(country));
    }

    toTitleCase(string) {
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
