import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ɵConsole
} from "@angular/core";
import { SearchBarService } from "./search-bar.service";

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
    @Output() searchSubmit = new EventEmitter<any>();
    countries: any[];

    country: string;

    constructor(private searchBarService: SearchBarService) {}

    ngOnInit(): void {}

    filterCountry(query, countries: string[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i in countries) {
            if (countries[i].toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(countries[i]);
            }
        }

        return filtered;
    }

    fetchCountries(event) {
        let query = event.query;
        this.searchBarService.fetchCountries().subscribe((countries) => {
            console.log(countries);
            this.countries = this.filterCountry(query, Object.keys(countries));
        });
    }

    search(event) {
        console.log(event);
        const country = event.target.elements[0].value;
        this.searchSubmit.emit(this.toTitleCase(country));
    }

    toTitleCase(string) {
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
