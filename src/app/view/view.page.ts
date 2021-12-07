import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlowersService } from '../services/flower/flower.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DataService } from '../services/data/data.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  @Input() order_obj: any;

  // order_obj: any = [];
  content: any = [];

  person: string = '';
  contact: string = '';

  date: any;
  time: any;
  address: any;
  landmark: any;

  total: any;
  status: any;
  payment: any;

  message: any;
  purpose: any;
  order_id: any;

  show: boolean = false;
  link: string = '';

  recipient: string;

  constructor(
    private router: Router,
    private fs: FlowersService,
    private photoViewer: PhotoViewer,
    private dataService: DataService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.show = false;
    // this.order_obj = history.state.data;
    console.log(this.order_obj);

    this.person =
      this.order_obj.user_firstname + ' ' + this.order_obj.user_lastname;
    this.contact = this.order_obj.order_contact;

    this.date = this.order_obj.order_date;
    this.time = this.order_obj.order_time;
    this.address = this.order_obj.order_address;
    this.landmark = this.order_obj.order_landmark;
    this.message = this.order_obj.order_message;
    this.purpose = this.order_obj.order_purpose;
    this.order_id = this.order_obj.order_id;

    this.total = this.order_obj.order_totalprice;
    this.status = this.order_obj.order_status;

    this.recipient = this.order_obj.order_recipient;

    if (this.order_obj.order_flower == 'Generated Flower Bouquet') {
      if (this.order_obj.quantity == 6) {
        this.content = this.fs.six(
          this.order_obj.main_flower,
          this.order_obj.secondary_flower
        );
      } else if (this.order_obj.quantity == 9) {
        this.content = this.fs.nine(
          this.order_obj.main_flower,
          this.order_obj.secondary_flower
        );
      } else if (this.order_obj.quantity == 12) {
        this.content = this.fs.twelve(this.order_obj.main_flower, [
          this.order_obj.secondary_flower,
          this.order_obj.tertiary_flower,
        ]);
      }
    } else if (this.order_obj.order_flower == 'Generated Bouquet') {
      if (this.order_obj.quantity == 6) {
        this.content = this.fs.six(
          this.order_obj.main_flower,
          this.order_obj.secondary_flower
        );
      } else if (this.order_obj.quantity == 9) {
        this.content = this.fs.nine(
          this.order_obj.main_flower,
          this.order_obj.secondary_flower
        );
      } else if (this.order_obj.quantity == 12) {
        this.content = this.fs.twelve(this.order_obj.main_flower, [
          this.order_obj.secondary_flower,
          this.order_obj.tertiary_flower,
        ]);
      }
    } else {
      this.link =
        'http://192.168.100.128/bloompod_api/quick/' +
        this.order_obj.order_flower +
        '.jpg';
      this.show = true;
    }

    this.payment =
      'http://192.168.100.128/bloompod_api/images/' + this.order_obj.payment;
  }

  back() {
    this.modalController.dismiss();
    // this.router.navigate(['tabs/tab4']);
  }

  photo() {
    this.photoViewer.show(this.payment);
  }

  async change(status: string) {
    console.log('hello');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message:
        'Do you confirm to turn the status of this transaction to <strong>' +
        status +
        '</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.dataService
              .processData(
                btoa('change_status').replace('=', ''),
                { status, order_id: this.order_id },
                2
              )
              .subscribe(
                (dt: any) => {
                  // console.log(dt.a);
                  let load = this.dataService.decrypt(dt.a);
                  // console.log(load.msg);
                  if (load.msg == 'Successfully Updated') {
                    this.order_obj.order_status = status;
                    if (
                      status == 'Completed' &&
                      this.order_obj.order_flower == 'Generated Flower Bouquet'
                    ) {
                      console.log(this.order_obj);
                      if (this.order_obj.quantity == 6) {
                        console.log(this.order_obj.main_flower);
                        console.log(this.order_obj.secondary_flower);
                        this.dataService
                          .processData(
                            btoa('update_quantity').replace('=', ''),
                            {
                              quantity: this.order_obj.quantity,
                              main_flower: this.order_obj.main_flower,
                              secondary_flower: this.order_obj.secondary_flower,
                            },
                            2
                          )
                          .subscribe(
                            (dt: any) => {},
                            (er) => {
                              console.log('Invalid Inputs');
                            }
                          );
                      } else if (this.order_obj.quantity == 9) {
                        console.log(this.order_obj.main_flower);
                        console.log(this.order_obj.secondary_flower);
                        this.dataService
                          .processData(
                            btoa('update_quantity').replace('=', ''),
                            {
                              quantity: this.order_obj.quantity,
                              main_flower: this.order_obj.main_flower,
                              secondary_flower: this.order_obj.secondary_flower,
                            },
                            2
                          )
                          .subscribe(
                            (dt: any) => {},
                            (er) => {
                              console.log('Invalid Inputs');
                            }
                          );
                      } else if (this.order_obj.quantity == 12) {
                        console.log(this.order_obj.main_flower);
                        console.log(this.order_obj.secondary_flower);
                        console.log(this.order_obj.tertiary_flower);
                        this.dataService
                          .processData(
                            btoa('update_quantity').replace('=', ''),
                            {
                              quantity: this.order_obj.quantity,
                              main_flower: this.order_obj.main_flower,
                              secondary_flower: this.order_obj.secondary_flower,
                              tertiary_flower: this.order_obj.tertiary_flower,
                            },
                            2
                          )
                          .subscribe(
                            (dt: any) => {},
                            (er) => {
                              console.log('Invalid Inputs');
                            }
                          );
                      }
                    }
                    this.modalController.dismiss(this.order_obj);
                  }
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
}
