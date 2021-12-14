import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { DataService } from '../services/data/data.service';
import { ViewPage } from '../view/view.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  orders: any = [];

  show: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    public modalController: ModalController
  ) {
    this.getAll();
  }

  ionViewWillEnter() {
    this.getAll();
  }
  getAll() {
    this.dataService
      .processData(btoa('getAllOrders').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);

          try {
            if (load.payload.orders) {
              this.show = false;

              this.orders = load.payload.orders;
            }
          } catch (err) {
            this.show = true;
          }
        },
        (er) => {
          console.log('Invalid Inputs');
        }
      );
  }

  async view(order_obj: any, index: any) {
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: { order_obj: order_obj },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        if (data.data.order_status == 'Completed') {
          this.orders.splice(index, 1);
        } else {
          this.orders.splice(index, 1, data.data);
        }

        console.log(this.orders.length);
        if (this.orders.length == 0) {
          this.getAll();
        } else {
          console.log('false');
        }
      }
    });

    return await modal.present();
  }

  Search(event) {
    if (event.detail.value == '') {
      this.ionViewWillEnter();
    } else {
      this.orders = this.orders.filter((res) => {
        return (
          res.order_payment
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.order_status
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.order_time
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.order_date
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase())
        );
      });
    }
  }

  async doRefresh(event) {
    await this.dataService
      .processData(btoa('getAllOrders').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          try {
            if (load.payload.orders) {
              this.show = false;

              this.orders = load.payload.orders;
              event.target.complete();
            }
          } catch (err) {
            this.show = true;
            event.target.complete();
          }
        },
        (er) => {
          console.log('Invalid Inputs');
          event.target.complete();
        }
      );
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
