import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Docente } from "src/app/shared/interfaces/docente.interface";

@Injectable()
export class DocenteService{

    constructor(private readonly http:HttpClient){}

    url="http://localhost:5000/perfil-docente"
    urlGlobal="http://localhost:5000/"

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
     return  this.http.get(`${this.urlGlobal}salon`,httpOptions)
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
   return  this.http.get(`${this.urlGlobal}materias`,httpOptions)
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
 return  this.http.get(`${this.urlGlobal}sedes`,httpOptions)
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
 return  this.http.get(`${this.urlGlobal}horario`,httpOptions)
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
  
  return  this.http.post(`${this.urlGlobal}agregarHorario`,horario,httpOptions)

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
  return  this.http.post(`${this.urlGlobal}obtenerCapacidad`,salonJson,httpOptions)
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
  return  this.http.get(`${this.urlGlobal}mostrarHorario`,httpOptions)
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
  return  this.http.get(`${this.urlGlobal}obtenerTutoria/${id_tutoria}`,httpOptions)
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
  return  this.http.get(`${this.urlGlobal}estadoTutoria`,httpOptions)
}

}