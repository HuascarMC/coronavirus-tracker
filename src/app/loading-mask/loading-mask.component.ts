import { Component, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
    // ...
} from '@angular/animations';

@Component({
    selector: 'app-loading-mask',
    templateUrl: './loading-mask.component.html',
    styleUrls: ['./loading-mask.component.css'],
    animations: [
        trigger('popOverState', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0, visibility: 'hidden' })),
            transition('show => hide', animate('600ms ease-out')),
            transition('hide => show', animate('600ms ease-in'))
        ])
    ]
})
export class LoadingMaskComponent implements OnInit {
    loading: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    get stateName(): string {
        return this.loading ? 'show' : 'hide';
    }

    show(): void {
        this.loading = true;
    }

    hide(): void {
        this.loading = false;
    }
}
