export class Params {
    restClientId: number;
    key: string;
    value: any;
    constructor(restClientId:number, key:string, value:any){
        this.restClientId = restClientId;
        this.key = key;
        this.value=value;
    }
}