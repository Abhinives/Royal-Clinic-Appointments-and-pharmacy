import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private accessToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    console.log(token);
    if (token) {
      console.log("asdf");
      this.accessToken$.next(token);
      this.loggedIn$.next(true);
      this.userId$.next(userId);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getAccessToken(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  getUserId(): Observable<string | null> {
    return this.userId$.asObservable();
  }

  addAuthentication(accessToken: string, userId: string): boolean {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    this.accessToken$.next(accessToken);
    this.loggedIn$.next(true);
    this.userId$.next(userId);
    return true;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.accessToken$.next(null);
    this.loggedIn$.next(false);
    this.userId$.next(null);
  }


}
