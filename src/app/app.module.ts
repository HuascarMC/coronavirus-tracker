import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SummarySectionComponent } from "./dashboard/summary-section/summary-section.component";
import { ChartModule, ToastModule, MessageService } from "primeng";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SummarySectionComponent,
        TopBarComponent,
        SearchBarComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ChartModule,
        ToastModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
