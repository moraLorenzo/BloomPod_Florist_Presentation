import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Flower } from '../models/flower';
import { DataService } from '../services/data/data.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  res: any;

  constructor(
    private router: Router,
    private camera: Camera,
    public dataService: DataService,
    public toastController: ToastController
  ) {
    this.flowerPayload = new Flower();
  }
  imgURL: string;

  flowerPayload: Flower;

  ngOnInit() {}

  back() {
    this.router.navigate(['tabs/tab2']);
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
    this.flowerPayload.flower_name = e.target[0].value;
    this.flowerPayload.flower_price = e.target[1].value;
    this.flowerPayload.flower_qty = e.target[2].value;

    if (this.imgURL == undefined || this.imgURL == null) {
      this.presentToast('Please Include an Image');
    } else {
      this.flowerPayload.flower_img = this.imgURL;

      this.res = await this.dataService.addImage(this.flowerPayload);
      console.log(this.res);
      if (this.res.message == 'UPLOAD SUCCEED') {
        this.presentToast(this.res.message);
        this.imgURL = '';
        e.target.reset();
        this.router.navigate(['tabs/tab4']);
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
