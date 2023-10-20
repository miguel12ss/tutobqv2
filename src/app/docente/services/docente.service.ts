import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Docente } from "src/app/shared/interfaces/docente.interface";
import { environment } from "src/environment/environment.prod";

@Injectable()
export class DocenteService{

    constructor(private readonly http:HttpClient){}

    public readonly url=environment.apiUrl


    getDataDocente():Observable<Docente>{
        const token=localStorage.getItem('token')
        const id=localStorage.getItem('id_usuario')
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true'
          })
        };
       return  this.http.get<Docente>(`${this.url}user/get_user/${id}`,httpOptions)
    }

    getSalones(){
      const token=localStorage.getItem('token')
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Credentials': 'true'
        })
      };
     return  this.http.get(`${this.url}salones`,httpOptions)
  }

  getMaterias(){
    const token=localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
   return  this.http.get(`${this.url}/materias`,httpOptions)
}

getSedes(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
 return  this.http.get(`${this.url}/sedes`,httpOptions)
}


getDataForId(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
 return  this.http.get(`${this.url}/docente/horario`,httpOptions)
}

getHorarioForId(id_tutoria:string){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.get(`${this.url}/obtenerTutoria/${id_tutoria}`,httpOptions)
}


crearHorario(horario:any){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  
  return  this.http.post(`${this.url}/docente/agregarHorario`,horario,httpOptions)

}

obtenerCapacidadPorSalon(salon:string){
  let salonJson={"salon":salon}
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.post(`${this.url}/obtenerCapacidad`,salonJson,httpOptions)
}
getHorario(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.get(`${this.url}/docente/mostrarHorario`,httpOptions)
}

getHorarioForEstado(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.get(`${this.url}/docente/mostrarHorarioEstado`,httpOptions)
}

getDataForUpdate(id_tutoria:string){

  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.get(`${this.url}/docente/obtenerTutoria/${id_tutoria}`,httpOptions)
}

getEstadosTutoria(){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return  this.http.get(`${this.url}/docente/estadoTutoria`,httpOptions)
}


getListado(id_tutoria:string){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
 return this.http.get(`${this.url}/docente/listado/${id_tutoria}`,httpOptions)
}

eliminarTutoria(id_tutoria:string){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
 return this.http.delete(`${this.url}/docente/eliminarTutoria/${id_tutoria}`,httpOptions).pipe(
  tap((res:any)=>{
    console.log(res);
    
  })
 ).subscribe()
}

pasarLista(data:any){
  const token=localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  this.http.post(`${this.url}/docente/pasarLista`,data,httpOptions).pipe(
  tap((res:any)=>{
    console.log(res);
    
  })
 ).subscribe()
}

}