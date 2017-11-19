import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, ModalController, Platform } from 'ionic-angular';

import { ApartmentAutocompleteService } from '../../providers/autocomplete/autocomplete';
import { ApartmentFilterService } from '../../providers/autocomplete/filter';

import { Api } from '../../providers/api/api';
import { PickupModal } from '../pickup/pickup';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{
  slide: {};
  showSkip = true;
  dir: string = 'ltr';
  mode: string = null;
  isPickup = false;
  isDelivery = false;
  searchText;
  currentPackages = [];

  constructor(public navCtrl: NavController, public menu: MenuController,
              public modalCtrl: ModalController,
              public platform: Platform, public autocomplete: ApartmentAutocompleteService, public api: Api, public filter: ApartmentFilterService) {
    this.dir = platform.dir();
    this.autocomplete.selectedApartment = null;
    this.slide =
          {
            title: "Welcome to the Package Inventory System",
            image: 'assets/img/westlofts-logo.png',
          }
        ;
    var me = this;
    var i = 0;
    var oldText;
    setInterval(function(){
        if (me.filter.searchText == '' || me.filter.searchText == ' ') {
          console.log("Nulling")
          me.filter.searchText = null;
        }
        else {
          let newText = me.filter.searchText;
          if (oldText && newText) {
            if (newText.length >= oldText.length) {
              oldText = me.filter.searchText;
            }
            else {
              if (newText.length < oldText.length) {
                console.log("Nulling")
                me.filter.searchText = null;
              }
            }
          }
          else {
            oldText = newText;
          }


         console.log(me.filter.searchText)
        }
    }, 1000);
  }

  ngOnInit() {
    this.api.getPackages().then(
        results => {
          this.api.packages = results;
          console.log(results)
        }
    )
    let seconds = 0;
    var me = this;


 }

  recordDelivery() {
    this.mode = 'delivery';
    console.log(this.mode)
    this.navCtrl.setRoot('DeliveryPage', {}, {
            animate: true,
            direction: 'forward'
          });
  }

  recordPickup(apartment) {

    this.api.getPackagesByApartment(apartment).then(data => {
       let pickupModal = this.modalCtrl.create(PickupModal,
         {
           packages: data,
           apartment_no: apartment
         }
       );
       pickupModal.onDidDismiss(data => {
         this.api.packages = data;
       });
       pickupModal.present();
    })

  }

  onChange(event) {
    var me = this;
    var oldText;
    if (me.filter.searchText == '' || me.filter.searchText == ' ') {
          console.log("Nulling")
          me.filter.searchText = null;
        }
        else {
          let newText = me.filter.searchText;
          if (oldText && newText) {
            if (newText.length >= oldText.length) {
              oldText = me.filter.searchText;
            }
            else {
              if (newText.length < oldText.length) {
                console.log("Nulling")
                me.filter.searchText = null;
              }
            }
          }
          else {
            oldText = newText;
          }


         console.log(me.filter.searchText)
        }
  }


  itemSelected(event) {
    this.autocomplete.selectedApartment = event;
      this.navCtrl.setRoot('DeliveryPage', {}, {
        animate: true,
        direction: 'forward'
      });

  }

  goToGrid() {
    this.navCtrl.setRoot('GridPage', {}, {
            animate: true,
            direction: 'back'
          });
  }

}
