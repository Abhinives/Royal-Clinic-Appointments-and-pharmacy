import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }

  login(body: { email: String, password: String }): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/login`, body)
  }
}
