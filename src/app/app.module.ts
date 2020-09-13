import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MovieDetailsPage} from '../pages/movie-details/movie-details';
import {DisplayDataService} from '../providers/display-data-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,MovieDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,MovieDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},DisplayDataService]
})
export class AppModule {}
