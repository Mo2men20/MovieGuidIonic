export class DisplayDataModel{
    public title:string;
    public vote_average:number;
    public release_date:string;
    public poster_path:string;
    public overview:string;

    public constructor(title:string,vote_average:number,release_date:string,poster_path:string,overview:string){
        this.title=title;
        this.poster_path=poster_path;
        this.release_date=release_date;
        this.vote_average=vote_average;
        this.overview=overview;
    }
}