import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { options } from '@fullcalendar/core/preact';
import { Observable } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private httpClient:HttpClient,private loginservice:ApiService) { }

 

  getDataForId():Observable<any>{
    const token=localStorage.getItem('token');
    console.log('entras a getDataForId',token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    
    const url=`http://127.0.0.1:5000/perfil`
    
    return this.httpClient.get(url,httpOptions)
  }

  getPasswordForId(id_usuario:number,data:any):Observable<any>{
    const token=localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    const url=`http://127.0.0.1:5000/cambiar-contraseña`

    return this.httpClient.post(url,data,httpOptions)
  }


}
