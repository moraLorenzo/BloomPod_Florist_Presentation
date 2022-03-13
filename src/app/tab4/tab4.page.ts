import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user/user.service';
import { ViewPage } from '../view/view.page';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  orders: any = [];

  show: boolean = false;

  user_name = 'Username';
  user_obj: any;

  selectedTabs = 'completed';
  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService,
    public modalController: ModalController
  ) {
    // this.getAll();
  }

  ionViewWillEnter() {
    // console.log(this.userService.getUser());
    this.user_obj = this.userService.getUser();
    this.user_name = this.user_obj.employee_username;
    this.getAll();
  }

  getAll() {
    this.dataService
      .processData(btoa('getAllOrdersOwner').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          console.log(load);

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

  ngOnInit() {}

  Search(event) {
    // console.log(event.detail.value);
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
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.order_address
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase())
        );
      });
    }
  }

  public async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: 'Do you wish to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.setUserLoggedOut();
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();
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
}
