import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

//import {ApartmentAutocompleteService} from '../autocomplete/autocomplete';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class MaintenanceApi {
  url: string = 'http://parrotapp.pythonanywhere.com/';
  //url: string = 'http://127.0.0.1:8000/';
  currentItems;
  newItem;

  constructor(public http: Http) {
  }

  newMaintenance(body: any) {
    let postUrl = this.url + 'maintenance/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let newItem;

    return this.http.post(postUrl, body, poptions).toPromise()
      .then(response => newItem = response.json())
      .catch(this.handleError);
  }

  getCurrentMaintenanceForApt(apartment) {
    let aptUrl = this.url + 'maintenance/apartment/' + apartment;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let aptMaintenance;

    return this.http.get(aptUrl, poptions).toPromise()
      .then(response => aptMaintenance = response.json())
      .then();
  }


  private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
