import { Component } from '@angular/core';
import { ModalContentPage } from '../Modal/ModalContentPage';
import { DisplayDataService } from '../../providers/display-data-service';
import { Platform, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { DisplayDataModel } from '../../Models/DisplayDataModel';
import {MovieDetailsPage} from '../movie-details/movie-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loader: any;

  public topMovies: DisplayDataModel[] = [];
  public moviesSuggestions: string[] = [];
  public movieDetailsPage=MovieDetailsPage;
  public params ={movieName:''};

  constructor(public alertCtrl: AlertController, public displayData: DisplayDataService, public loadingCtrl: LoadingController) {

    this.presentLoading();
    this.displayData.GetTopRated().then((data) => {
      this.topMovies = data;
    });
    this.dismissLoading();
  }

  public GetSuggestions(txt: string) {

    if (txt==='')
      return;
    let tempThis =this;
    setTimeout(function () {
      tempThis.displayData.GetAutoComplete(txt).then((data) => {

        
        
        data.forEach(element => {

          if (tempThis.moviesSuggestions.indexOf(element.toLowerCase())==-1)
            tempThis.moviesSuggestions.push(element.toLowerCase());
        });

      });
    }, 500);


  }


  //private methods only below

  private showAlert(txt) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `${txt}`,
      buttons: ['OK']
    });
    alert.present();
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();

  }

  private dismissLoading() {
    this.loader.dismiss();
  }

}

