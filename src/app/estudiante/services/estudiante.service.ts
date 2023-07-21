import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { options } from '@fullcalendar/core/preact';
import { Observable, tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private url="http://127.0.0.1:5000/"
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

  getPasswordForId(data:any):Observable<any>{
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

  // subirFoto(file:any){

   
    
  //   return this.httpClient.post(url,file,httpOptions)

  // }

getHorarios(){
  const token=localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
  return this.httpClient.get(`${this.url}mostrarHorarios`,httpOptions)
}

getHorarioForId(id:number){
  const token=localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
 return this.httpClient.get(`${this.url}mostrarHorariosId/${id}`,httpOptions)
}


getHorarioForIdEstudiante(){
  const token=localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
 return this.httpClient.get(`${this.url}mostrarHorariosEstudiante`,httpOptions)
}

agendarTutorias(id_tutoria:number,id_estado_tutoria:number){
  let id_agendar={"id_tutoria":id_tutoria, "id_estado_tutoria":id_estado_tutoria}
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
return this.httpClient.post(`${this.url}agendar`,id_agendar,httpOptions)
}

obtenerTutoriasEstudiante(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
return this.httpClient.get(`${this.url}mostrarTutoriasEstudiante`,httpOptions)
}


cancelarTutoria(id_tutoria:string){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
 this.httpClient.post(`${this.url}cancelarTutoria`,id_tutoria,httpOptions).pipe(
  tap((res:any)=>{
    console.log(res);
    
  })
 ).subscribe()
}

}





