import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {DisplayDataService} from '../../providers/display-data-service';
import {MovieInfo} from '../../Models/MovieInfoModel';

/*
  Generated class for the MovieDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage {

  private loader:any;

  public movie:MovieInfo = new MovieInfo();
  public foundMovie:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DisplayDataService,public loadingCtrl:LoadingController) {
    this.presentLoading();
    this.dataService.GetMovieInfo(this.navParams.get('movieName')).then((data)=>{
      console.log(data);
      this.movie=data;
      this.foundMovie=true;
      let tempThis = this;
      setTimeout(function() {
        tempThis.dismissLoading();
      }, 1000);
  });
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('movieName'));
  }


  //private methods only below

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
