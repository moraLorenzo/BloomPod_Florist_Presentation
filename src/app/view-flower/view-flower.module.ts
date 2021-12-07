import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFlowerPageRoutingModule } from './view-flower-routing.module';

import { ViewFlowerPage } from './view-flower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFlowerPageRoutingModule
  ],
  declarations: [ViewFlowerPage]
})
export class ViewFlowerPageModule {}
