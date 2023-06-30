import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs"
import {Injectable} from "@angular/core"
import { Estudiante } from "../shared/interfaces/Estudiante.interface";
@Injectable()
export class ApiService{

    private  url="http://localhost:5000/registro"
constructor(private readonly httpClient:HttpClient){

}
    insertData(estudiante:Estudiante){
        console.log('entras');
        
      this.httpClient.post(this.url,estudiante).subscribe(
        (response)=>{
            console.log(response);
            
        }
      )
    } 
}