import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { SplashPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };
  slide: {};

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {

    this.slide =
          {
            title: "Welcome to the Package Inventory System",
            image: 'assets/img/westlofts-logo.png',
          }
        ;

  }

  doLogin() {
      this.navCtrl.push(SplashPage);
  }

  // Attempt to login in through our User service
  //doLogin() {
  //  this.user.login(this.account).subscribe((resp) => {
  //    this.navCtrl.push(MainPage);
  //  }, (err) => {
  //    this.navCtrl.push(MainPage);
  //    // Unable to log in
  //    let toast = this.toastCtrl.create({
  //      message: this.loginErrorString,
  //      duration: 3000,
  //      position: 'top'
  //    });
  //    toast.present();
  //  });
  //}
}
