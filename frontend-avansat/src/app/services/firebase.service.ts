import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = !!localStorage.getItem('user');

  constructor(
    public firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  async login(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(response.user));
      })
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(response.user));
      })
  }

  logout() {
    this.firebaseAuth.signOut();
    this.router.navigate(['home']);
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
