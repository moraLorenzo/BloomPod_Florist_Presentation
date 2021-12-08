import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { UpdateFlowerPage } from '../update-flower/update-flower.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  bouquets: any = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.dataService
      .processData(btoa('get_all_quick').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          console.log(load.payload.data);
          this.bouquets = load.payload.data.reverse();
          // console.log(this.flowers);
        },
        (er) => {
          console.log('Invalid Inputs');
        }
      );
  }

  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }

  Search(event) {
    // console.log(event.detail.value);
    if (event.detail.value == '') {
      this.ionViewWillEnter();
    } else {
      this.bouquets = this.bouquets.filter((res) => {
        return res.quick_name
          .toLocaleLowerCase()
          .match(event.detail.value.toLocaleLowerCase());
      });
    }
  }

  async update_status(
    status: any,
    index: any,
    quick_id: any,
    bouquet_obj: any
  ) {
    let msg = '';
    if (status == true) {
      status = 1;
      msg = 'Available';
    } else {
      status = 0;
      msg = 'Not Available';
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message:
        'Do you CONFIRM to set the status of <u>' +
        bouquet_obj.quick_name +
        '</u> to <strong>' +
        msg +
        '</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Okay',
          handler: () => {
            this.dataService
              .processData(
                btoa('quick_status').replace('=', ''),
                {
                  quick_id,
                  status,
                },
                2
              )
              .subscribe(
                (dt: any) => {
                  bouquet_obj.is_available = status;
                  let load = this.dataService.decrypt(dt.a);
                  console.log(load);
                  this.bouquets.splice(index, 1, bouquet_obj);
                },
                (er) => {
                  console.log('Invalid Inputs');
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  async update(quick_obj: any, index: any) {
    const modal = await this.modalController.create({
      component: UpdateFlowerPage,
      componentProps: {
        quick_obj,
      },
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then((data) => {
      const update_obj = data['data'];

      if (update_obj) {
        console.log(update_obj);
        this.dataService
          .processData(
            btoa('update_quick').replace('=', ''),
            {
              quick_id: quick_obj.quick_id,
              quick_name: update_obj.quick_name,
              quick_price: update_obj.quick_price,
              quick_details: update_obj.quick_details,
            },
            2
          )
          .subscribe(
            (dt: any) => {
              let load = this.dataService.decrypt(dt.a);
              console.log(load);
              this.bouquets.splice(index, 1, update_obj);
              // this.presentToast('Record Successfully Updated');
            },
            (er) => {
              console.log(er);
              console.log('Invalid Inputs');
            }
          );
      } else {
        console.log('walang laman');
      }
    });

    return await modal.present();
  }
}
