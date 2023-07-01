import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs"
import {Injectable} from "@angular/core"
import { Estudiante } from "../shared/interfaces/Estudiante.interface";
import { Router } from "@angular/router";
@Injectable()
export class ApiService{
    private urlGlobal='http://localhost:5000/'
    private  url="http://localhost:5000/registro"
    private token=""
constructor(private readonly httpClient:HttpClient,private router:Router){

}
    insertData(estudiante:Estudiante){
        console.log('entras');
        
      this.httpClient.post(this.url,estudiante).subscribe(
        (response)=>{
            console.log(response);
            
        }
      )
    }
    
    loginService(correo:string,contraseña:string){
      let login:Object={
        correo:correo,
        contraseña:contraseña
      }
    
      
    return  this.httpClient.post( ` ${this.urlGlobal}/login`,login).subscribe(
        (response:any)=>{
          console.log(response);
          if(response.rol==1){
           this.router.navigate(['estudiante'])
           this.token=response.token
            
          }
        }
      )
    }

    getToken(){
      return this.token
    }

}