import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
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
    @Input() country: string;
    dataSet: any;
    chartOptions: any;
    last = 10;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.setChart();
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

    setChart() {
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
                    backgroundColor: "#3a7c30",
                    borderColor: "#3a7c30"
                }
            ]
        };
        this.chartOptions = {
            responsive: true,
            chart: {
                backgroundColor: "gray"
            },
            legend: {
                labels: {
                    fontColor: "white"
                },
                position: "bottom"
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: "white"
                        },
                        ticks: {
                            fontColor: "white",
                            fontSize: 15
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: "white"
                        },
                        ticks: {
                            fontColor: "white",
                            fontSize: 15
                        }
                    }
                ]
            }
        };
    }
}
