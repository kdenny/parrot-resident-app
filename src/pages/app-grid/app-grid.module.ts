import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GridPage } from './app-grid';

@NgModule({
  declarations: [
    GridPage
  ],
  imports: [
    IonicPageModule.forChild(GridPage)
  ],
  exports: [
    GridPage
  ]
})
export class AppGridModule { }
