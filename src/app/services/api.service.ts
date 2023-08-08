import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"
import { Injectable } from "@angular/core"
import { Estudiante } from "../shared/interfaces/Estudiante.interface";
import { Router } from "@angular/router";
import { ComponentService } from "../components/services/components.service";
import { Docente } from "../shared/interfaces/docente.interface";
@Injectable()
export class ApiService {
  private urlGlobal = 'http://127.0.0.1:5000/'
  private url = "http://127.0.0.1:5000/registro"
  private token = ""
  private id_usuario: number = 0
  constructor(private readonly httpClient: HttpClient, private componentService: ComponentService, private router: Router) {

  }
  insertData(estudiante: Estudiante) {
    console.log('entras');
    console.log(estudiante);

    return this.httpClient.post(this.url, estudiante)
  }

  loginService(correo: string, contraseña: string):Observable<any> {
    let login: Object = {
      correo: correo,
      contraseña: contraseña
    }

    return this.httpClient.post(` ${this.urlGlobal}login`, login)
  }


  insertDocente(docente:Docente){
    const url=this.urlGlobal+`agregar-docente`
    return this.httpClient.post(url, docente)
    
  }

  getToken() {
  
    return this.token
  }


  forgot(email:string){
return this.httpClient.post(`${this.urlGlobal}forgot`,email)
  }




}