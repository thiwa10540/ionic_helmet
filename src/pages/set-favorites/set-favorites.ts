import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-set-favorites',
  templateUrl: 'set-favorites.html',
})
export class SetFavoritesPage {
  location1: string;
  location2: string;
  location3: string;
  location4: string;
  location5: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,public alertCtrl: AlertController, private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); //ตั่งค่าแนวนอนของหน้าจอ
  }

  public storeIdentity(): void {
    // เก็บข้อมูลแบบ json ใส่ตัวแปร lct
    var lct = [
      {lct1: this.location1},
      {lct2: this.location2},
      {lct3: this.location3},
      {lct4: this.location4},
      {lct5: this.location5}
    ];
    // เก็บข้อมูลจากตัวแปร lct เข้า Local storage 
    this.nativeStorage.setItem('my-identity-card', {
      location1: lct["0"].lct1, 
      location2: lct["1"].lct2,
      location3: lct["2"].lct3,
      location4: lct["3"].lct4,
      location5: lct["4"].lct5 
    })
    .then(
      () => {
        // เมื่อบันทึกสำเร็จจะ alert ข้อมความขึ้นมา
        let alert = this.alertCtrl.create({
          title: 'New Location',
          subTitle: 'Your save data success',
          buttons: ['OK']
        });
        alert.present();
        
      },
      error => console.error('Error storing item', error)
    );
  }

  public getMuname(): void {
    // ดึงข้อมูลจาก Local storage ไปแสดงที่ textbox
    this.nativeStorage.getItem('my-identity-card')
    .then(
      data => {
        this.location1 = data.location1;
        this.location2 = data.location2;
        this.location3 = data.location3;
        this.location4 = data.location4;
        this.location5 = data.location5;
      },
      error => console.error(error)
    );
  }

}

