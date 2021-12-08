import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { UpdatePage } from '../update/update.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
@Pipe({ name: 'replaceUnderscore' })
export class Tab2Page {
  flowers: any = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.dataService
      .processData(btoa('get_all_flowers').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load.payload.data);
          this.flowers = load.payload.data.reverse();
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
      this.flowers = this.flowers.filter((res) => {
        return res.flower_name
          .toLocaleLowerCase()
          .match(event.detail.value.toLocaleLowerCase());
      });
    }
  }

  async update_status(
    status: any,
    index: any,
    flower_id: any,
    flower_obj: any
  ) {
    console.log(flower_obj);
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
        flower_obj.quick_name +
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
                btoa('flower_status').replace('=', ''),
                {
                  flower_id,
                  status,
                },
                2
              )
              .subscribe(
                (dt: any) => {
                  flower_obj.is_available = status;
                  let load = this.dataService.decrypt(dt.a);
                  console.log(load);
                  this.flowers.splice(index, 1, flower_obj);
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

  async update(flower_obj: any, index: any) {
    const modal = await this.modalController.create({
      component: UpdatePage,
      componentProps: {
        flower_obj,
      },
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then((data) => {
      const update_obj = data['data'];

      if (update_obj) {
        console.log(update_obj);
        this.dataService
          .processData(
            btoa('update_flower').replace('=', ''),
            {
              flower_id: flower_obj.flower_id,
              flower_name: update_obj.flower_name,
              flower_price: update_obj.flower_price,
              flower_qty: update_obj.flower_qty,
            },
            2
          )
          .subscribe(
            (dt: any) => {
              let load = this.dataService.decrypt(dt.a);
              console.log(load);
              this.flowers.splice(index, 1, update_obj);
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
