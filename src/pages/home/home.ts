import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

//หน้าที่ต้องการเชื่อมต่อกับหน้าโฮม
import { SetBluetoothPage } from './../set-bluetooth/set-bluetooth';
import { SetFavoritesPage } from './../set-favorites/set-favorites';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  count: Number;
  getData: String;
  matches: String[];
  chkMatches: CharacterData[];
  isRecording = false;

  flct1 : string;
  flct2 : string;
  flct3 : string;
  flct4 : string;
  flct5 : string;

  constructor(public loadingCtrl: LoadingController, 
              public navCtrl: NavController,
              private SpeechRecognition :SpeechRecognition, 
              private cd : ChangeDetectorRef, 
              private bluetoothSerial: BluetoothSerial, 
              private screenOrientation: ScreenOrientation, 
              private nativeStorage: NativeStorage,
              private launchNavigator: LaunchNavigator) {
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); //ตั่งค่าแนวนอนของหน้าจอ

    bluetoothSerial.enable(); //เปิดใช้งาน bluetooth ทุกครั้งที่เปิดแอพพลิเคชั้น

    var then = this;
    then.count = 0; //ไว้เพิ่มค่าเมื่อข้อมูลที่ถูกส่งมาเป็น "0"
    
    then.SpeechRecognition.hasPermission() //ขออนุญาตเปิดใช้งานไมค์
    .then((hasPermission: boolean ) => {
      if(!hasPermission){
        then.SpeechRecognition.requestPermission();
      }
    });

    this.nativeStorage.getItem('my-identity-card')
    .then(
      data => {
        this.flct1 = data.location1; //ดึงค่าจากlocal storage มาเก็บไว้ในตัวแปร
        this.flct2 = data.location2;
        this.flct3 = data.location3;
        this.flct4 = data.location4;
        this.flct5 = data.location5;
      },
      error => console.error(error)
    );

    setInterval(function(){ //รีเฟรชทุกๆ 0.001 วินาที
      then.bluetoothSerial.available().then((data: any) => { //เช็คค่าที่ส่งมาจาก bluetooth 
        then.bluetoothSerial.read().then((data: any) => { //อ่านค่า
        then.getData = data;
          if (data == "0" || data == "00" || data == "000" || data == "10" || data == "01" || data == "001") { //ถ้าค่าที่ส่งมาเป็น "0"
            then.count = 1; //ตัวแปร count = 1
          }  
        });
      });

      if(then.count==1){ // เมื่อ count = 1 จะเรียกฟังก์ชั่น speech()
        then.speech();
      }

    },1);

  }

  speech() { //ฟังก์ชั่นการสั่งงานด้วยเสียง
    this.SpeechRecognition.startListening().subscribe(matches =>{ //เรียกไมค์
      this.matches = matches;
      this.cd.detectChanges();
      if(matches[0]==this.flct1){ // ถ้า ข้อความจากตัวแปร matches เท่ากับข้อมูลใน Local storage จะส่งข้อมูลที่พูดไปยัง Google map
        this.launchNavigator.navigate(this.flct1);
      }else if(matches[0]==this.flct2){
        this.launchNavigator.navigate(this.flct2);
      }else if(matches[0]==this.flct3){
        this.launchNavigator.navigate(this.flct3);
      }else if(matches[0]==this.flct4){
        this.launchNavigator.navigate(this.flct4);
      }else if(matches[0]==this.flct5){
        this.launchNavigator.navigate(this.flct5);
      }else if(matches[0]=="ไป"){ //ถ้าพูดคำว่าไปจะเรียกฟังก์ชั่น say()
        this.say();
      }else if(matches[0]=="ปิดจอ"){ //ถ้าพูดคำว่าไปจะเรียกฟังก์ชั่น say(write)
        this.bluetoothSerial.write('close');
      }else if(matches[0]=="เปิดจอ"){ //ถ้าพูดคำว่าไปจะเรียกฟังก์ชั่น say(write)
        this.bluetoothSerial.write('open');
      }
    });
    this.isRecording = true;
    this.count=0; //set ตั้วแปร count เท่ากับ 0

  }  

  say(){  //เมื่อพูดชื่อสถานที่จะส่งค่ข้อมความที่พูดไปยัง google map
    this.SpeechRecognition.startListening().subscribe(matches =>{ //เรียกไมค์
    this.matches = matches;
    this.cd.detectChanges();
    this.launchNavigator.navigate(matches[0]);
  });
  this.isRecording = true;
  this.count=0;
  }

  goTosetfavorites(){ // กดปุ่มเปิดหน้า SetFavoritesPage
    this.navCtrl.push(SetFavoritesPage);
  }

  goTosetbluetooth(){ // กดปุ่มเปิดหน้า SetBluetoothPage
    this.navCtrl.push(SetBluetoothPage);
  }

  navme(address){ //ส่งค่าจากปุ่มที่กดไปยัง google map
    this.launchNavigator.navigate(address);
  }
}
