import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  url="http://localhost:5000/admin/"
  url2="http://localhost:5000/"

  getFacultades(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}obtenerFacultades`,httpOptions)
  }
  actualizarFacultad(facultad:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}actualizar`,facultad,httpOptions)
  }

  actualizarSedes(sedes:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}actualizarSede`,sedes,httpOptions)
  }




  getDataForIdFacultad(id_facultad:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}getFacultadForId/${id_facultad}`,httpOptions)
  }

  
  setFacultad(facultad:any){
    const facultade={
      "facultad":facultad.facultad
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}setFacultad`,facultade,httpOptions)
  }




  getProgramas(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}obtenerProgramas`,httpOptions)
  }

  getSedes(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}getSedes`,httpOptions)
  }

  getDataForIdSede(id_sede:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}getDataForIdSede/${id_sede}`,httpOptions)

  }








  actualizarPrograma(programa:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}actualizarPrograma`,programa,httpOptions)
  }


  getDataForIdPrograma(id_programa:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}getProgramaForId/${id_programa}`,httpOptions)
  }

  
  setPrograma(facultad:any){
    const programa={
      "programa":facultad.programa
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}setPrograma`,programa,httpOptions)
  }





  getMaterias(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}obtenerMaterias`,httpOptions)
  }
  actualizarMateria(materia:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}actualizarMateria`,materia,httpOptions)
  }


  getDataForIdMateria(id_materia:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get(`${this.url}getMateriaForId/${id_materia}`,httpOptions)
  }

  
  setMateria(materias:any){
    const materia={
      "materia":materias.materia
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(`${this.url}agregarMateria`,materia,httpOptions)
  }

setSede(sede:any){
  const sedeObject={
    "sede":sede.sede
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setSede`,sedeObject,httpOptions)
}

setSalon(salon:any){
  const salonObject={
    "salon":salon.salon,
    "sede":salon.sede,
    "capacidad":salon.capacidad
  }
  console.log(salonObject);
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setSalon`,salonObject,httpOptions)
}


getSalones(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getSalones`,httpOptions)
}


getDataForIdSalon(id_salon:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getSalonForId/${id_salon}`,httpOptions)
}
getRoles(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getRoles`,httpOptions)
}

getDataForIdRol(id_rol:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getRolForId/${id_rol}`,httpOptions)
}

setRol(rol:any){
  const rolObject={
    "rol":rol.rol,
      }
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setRol`,rolObject,httpOptions)
}


actualizarRol(roles:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}actualizarRol`,roles,httpOptions)


}

getTipo(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getTipo`,httpOptions)
}


actualizarTipo(tipo:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}actualizarTipo`,tipo,httpOptions)


}


setTipo(tipo:any){
  const tipos={
    "tipo_documento":tipo.tipo_documento
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setTipo`,tipos,httpOptions)
}

getDataForIdTipo(id_tipo:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getTipoForId/${id_tipo}`,httpOptions)
}



getEstado(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getEstado`,httpOptions)
}


actualizarEstado(estado:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}actualizarEstado`,estado,httpOptions)


}


setEstado(estado:any){
  const estados={
    "estado":estado.estado
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setEstado`,estados,httpOptions)
}

getDataForIdEstado(id_estado:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getEstadoForId/${id_estado}`,httpOptions)
}






getEstadoTutoria(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getEstadoTutoria`,httpOptions)
}


actualizarEstadoTutoria(estado:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}actualizarEstadoTutoria`,estado,httpOptions)


}


setEstadoTutoria(estado:any){
  const estados={
    "estado_tutoria":estado.estado_tutoria
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setEstadoTutoria`,estados,httpOptions)
}

getDataForIdEstadoTutoria(id_estado_tutoria:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getEstadoTutoriaForId/${id_estado_tutoria}`,httpOptions)
}


getCapacidad(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getCapacidad`,httpOptions)
}


actualizarCapacidad(capacidad:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}actualizarCapacidad`,capacidad,httpOptions)


}


setCapacidad(capacidad:any){
  const capacidades={
    "capacidad":capacidad.capacidad
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.post(`${this.url}setCapacidad`,capacidades,httpOptions)
}

getDataForIdCapacidad(id_capacidad:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  return this.http.get(`${this.url}getCapacidadForId/${id_capacidad}`,httpOptions)
}







}









