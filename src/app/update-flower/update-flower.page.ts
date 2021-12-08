import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-update-flower',
  templateUrl: './update-flower.page.html',
  styleUrls: ['./update-flower.page.scss'],
})
export class UpdateFlowerPage implements OnInit {
  @Input() quick_obj: any;

  quick_name: string;
  quick_price: number;
  quick_details: string;

  constructor(
    public modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.quick_obj);
    this.quick_name = this.quick_obj.quick_name;
    this.quick_price = this.quick_obj.quick_price;
    this.quick_details = this.quick_obj.quick_details;
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
            if (this.quick_name && this.quick_price && this.quick_details) {
              this.quick_obj.quick_name = this.quick_name;
              this.quick_obj.quick_price = this.quick_price;
              this.quick_obj.quick_details = this.quick_details;
              this.modalController.dismiss(this.quick_obj);
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
