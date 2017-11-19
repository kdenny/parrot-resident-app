import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NewMaintenanceRequestModal } from './new-request';

@NgModule({
  declarations: [
    NewMaintenanceRequestModal
  ],
  exports: [
    NewMaintenanceRequestModal
  ]
})
export class NewRequestModule { }
