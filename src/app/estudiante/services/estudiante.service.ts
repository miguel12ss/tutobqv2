import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private httpClient:HttpClient,private loginservice:ApiService) { }

 

  getDataForId(indice:number):Observable<any>{
    
    const url=`http://127.0.0.1:5000/perfil/${indice}`
    return this.httpClient.get(url)
  }

  getPasswordForId(id_usuario:number,data:any):Observable<any>{
    const url=`http://127.0.0.1:5000/cambiar-contraseña/${id_usuario}`

    return this.httpClient.post(url,data)
  }


}
