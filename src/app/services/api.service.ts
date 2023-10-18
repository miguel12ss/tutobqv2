import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"
import { Injectable } from "@angular/core"
import { Estudiante } from "../shared/interfaces/Estudiante.interface";
import { Router } from "@angular/router";
import { ComponentService } from "../components/services/components.service";
import { Docente } from "../shared/interfaces/docente.interface";
import { environment } from "src/environment/environment.prod";
@Injectable()
export class ApiService {
  private url =environment.apiUrl
   token=""
  constructor(private readonly httpClient: HttpClient, private componentService: ComponentService, private router: Router) {

  }
  insertData(estudiante: Estudiante) {
    
    return this.httpClient.post(`${this.url}/estudiante/registro`, estudiante)
  }

  loginService(correo: string, contraseña: string):Observable<any> {
    let login: Object = {
      correo: correo,
      contraseña: contraseña
    }

    return this.httpClient.post(` ${this.url}/auth/login`, login)
  }


  insertDocente(docente:Docente){
    return this.httpClient.post(`${this.url}/admin/agregar-docente`, docente)
    
  }

  getToken() {
  
    return sessionStorage.getItem('token')
  }
  renewToken(currentToken: string): Observable<any> {
    const body = { token: currentToken };

    return this.httpClient.post(`${this.url}/renew-token`, body);
  }

  isLogged():boolean{
      const authToken = this.getToken();
      return authToken !== ""; // Si hay un token, el usuario está autenticado
    }
  

  forgot(email:string){
return this.httpClient.post(`${this.url}/auth/forgot`,email)
  }


  getProgramas(id_facultad:any){
    console.log(id_facultad);
    
    return this.httpClient.get(`${this.url}facultadxprograma/${id_facultad}`)
  }





}