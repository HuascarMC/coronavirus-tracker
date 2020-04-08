import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { MessageService } from "primeng";
import { preserveWhitespacesDefault } from "@angular/compiler";

@Component({
    selector: "app-summary-section",
    templateUrl: "./summary-section.component.html",
    styleUrls: ["./summary-section.component.css"]
})
export class SummarySectionComponent implements OnInit {
    @Input() data: any;
    dataSet: any;
    chartOptions: any;
    last = 10;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        console.log(this.data);
        this.dataSet = {
            labels: this.getDates(this.last),

            datasets: [
                {
                    label: "Confirmed",
                    data: this.getConfirmed(this.last),
                    fill: false,
                    backgroundColor: "#4bc0c0",
                    borderColor: "#4bc0c0"
                },
                {
                    label: "Deaths",
                    data: this.getDeaths(this.last),
                    fill: false,
                    backgroundColor: "red",
                    borderColor: "red"
                },
                {
                    label: "Recovered",
                    data: this.getRecovered(this.last),
                    fill: false,
                    backgroundColor: "green",
                    borderColor: "green"
                }
            ]
        };
        this.chartOptions = {
            chart: {
                backgroundColor: "gray"
            },
            legend: {
                labels: {
                    fontColor: "white"
                }
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: "white"
                        },
                        ticks: {
                            fontColor: "white"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: "white"
                        },
                        ticks: {
                            fontColor: "white"
                        }
                    }
                ]
            }
        };
    }

    getDates(last: number) {
        const dates = this.data.map((dataSet) => {
            return dataSet.date;
        });
        return dates.slice(1).slice(last * -1);
    }

    getConfirmed(last: number) {
        const confirmed = this.data.map((dataSet) => {
            return dataSet.confirmed;
        });
        return confirmed.slice(1).slice(last * -1);
    }

    getDeaths(last: number) {
        const deaths = this.data.map((dataSet) => {
            return dataSet.deaths;
        });
        console.log(deaths);

        return deaths.slice(1).slice(last * -1);
    }

    getRecovered(last: number) {
        const recovered = this.data.map((dataSet) => {
            return dataSet.recovered;
        });
        return recovered.slice(1).slice(last * -1);
    }

    selectData(event) {
        this.messageService.add({
            severity: "info",
            summary: "Data Selected",
            detail: this.data.datasets[event.element._datasetIndex].data[
                event.element._index
            ]
        });
    }
}