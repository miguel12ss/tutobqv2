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

    this.httpClient.post(this.url, estudiante).subscribe(
      (response) => {
        console.log(response);

      }
    )
  }

  loginService(correo: string, contraseña: string) {
    let login: Object = {
      correo: correo,
      contraseña: contraseña
    }


    return this.httpClient.post(` ${this.urlGlobal}/login`, login).subscribe(
      (response: any) => {
        console.log(response);
        if (response.rol == 1) {
          this.router.navigate(['estudiante'])
          this.token = response.token
          localStorage.setItem('token',this.token)
          this.id_usuario = response.usuario
          

          
           

          this.componentService.setId(this.id_usuario)
        }else if(response.rol==2){
          this.router.navigate(['docente'])
          this.token=response.token
          localStorage.setItem('token',this.token)
          this.id_usuario = response.usuario
        }else{
          alert('usuario o contraseña  incorrectos')
        }
      }
    )
  }


  insertDocente(docente:Docente){
    const url=this.urlGlobal+`agregar-docente`
    this.httpClient.post(url, docente).subscribe(
      (response) => {
        console.log(response);

      }
    )
  }

  getToken() {
  
    return this.token
  }

}