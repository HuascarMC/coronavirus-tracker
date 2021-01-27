import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SummarySectionComponent } from "./dashboard/summary-section/summary-section.component";
import { ChartModule, ToastModule, MessageService } from "primeng";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownModule } from "primeng/dropdown";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { CalendarModule } from "primeng/calendar";
import { GoogleMapsModule } from "@angular/google-maps";
import { MapComponent } from "./dashboard/map/map.component";
import { HeaderInterceptor } from "./utils/header.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SummarySectionComponent,
        TopBarComponent,
        SearchBarComponent,
        SideBarComponent,
        MapComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ChartModule,
        ToastModule,
        AutoCompleteModule,
        BrowserAnimationsModule,
        DropdownModule,
        CalendarModule,
        GoogleMapsModule
    ],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
