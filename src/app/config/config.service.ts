import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiBaseUrl: String = 'https://royalclinic-backend.onrender.com';
  constructor() { }


}
