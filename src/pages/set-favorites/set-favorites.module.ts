import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetFavoritesPage } from './set-favorites';

@NgModule({
  declarations: [
    SetFavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(SetFavoritesPage),
  ],
})
export class SetFavoritesPageModule {}
