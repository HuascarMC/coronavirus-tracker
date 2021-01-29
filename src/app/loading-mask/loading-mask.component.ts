import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-mask',
    templateUrl: './loading-mask.component.html',
    styleUrls: ['./loading-mask.component.css']
})
export class LoadingMaskComponent implements OnInit {
    @Input() loading: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
