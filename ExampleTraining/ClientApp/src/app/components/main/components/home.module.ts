import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        MatCardModule
    ],
    providers: [

    ],
    exports: [

    ]
  })
  export class HomeModule { }