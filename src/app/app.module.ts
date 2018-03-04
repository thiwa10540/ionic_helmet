import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { NativeStorage } from '@ionic-native/native-storage';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SetFavoritesPage } from './../pages/set-favorites/set-favorites';
import { SetBluetoothPage } from './../pages/set-bluetooth/set-bluetooth';
import { TabsPage } from './../pages/tabs/tabs';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetFavoritesPage,
    SetBluetoothPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetFavoritesPage,
    SetBluetoothPage,
    TabsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    BluetoothSerial,
    SpeechRecognition,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LaunchNavigator
  ]
})
export class AppModule {}
