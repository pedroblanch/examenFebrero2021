import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'editar-alumno',
    loadChildren: () => import('./editar-alumno/editar-alumno.module').then( m => m.EditarAlumnoPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'ejercicio1',
    loadChildren: () => import('./ejercicio1/ejercicio1.module').then( m => m.Ejercicio1PageModule)
  },
  {
    path: 'ejercicio2',
    loadChildren: () => import('./ejercicio2/ejercicio2.module').then( m => m.Ejercicio2PageModule)
  },
  {
    path: 'ejercicio3',
    loadChildren: () => import('./ejercicio3/ejercicio3.module').then( m => m.Ejercicio3PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
