import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  @Input() flower_obj: any;

  flower_name: string;
  flower_price: number;
  flower_qty: number;

  constructor(
    public modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.flower_obj);
    this.flower_name = this.flower_obj.flower_name;
    this.flower_price = this.flower_obj.flower_price;
    this.flower_qty = this.flower_obj.flower_qty;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async dismiss() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: 'Do you confirm to submit the changes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            if (this.flower_name && this.flower_price && this.flower_qty) {
              this.flower_obj.flower_name = this.flower_name;
              this.flower_obj.flower_price = this.flower_price;
              this.flower_obj.flower_qty = this.flower_qty;
              this.modalController.dismiss(this.flower_obj);
            } else {
              this.presentToast('Invalid Inputs');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
