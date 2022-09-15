import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  userId: string;
  mail: string;
  method: any;
  name: string;
  photo: string;

  constructor(public authService: AuthenticationService,public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      } else {
        console.log('connecté: ' + auth.uid);
      };
      this.userId = auth.uid;
      this.name = auth.displayName;
      this.mail = auth.email;
      this.photo = auth.photoURL;
      this.method = auth.providerData[0].providerId;//récupère la methode d'inscription
    });
  }

}
