import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlowerPage } from './add-flower.page';

const routes: Routes = [
  {
    path: '',
    component: AddFlowerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFlowerPageRoutingModule {}
