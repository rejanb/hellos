import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FontApiService {
  constructor(private http: HttpClient) {}

  fontApi() {
    return this.http.get(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAiy4IpHap-Ad_P8AzrWMvv3f3kcF_V0n8'
    );
  }
}
