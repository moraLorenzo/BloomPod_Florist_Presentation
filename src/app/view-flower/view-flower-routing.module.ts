import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFlowerPage } from './view-flower.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFlowerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFlowerPageRoutingModule {}
