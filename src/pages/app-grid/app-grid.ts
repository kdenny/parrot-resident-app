import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, ModalController, Platform } from 'ionic-angular';


//import { Api } from '../../providers/api/api';
//import { PickupModal } from '../pickup/pickup';


@IonicPage()
@Component({
  selector: 'page-app-grid',
  templateUrl: 'app-grid.html'
})

export class GridPage implements OnInit{
  slide: {};
  categories;

  constructor(public navCtrl: NavController, public menu: MenuController,
              public modalCtrl: ModalController,
              public platform: Platform) {
    //this.dir = platform.dir();
    this.slide =
          {
            title: "Welcome to the Package Inventory System",
            image: 'assets/img/west-lofts-banner-2.png',
          }
        ;
  }

  ngOnInit() {
    this.categories = [
      {
        name: 'Maintenance',
        link: "/maintenance",
        icon: 'assets/img/maintenance.png',
        pageName: "MaintenancePage"
      },
      {
        name: 'Packages',
        link: "/packages",
        icon: 'assets/img/package.png',
        pageName: "HomePage"
      },
      {
        name: 'Other app here',
        link: "/other",
        icon: 'assets/img/question.png'
      },
      {
        name: 'Call front desk',
        link: "/call",
        icon: 'assets/img/phone.png'
      }

    ];

 }

  recordDelivery() {
    this.navCtrl.setRoot('DeliveryPage', {}, {
            animate: true,
            direction: 'forward'
          });
  }

  goToApp(category) {

    if (category.pageName) {
      this.navCtrl.setRoot(category.pageName, {}, {
            animate: true,
            direction: 'forward'
          });
    }

  }

}
