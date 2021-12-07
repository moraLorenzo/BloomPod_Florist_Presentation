import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
@Pipe({ name: 'replaceUnderscore' })
export class Tab2Page {
  flowers: any = [];

  constructor(private dataService: DataService, private router: Router) {}

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

  // add() {
  //   this.router.navigateByUrl('/add');
  // }
}
