import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { DeliveryPage } from "../delivery/delivery";
import {Api} from "../../providers/providers";

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  private eventId: number;
  public eventTitle: string;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _barcodeScanner: BarcodeScanner,
    public api: Api
  ) {
  }

  ionViewDidLoad() {
    this.eventId = this._navParams.get('eventId');
    this.eventTitle = this._navParams.get('eventTitle');

    this.buttonText = "Scan";
    this.loading = false;
  }

  public scanQR() {
    this.buttonText = "Loading..";
    this.loading = true;

    this._barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.buttonText = "Scan";
        this.loading = false;
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
      this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

  private goToResult(barcodeData) {

    console.log(barcodeData)
    this.api.checkBarcode(barcodeData).then(data => {
      this.api.scan = data;
      this._nav.push(DeliveryPage, {
        scannedText: barcodeData.text
      });
    });

  }

  public goBack() {
    this._nav.push(DeliveryPage, {
        scannedText: 'SDvlqsqHc4_001_v'
      });
  }

  private checkPass(data) {
  }
}
