import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearTutoriaComponent } from './crear-tutoria.component';

const routes: Routes = [
  {path:'',component:CrearTutoriaComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearTutoriaRoutingModule { }
