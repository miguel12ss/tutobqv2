import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'auth/registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'estudiante',
    loadChildren: () =>
      import('./estudiante/estudiante.module').then((m) => m.EstudianteModule),
  },
  {
    path: 'docente',
    loadChildren: () =>
      import('./docente/docente.module').then((m) => m.DocenteModule),
  },

  {
path: 'admin',
    loadChildren: () =>
      import('./administrador/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
