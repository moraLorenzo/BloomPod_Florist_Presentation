import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFlowerPageRoutingModule } from './add-flower-routing.module';

import { AddFlowerPage } from './add-flower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFlowerPageRoutingModule
  ],
  declarations: [AddFlowerPage]
})
export class AddFlowerPageModule {}
