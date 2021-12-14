import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../services/data/data.service';

import { Quick } from '../models/quick';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-flower',
  templateUrl: './add-flower.page.html',
  styleUrls: ['./add-flower.page.scss'],
})
export class AddFlowerPage implements OnInit {
  res: any;

  constructor(
    private router: Router,
    private camera: Camera,
    public dataService: DataService,
    public toastController: ToastController
  ) {
    this.quickPayload = new Quick();
  }
  imgURL: string;

  quickPayload: Quick;

  ngOnInit() {}

  back() {
    this.router.navigate(['tabs/tab3']);
  }

  getGallery() {
    this.camera
      .getPicture({
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
      })
      .then(async (res) => {
        let result = 'data:image/jpeg;base64,' + res;
        this.imgURL = result;
        console.log(result);
      })
      .catch((e) => {
        console.log();
      });
  }

  async add(e: any) {
    e.preventDefault();
    this.quickPayload.quick_name = e.target[0].value;
    this.quickPayload.quick_price = e.target[1].value;
    this.quickPayload.quick_details = e.target[2].value;

    if (this.imgURL == undefined || this.imgURL == null) {
      this.presentToast('Please Include an Image');
    } else {
      this.quickPayload.quick_img = this.imgURL;

      this.res = await this.dataService.addQuick(this.quickPayload);
      console.log(this.res);
      if (this.res.message == 'UPLOAD SUCCEED') {
        console.log(this.res.message);
        e.target.reset();
        this.imgURL = '';
        this.router.navigate(['tabs/tab3']);
      } else {
        console.log(this.res.message);
      }
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
