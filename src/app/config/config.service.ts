import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiBaseUrl: String = 'http://localhost:3000';
  constructor() { }


}
