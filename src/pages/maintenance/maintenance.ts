import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, ModalController, Platform } from 'ionic-angular';

import { MaintenanceApi } from '../../providers/maintenance/maintenance';
import { NewMaintenanceRequestModal } from './new-request/new-request';
import { DatePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html'
})

export class MaintenancePage implements OnInit{
  slide: {};
  apartment: '309';

  constructor(public navCtrl: NavController, public menu: MenuController,
              public modalCtrl: ModalController, public maintenance: MaintenanceApi,
              public platform: Platform) {
    this.slide =
          {
            title: "Welcome to the Package Inventory System",
            image: 'assets/img/westlofts-logo.png',
          }
        ;
    var me = this;
  }

  ngOnInit() {
    this.maintenance.getCurrentMaintenanceForApt(309).then(
        results => {
          this.maintenance.currentItems = results;
          console.log(results)
        }
    )

 }

  newItem() {
         let newRequestModal = this.modalCtrl.create(NewMaintenanceRequestModal,
       {
         resident: {
            "id": 1,
            "name": "Kevin Denny",
            "phone_number": "2403156860",
            "apartment_number": "309"
        },
         apartment_no: this.apartment
       }
     );
     newRequestModal.onDidDismiss(data => {
       console.log(data)
     });
     newRequestModal.present();

  }

  goToGrid() {
    this.navCtrl.setRoot('GridPage', {}, {
            animate: true,
            direction: 'back'
          });
  }

  viewHistorical() {
    console.log("View historical, duh!")
  }




}
