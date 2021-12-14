import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  checkBox: boolean = false;
  passwordType: string = 'password';
  constructor(
    private dataService: DataService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit(e: any) {
    e.preventDefault();

    let emp_name = e.target[0].value;
    let emp_email = e.target[1].value;
    let emp_password = e.target[2].value;

    this.dataService
      .processData(
        btoa('admin_register').replace('=', ''),
        { emp_name, emp_email, emp_password },
        2
      )
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          console.log(load);
          if (load.status.remarks == 'success') {
            this.presentToast(load.status.message);
            this.router.navigate(['login']);
            e.target.reset();
          } else {
            this.presentToast(load.status.message);
          }
        },
        (er) => {
          this.presentToast('Invalid Inputs');
        }
      );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  onChange() {
    console.log(this.checkBox);
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  back() {
    this.router.navigate(['login']);
  }
}
