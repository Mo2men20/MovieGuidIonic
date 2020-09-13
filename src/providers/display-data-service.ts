import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DisplayDataModel } from '../Models/DisplayDataModel';
import {MovieInfo} from '../Models/MovieInfoModel';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';



@Injectable()
export class DisplayDataService {

  private topRatedURL:string='https://api.themoviedb.org/3/movie/popular?api_key=6d819b60ec90ad860007e9598311ab31&language=en-US&page=1';
  private autocompleteURL:string='https://api.themoviedb.org/3/search/movie?api_key=6d819b60ec90ad860007e9598311ab31&query=';
  private imgURL:string='http://image.tmdb.org/t/p/w185/';
  private movieInfoURL:string='http://www.omdbapi.com/?t=';
  private movies:DisplayDataModel[]=[];
  constructor(private http: Http) {}

  public GetTopRated():Promise<any>{ 
      return new Promise<DisplayDataModel[]>((resolve,reject)=>{
       


          this.http.get(this.topRatedURL).map((res)=>res.json()).toPromise().then(data=>{
           
            this.movies=[];

            data.results.forEach(element => {
              this.movies.push(new DisplayDataModel(element.title,element.vote_average,element.release_date,(this.imgURL+element.poster_path),element.overview));
            });

            resolve(this.movies);
          }).catch(err=>{reject(err)});

      });
  }

  public GetAutoComplete(title:string):Promise<any>{
    return new Promise<any>((resolve,reject)=>{

      let titles:string[]=[];
      let query:string=this.autocompleteURL+title;
      this.http.get(query).map((res)=>res.json()).toPromise().then((data)=>{

        data.results.forEach(element => {
          titles.push(element.title);
        });
        console.log(query);
        resolve(titles);

      }).catch(err=>reject(err));

    });
  }

  public GetMovieInfo(title:string):Promise<any>{

    title = title.trim();
    
    return new Promise<any>((resolve,reject)=>{

        let tempURL = this.movieInfoURL+title.replace(' ','+');

        this.http.get(tempURL).map(res=><MovieInfo>res.json()).toPromise().then(data=>{
          resolve(data);
        }).catch(err=>resolve(err));

    });

  }

}
