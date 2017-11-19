import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ModalController, ViewController, NavParams } from 'ionic-angular';
import {MaintenanceApi} from '../../../providers/maintenance/maintenance';

@Component({
  selector: 'new-maintenance',
  templateUrl: 'new-request.html'
})
export class NewMaintenanceRequestModal{
  newItem;
  apartment_no;
  resident;
  todo = {};
  //confirmMode = false;
  //isSigned = false;

 constructor(public viewCtrl: ViewController, public navParams: NavParams, public api: MaintenanceApi) {
   this.resident = this.navParams.get('resident');
   this.apartment_no = this.navParams.get('apartment_no');
   this.todo['resident'] = this.resident;
   this.todo['apartment_no'] = this.resident.apartment_number;
 }

 dismiss() {
   console.log(this.todo);
   this.todo['resident'] = this.resident.id;
   this.newItem = {
     'apartment_no': this.todo['apartment_no'],
     'description': this.todo['description']
   }

   this.api.newMaintenance(this.newItem).then(data => {
     this.api.getCurrentMaintenanceForApt(this.newItem.apartment_no).then(
        results => {
          this.api.currentItems = results;
          console.log(results)
          this.viewCtrl.dismiss(results);
        }
    )
   });
 }


}
