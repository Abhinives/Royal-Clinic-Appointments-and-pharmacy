import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private accessToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      console.log("asdf");
      this.accessToken$.next(token);
      this.loggedIn$.next(true);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getAccessToken(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  addAuthentication(accessToken: string): boolean {
    localStorage.setItem('accessToken', accessToken);
    this.accessToken$.next(accessToken);
    this.loggedIn$.next(true);
    return true;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.accessToken$.next(null);
    this.loggedIn$.next(false);
  }


}
