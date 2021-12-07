import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  orders: any = [];

  show: boolean = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService
  ) {
    // this.getAll();
  }

  ionViewWillEnter() {
    this.getAll();
  }

  getAll() {
    this.dataService
      .processData(btoa('getCompleted').replace('=', ''), null, 2)
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
}
