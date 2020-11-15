import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { MessageService, UIChart } from "primeng";

@Component({
    selector: "app-summary-section",
    templateUrl: "./summary-section.component.html",
    styleUrls: ["./summary-section.component.css"]
})
export class SummarySectionComponent implements OnInit {
    @Input() data: any;
    @Input() country: string;
    @Input() trendData: any;
    @Input() countrySummaryData: any;
    @ViewChild("lineChart") chart: Chart;

    dataSet: any;
    chartOptions: any;
    last = 7;
    fromDate: Date;
    toDate: Date;
    minDate: Date;
    maxDate: Date;
    xAxesLabels: any;
    confirmed: any[];
    deaths: any[];
    recovered: any[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        if (this.trendData) {
            this.minDate = new Date(this.data[0].date);
            this.maxDate = new Date(this.data[this.data.length - 1].date);
            this.getSelectedData();
            this.setChart();
        }
    }

    ngOnChanges() {
        this.getSelectedData();
        this.setChart();
    }

    onSelect(event) {
        Promise.resolve(this.getSelectedData()).then(() => {
            this.setChart();
        });
    }

    getSelectedData() {
        this.getDatesByFromTo();
        this.getConfirmedByFromTo();
        this.getDeathsByFromTo();
        this.getRecoveredByFromTo();
    }

    getRecoveredByFromTo() {
        this.recovered = [];
        this.data.forEach((dataSet) => {
            const date = new Date(dataSet.date);
            if (this.toDate) {
                if (date >= this.fromDate && date <= this.toDate) {
                    this.recovered.push(dataSet.recovered);
                }
            } else if (this.fromDate) {
                if (date >= this.fromDate && date <= this.maxDate) {
                    this.recovered.push(dataSet.recovered);
                }
            } else {
                this.getRecovered(this.last);
            }
        });
    }

    getDeathsByFromTo() {
        this.deaths = [];
        this.data.forEach((dataSet) => {
            const date = new Date(dataSet.date);
            if (this.toDate) {
                if (date >= this.fromDate && date <= this.toDate) {
                    this.deaths.push(dataSet.deaths);
                }
            } else if (this.fromDate) {
                if (date >= this.fromDate && date <= this.maxDate) {
                    this.deaths.push(dataSet.deaths);
                }
            } else {
                this.getDeaths(this.last);
            }
        });
    }

    getConfirmedByFromTo() {
        this.confirmed = [];
        this.data.forEach((dataSet) => {
            const date = new Date(dataSet.date);
            if (this.toDate) {
                if (date >= this.fromDate && date <= this.toDate) {
                    this.confirmed.push(dataSet.confirmed);
                }
            } else if (this.fromDate) {
                if (date >= this.fromDate && date <= this.maxDate) {
                    this.confirmed.push(dataSet.confirmed);
                }
            } else {
                this.getConfirmed(this.last);
            }
        });
    }

    getDatesByFromTo() {
        this.getConfirmedByFromTo();
        this.xAxesLabels = [];
        this.data.forEach((dataSet) => {
            const date = new Date(dataSet.date);
            if (this.toDate) {
                if (date >= this.fromDate && date <= this.toDate) {
                    this.xAxesLabels.push(dataSet.date);
                }
            } else if (this.fromDate) {
                if (date >= this.fromDate && date <= this.maxDate) {
                    this.xAxesLabels.push(dataSet.date);
                }
            } else {
                this.getDatesBy(this.last);
            }
        });
    }

    getDatesBy(last: number) {
        const dates = this.data.map((dataSet) => {
            return dataSet.date;
        });
        this.xAxesLabels = dates.slice(1).slice(last * -1);
    }

    getConfirmed(last: number) {
        const confirmed = this.data.map((dataSet) => {
            return dataSet.confirmed;
        });
        this.confirmed = confirmed.slice(1).slice(last * -1);
    }

    getDeaths(last: number) {
        const deaths = this.data.map((dataSet) => {
            return dataSet.deaths;
        });

        this.deaths = deaths.slice(1).slice(last * -1);
    }

    getRecovered(last: number) {
        const recovered = this.data.map((dataSet) => {
            return dataSet.recovered;
        });
        this.recovered = recovered.slice(1).slice(last * -1);
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
            labels: this.xAxesLabels,

            datasets: [
                {
                    label: "Confirmed",
                    data: this.confirmed,
                    fill: false,
                    backgroundColor: "#4bc0c0",
                    borderColor: "#4bc0c0"
                },
                {
                    label: "Deaths",
                    data: this.deaths,
                    fill: false,
                    backgroundColor: "red",
                    borderColor: "red"
                },
                {
                    label: "Recovered",
                    data: this.recovered,
                    fill: false,
                    backgroundColor: "#3a7c30",
                    borderColor: "#3a7c30"
                }
            ]
        };
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
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
