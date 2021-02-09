import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ejercicio3Page } from './ejercicio3.page';

const routes: Routes = [
  {
    path: '',
    component: Ejercicio3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ejercicio3PageRoutingModule {}
