import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class ComponentService{

private url="http://127.0.0.1:5000/"
private indice=0

constructor(private httpClient:HttpClient){}
get getPrograms():Observable<Object>{
    return this.httpClient.get(`${this.url}programas`)

}

getFacultades(){
    return this.httpClient.get(`${this.url}facultades`)
  }


get getTipoDocumento():Observable<Object>{
    return this.httpClient.get(`${this.url}tipo-documento`)

}

get getId():number{
    return this.indice
}

setId(indice:number){
    console.log('el indice es',indice);
    
this.indice=indice
}


}