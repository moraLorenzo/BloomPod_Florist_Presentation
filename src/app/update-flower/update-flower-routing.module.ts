import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateFlowerPage } from './update-flower.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateFlowerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateFlowerPageRoutingModule {}
