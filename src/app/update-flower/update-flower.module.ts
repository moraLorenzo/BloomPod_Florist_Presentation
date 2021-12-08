import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFlowerPageRoutingModule } from './update-flower-routing.module';

import { UpdateFlowerPage } from './update-flower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateFlowerPageRoutingModule
  ],
  declarations: [UpdateFlowerPage]
})
export class UpdateFlowerPageModule {}
