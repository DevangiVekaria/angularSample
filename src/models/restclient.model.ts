export class RestClient {
    id: number;
    url: string;
    type: string;
    urlType:string;

    constructor(id:number, url:string, type:string,urlType:string){
        this.id = id;
        this.url = url;
        this.type=type;
        this.urlType = urlType;
    }
}