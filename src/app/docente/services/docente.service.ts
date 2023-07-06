import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Docente } from "src/app/shared/interfaces/docente.interface";

@Injectable()
export class DocenteService{

    constructor(private readonly http:HttpClient){}

    url="http://localhost:5000/perfil-docente"

    getDataDocente():Observable<Docente>{
        const token=localStorage.getItem('token')
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true'
          })
        };
       return  this.http.get<Docente>(this.url,httpOptions)
    }




}