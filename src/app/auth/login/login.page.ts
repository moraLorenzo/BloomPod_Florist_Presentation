import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  checkBox: boolean = false;
  passwordType: string = 'password';
  constructor(
    private dataService: DataService,
    private router: Router,
    public toastController: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['tabs']);
    }
  }

  onSubmit(e: any) {
    e.preventDefault();

    let emp_email = e.target[0].value;
    let emp_password = e.target[1].value;

    this.dataService
      .processData(
        btoa('admin_login').replace('=', ''),
        { emp_email, emp_password },
        2
      )
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          if (load.status.remarks == 'success') {
            this.presentToast(load.status.message);
            this.userService.setUser(load.payload.name[0]);
            this.router.navigate(['tabs']);
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

  navReg() {
    this.router.navigate(['register']);
  }

  onChange() {
    console.log(this.checkBox);
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
}
